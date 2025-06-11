let cart = [];
let isCartOpen = false;

const produtos = [
  {
    id: 1,
    nome: 'Tomates Orgânicos',
    preço: 8.00,
    unidade: 'Kg',
    produtor: 'Fazenda do Seu Zé',
    imagem: 'img/tomate.jfif'
  },
  {
    id: 2,
    nome: 'Alface Fresca',
    preço: 4.00,
    unidade: 'unidade',
    produtor: 'Sítio Balacubaco',
    imagem: 'img/alface.jfif'
  },
  {
    id: 3,
    nome: 'Cenoura Orgânica',
    preço: 6.00,
    unidade: 'Kg',
    produtor: 'Fazenda Chumerei',
    imagem: 'img/cenoura.jpeg'
  }
];

function toggleCarrinho() {
  const cartWindow = document.getElementById('cart-window');

  if (isCartOpen) {
    cartWindow.classList.remove('open');
    isCartOpen = false;
  } else {
    cartWindow.classList.add('open');
    isCartOpen = true;
  }
}

function addtocart(produtoId) {
  const produto = produtos.find(p => p.id === produtoId);
  if (!produto) return;

  const existingItem = cart.find(item => item.id === produtoId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...produto, quantity: 1 });
  }
}