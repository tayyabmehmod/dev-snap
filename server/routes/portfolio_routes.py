from flask import Blueprint, request, jsonify
from database.db import db
from models.portfolio import Portfolio
from datetime import datetime

portfolio_bp = Blueprint('portfolio', __name__)


def success_response(data, message='Success', status=200):
    return jsonify({'success': True, 'message': message, 'data': data}), status


def error_response(message, status=400):
    return jsonify({'success': False, 'message': message, 'data': None}), status


# ─── POST /api/portfolio ────────────────────────────────────────────────────
@portfolio_bp.route('/portfolio', methods=['POST'])
def create_portfolio():
    try:
        body = request.get_json()
        if not body:
            return error_response('Request body is required')

        if not body.get('full_name'):
            return error_response('Full name is required')

        portfolio = Portfolio(
            full_name=body.get('full_name', ''),
            professional_title=body.get('professional_title', ''),
            bio=body.get('bio', ''),
            profile_image=body.get('profile_image', ''),
            github_url=body.get('github_url', ''),
            linkedin_url=body.get('linkedin_url', ''),
            portfolio_url=body.get('portfolio_url', ''),
            email=body.get('email', ''),
            phone=body.get('phone', ''),
            location=body.get('location', ''),
            template=body.get('template', 'glass'),
        )
        portfolio.skills = body.get('skills', [])
        portfolio.projects = body.get('projects', [])
        portfolio.experience = body.get('experience', [])
        portfolio.education = body.get('education', [])
        portfolio.social_links = body.get('social_links', {})

        db.session.add(portfolio)
        db.session.commit()
        return success_response(portfolio.to_dict(), 'Portfolio saved successfully', 201)

    except Exception as e:
        db.session.rollback()
        return error_response(f'Failed to save portfolio: {str(e)}', 500)


# ─── GET /api/portfolio/<id> ────────────────────────────────────────────────
@portfolio_bp.route('/portfolio/<int:portfolio_id>', methods=['GET'])
def get_portfolio(portfolio_id):
    portfolio = Portfolio.query.get(portfolio_id)
    if not portfolio:
        return error_response('Portfolio not found', 404)
    return success_response(portfolio.to_dict())


# ─── PUT /api/portfolio/<id> ────────────────────────────────────────────────
@portfolio_bp.route('/portfolio/<int:portfolio_id>', methods=['PUT'])
def update_portfolio(portfolio_id):
    try:
        portfolio = Portfolio.query.get(portfolio_id)
        if not portfolio:
            return error_response('Portfolio not found', 404)

        body = request.get_json()
        if not body:
            return error_response('Request body is required')

        portfolio.full_name = body.get('full_name', portfolio.full_name)
        portfolio.professional_title = body.get('professional_title', portfolio.professional_title)
        portfolio.bio = body.get('bio', portfolio.bio)
        portfolio.profile_image = body.get('profile_image', portfolio.profile_image)
        portfolio.github_url = body.get('github_url', portfolio.github_url)
        portfolio.linkedin_url = body.get('linkedin_url', portfolio.linkedin_url)
        portfolio.portfolio_url = body.get('portfolio_url', portfolio.portfolio_url)
        portfolio.email = body.get('email', portfolio.email)
        portfolio.phone = body.get('phone', portfolio.phone)
        portfolio.location = body.get('location', portfolio.location)
        portfolio.template = body.get('template', portfolio.template)

        if 'skills' in body:
            portfolio.skills = body['skills']
        if 'projects' in body:
            portfolio.projects = body['projects']
        if 'experience' in body:
            portfolio.experience = body['experience']
        if 'education' in body:
            portfolio.education = body['education']
        if 'social_links' in body:
            portfolio.social_links = body['social_links']

        portfolio.updated_at = datetime.utcnow()
        db.session.commit()
        return success_response(portfolio.to_dict(), 'Portfolio updated successfully')

    except Exception as e:
        db.session.rollback()
        return error_response(f'Failed to update portfolio: {str(e)}', 500)


# ─── GET /api/portfolios ─────────────────────────────────────────────────────
@portfolio_bp.route('/portfolios', methods=['GET'])
def list_portfolios():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        search = request.args.get('search', '', type=str)

        query = Portfolio.query
        if search:
            query = query.filter(
                Portfolio.full_name.ilike(f'%{search}%') |
                Portfolio.professional_title.ilike(f'%{search}%') |
                Portfolio.location.ilike(f'%{search}%')
            )

        query = query.order_by(Portfolio.created_at.desc())
        paginated = query.paginate(page=page, per_page=per_page, error_out=False)

        return success_response({
            'portfolios': [p.to_dict() for p in paginated.items],
            'total': paginated.total,
            'pages': paginated.pages,
            'current_page': page,
            'per_page': per_page,
            'stats': {
                'total_portfolios': Portfolio.query.count(),
                'recent_today': Portfolio.query.filter(
                    Portfolio.created_at >= datetime.utcnow().replace(hour=0, minute=0, second=0)
                ).count(),
            }
        })
    except Exception as e:
        return error_response(f'Failed to list portfolios: {str(e)}', 500)


# ─── DELETE /api/portfolio/<id> ──────────────────────────────────────────────
@portfolio_bp.route('/portfolio/<int:portfolio_id>', methods=['DELETE'])
def delete_portfolio(portfolio_id):
    try:
        portfolio = Portfolio.query.get(portfolio_id)
        if not portfolio:
            return error_response('Portfolio not found', 404)

        db.session.delete(portfolio)
        db.session.commit()
        return success_response({'id': portfolio_id}, 'Portfolio deleted successfully')

    except Exception as e:
        db.session.rollback()
        return error_response(f'Failed to delete portfolio: {str(e)}', 500)


# ─── GET /api/stats ──────────────────────────────────────────────────────────
@portfolio_bp.route('/stats', methods=['GET'])
def get_stats():
    try:
        total = Portfolio.query.count()
        today = Portfolio.query.filter(
            Portfolio.created_at >= datetime.utcnow().replace(hour=0, minute=0, second=0)
        ).count()
        templates_used = db.session.query(
            Portfolio.template, db.func.count(Portfolio.id)
        ).group_by(Portfolio.template).all()

        return success_response({
            'total_portfolios': total,
            'created_today': today,
            'templates': {t: c for t, c in templates_used}
        })
    except Exception as e:
        return error_response(f'Failed to get stats: {str(e)}', 500)
