from .models import Cliente, Produto, db

# ----------- CLIENTES --------------
#AHHHHHHHHHHHHHHHHHHHHHHHHhh

def criar_cliente(nome, email):
    cliente = Cliente(nome=nome, email=email)
    db.session.add(cliente)
    db.session.commit()

def listar_clientes():
    return Cliente.query.all()

def atualizar_cliente(id, nome, email):
    cliente = Cliente.query.get(id)
    if cliente:
        cliente.nome = nome
        cliente.email = email
        db.session.commit()

def deletar_cliente(id):
    cliente = Cliente.query.get(id)
    if cliente:
        db.session.delete(cliente)
        db.session.commit()


# ----------- PRODUTOS --------------
# criação do produto guys!!!!

def criar_produto(nome, preco):
    produto = Produto(nome=nome, preco=preco)
    db.session.add(produto)
    db.session.commit()

def listar_produtos():
    return Produto.query.all()

def atualizar_produto(id, nome, preco):
    produto = Produto.query.get(id)
    if produto:
        produto.nome = nome
        produto.preco = preco
        db.session.commit()

def deletar_produto(id):
    produto = Produto.query.get(id)
    if produto:
        db.session.delete(produto)
        db.session.commit()
