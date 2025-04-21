from flask import render_template

def init_routes(app):
    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/usuarios')
    def usuarios():
        return render_template('usuarios.html')

    @app.route('/brinquedos')
    def brinquedos():
        return render_template('brinquedos.html')

    @app.route('/ver_brinquedos')
    def ver_brinquedos():
        return render_template('ver_brinquedos.html')

    @app.route('/ver_usuarios')
    def ver_usuarios():
        return render_template('ver_usuarios.html')
