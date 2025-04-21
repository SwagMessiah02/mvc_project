from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db
from views import init_routes  # Função que registra as rotas

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
Migrate(app, db)

# Importa e registra as rotas
init_routes(app)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
