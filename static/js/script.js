document.addEventListener("DOMContentLoaded", () => {
    const formUsuario = document.getElementById('formUsuario');
    const formProduto = document.getElementById('formProduto');
  
    if (formUsuario) {
      formUsuario.reset(); // limpa campos ao voltar
      formUsuario.addEventListener('submit', function (e) {
        e.preventDefault();
        const nome = document.getElementById('nomeUsuario').value.trim();
        const email = document.getElementById('emailUsuario').value.trim();
        const msg = document.getElementById('msgUsuario');
  
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
        const usuarioExistente = usuarios.find(
          (u) => u.nome.toLowerCase() === nome.toLowerCase() || u.email.toLowerCase() === email.toLowerCase()
        );
  
        if (usuarioExistente) {
          msg.style.color = 'red';
          msg.textContent = 'Usuário com mesmo nome ou email já cadastrado.';
        } else {
          usuarios.push({ nome, email });
          localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
          msg.style.color = 'green';
          msg.textContent = 'Usuário adicionado com sucesso!';
          formUsuario.reset();
        }
  
        setTimeout(() => msg.textContent = '', 3000);
      });
    }
  
    if (formProduto) {
      formProduto.reset(); // limpa campos ao voltar
      formProduto.addEventListener('submit', function (e) {
        e.preventDefault();
        const nome = document.getElementById('nomeProduto').value.trim();
        const preco = document.getElementById('precoProduto').value.trim();
        const msg = document.getElementById('msgProduto');
  
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  
        const produtoExistente = produtos.find(
          (p) => p.nome.toLowerCase() === nome.toLowerCase() || p.preco === preco
        );
  
        if (produtoExistente) {
          msg.style.color = 'red';
          msg.textContent = 'Produto com mesmo nome ou preço já cadastrado.';
        } else {
          produtos.push({ nome, preco });
          localStorage.setItem('produtos', JSON.stringify(produtos));
  
          msg.style.color = 'green';
          msg.textContent = 'Produto adicionado com sucesso!';
          formProduto.reset();
        }
  
        setTimeout(() => msg.textContent = '', 3000);
      });
    }
  
    if (document.getElementById('listaUsuarios')) carregarUsuarios();
    if (document.getElementById('listaProdutos')) carregarProdutos();
  });
  
  // Carregar e exibir usuários
  function carregarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const lista = document.getElementById('listaUsuarios');
    lista.innerHTML = '';
  
    usuarios.forEach((usuario, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span id="usuarioTexto-${index}">${usuario.nome} - ${usuario.email}</span>
        <span id="botoes-${index}">
          <span style="cursor:pointer; margin-left: 10px;" onclick="editarUsuario(${index})">✏️</span>
          <span style="cursor:pointer; margin-left: 10px;" onclick="excluirUsuario(${index})">🗑️</span>
        </span>
      `;
      lista.appendChild(li);
    });
  }
  
  // Carregar e exibir produtos
  function carregarProdutos() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const lista = document.getElementById('listaProdutos');
    lista.innerHTML = '';
  
    produtos.forEach((produto, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span id="produtoTexto-${index}">${produto.nome} - R$ ${produto.preco}</span>
        <span id="botoesProduto-${index}">
          <span style="cursor:pointer; margin-left: 10px;" onclick="editarProduto(${index})">✏️</span>
          <span style="cursor:pointer; margin-left: 10px;" onclick="excluirProduto(${index})">🗑️</span>
        </span>
      `;
      lista.appendChild(li);
    });
  }
  
  // Editar usuário
  function editarUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];
  
    const spanTexto = document.getElementById(`usuarioTexto-${index}`);
    const botoes = document.getElementById(`botoes-${index}`);
  
    spanTexto.innerHTML = `
      <input type="text" id="editNome-${index}" value="${usuario.nome}">
      <input type="email" id="editEmail-${index}" value="${usuario.email}">
    `;
  
    botoes.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
        <span style="cursor:pointer;" onclick="salvarEdicaoUsuario(${index})">✅</span>
        <span style="cursor:pointer;" onclick="carregarUsuarios()">❌</span>
      </div>
    `;
  }
  
  // Salvar edição de usuário
  function salvarEdicaoUsuario(index) {
    const nomeEditado = document.getElementById(`editNome-${index}`).value.trim();
    const emailEditado = document.getElementById(`editEmail-${index}`).value.trim();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
    // Evita duplicação após edição
    const duplicado = usuarios.some((u, i) =>
      i !== index &&
      (u.nome.toLowerCase() === nomeEditado.toLowerCase() || u.email.toLowerCase() === emailEditado.toLowerCase())
    );
  
    if (duplicado) {
      alert("Nome ou email já cadastrado.");
      return;
    }
  
    usuarios[index] = { nome: nomeEditado, email: emailEditado };
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    carregarUsuarios();
  }
  
  // Excluir usuário
  function excluirUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    carregarUsuarios();
  }
  
  // Editar produto
  function editarProduto(index) {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const produto = produtos[index];
  
    const spanTexto = document.getElementById(`produtoTexto-${index}`);
    const botoes = document.getElementById(`botoesProduto-${index}`);
  
    spanTexto.innerHTML = `
      <input type="text" id="editNomeProduto-${index}" value="${produto.nome}">
      <input type="number" id="editPrecoProduto-${index}" value="${produto.preco}">
    `;
  
    botoes.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
        <span style="cursor:pointer;" onclick="salvarEdicaoProduto(${index})">✅</span>
        <span style="cursor:pointer;" onclick="carregarProdutos()">❌</span>
      </div>
    `;
  }
  
  // Salvar edição de produto
  function salvarEdicaoProduto(index) {
    const nomeEditado = document.getElementById(`editNomeProduto-${index}`).value.trim();
    const precoEditado = document.getElementById(`editPrecoProduto-${index}`).value.trim();
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  
    // Evita duplicação após edição
    const duplicado = produtos.some((p, i) =>
      i !== index &&
      (p.nome.toLowerCase() === nomeEditado.toLowerCase() || p.preco === precoEditado)
    );
  
    if (duplicado) {
      alert("Nome ou preço já cadastrado.");
      return;
    }
  
    produtos[index] = { nome: nomeEditado, preco: precoEditado };
    localStorage.setItem('produtos', JSON.stringify(produtos));
    carregarProdutos();
  }
  
  // Excluir produto
  function excluirProduto(index) {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.splice(index, 1);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    carregarProdutos();
  }