#from flask import Flask
#from main import db
from flask_sqlalchemy import SQLAlchemy
#from datatime import datatime
from flask_migrate import Migrate

#app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db  = SQLAlchemy()
#db.init_app(app)

class Cliente(db.Model):
    __tablename__ = 'cliente'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)

    def __repr__(self):
        return f'<Cliente {self.nome}>'
    
class Produto(db.Model):
    __tablename__ = 'produto'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False, unique=True)
    preco = db.Column(db.Float, nullable=False, unique=True)

    def __repr__(self):
        return f'<Produto {self.nome}>'

'''@app.route('/')
def homepage():
    with app.app_context():
        db.create_all()
        #Criar cliente
@app.route('/')
def homepage():
    with app.app_context():
        db.create_all()
        #criar produto
'''