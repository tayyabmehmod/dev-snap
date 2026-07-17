from database.db import db
from datetime import datetime
import json


class Portfolio(db.Model):
    __tablename__ = 'portfolios'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(200), nullable=False)
    professional_title = db.Column(db.String(200))
    bio = db.Column(db.Text)
    profile_image = db.Column(db.String(500))
    github_url = db.Column(db.String(500))
    linkedin_url = db.Column(db.String(500))
    portfolio_url = db.Column(db.String(500))
    email = db.Column(db.String(200))
    phone = db.Column(db.String(50))
    location = db.Column(db.String(200))
    template = db.Column(db.String(50), default='glass')

    # JSON fields stored as text
    skills_json = db.Column(db.Text, default='[]')
    projects_json = db.Column(db.Text, default='[]')
    experience_json = db.Column(db.Text, default='[]')
    education_json = db.Column(db.Text, default='[]')
    social_links_json = db.Column(db.Text, default='{}')

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    @property
    def skills(self):
        try:
            return json.loads(self.skills_json)
        except Exception:
            return []

    @skills.setter
    def skills(self, value):
        self.skills_json = json.dumps(value)

    @property
    def projects(self):
        try:
            return json.loads(self.projects_json)
        except Exception:
            return []

    @projects.setter
    def projects(self, value):
        self.projects_json = json.dumps(value)

    @property
    def experience(self):
        try:
            return json.loads(self.experience_json)
        except Exception:
            return []

    @experience.setter
    def experience(self, value):
        self.experience_json = json.dumps(value)

    @property
    def education(self):
        try:
            return json.loads(self.education_json)
        except Exception:
            return []

    @education.setter
    def education(self, value):
        self.education_json = json.dumps(value)

    @property
    def social_links(self):
        try:
            return json.loads(self.social_links_json)
        except Exception:
            return {}

    @social_links.setter
    def social_links(self, value):
        self.social_links_json = json.dumps(value)

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'professional_title': self.professional_title,
            'bio': self.bio,
            'profile_image': self.profile_image,
            'github_url': self.github_url,
            'linkedin_url': self.linkedin_url,
            'portfolio_url': self.portfolio_url,
            'email': self.email,
            'phone': self.phone,
            'location': self.location,
            'template': self.template,
            'skills': self.skills,
            'projects': self.projects,
            'experience': self.experience,
            'education': self.education,
            'social_links': self.social_links,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }
