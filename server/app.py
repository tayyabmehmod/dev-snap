from flask import Flask
from flask_cors import CORS
from database.db import db
import os

def create_app():
    app = Flask(__name__)
    
    # Configuration
    basedir = os.path.abspath(os.path.dirname(__file__))
    if os.environ.get('VERCEL'):
        db_path = '/tmp/devsnap.db'
    else:
        db_path = os.path.join(basedir, 'database', 'devsnap.db')
        
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'devsnap-secret-key-2024'
    
    # Initialize extensions
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)
    
    # Register blueprints
    from routes.portfolio_routes import portfolio_bp
    app.register_blueprint(portfolio_bp, url_prefix='/api')
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
