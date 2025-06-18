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
  renderCartItems();
}

function addtocart(produtoId) {
  const produto = produtos.find(p => p.id === produtoId);
  if (!produto) return;

  const existingItem = cart.find(item => item.id === produtoId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...produto,
      quantity: 1
    });
  }

  updateCartDisplay();
  showCartNotification(produto.nome);
}

function updateCartDisplay() {
  const cartCount = document.getElementById('carrinho-count');
  const cartTotal = document.getElementById('cart-total');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.preço * item.quantity, 0);

  if (cartCount) {
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
  }
  if (cartTotal) {
    cartTotal.textContent = totalPrice.toFixed(2);
  }
}

function updateCartQuantity(produtoId, novaQuantidade) {
  const item = cart.find(item => item.id === produtoId);
  if (item) {
    if (novaQuantidade <= 0) {
      removeFromCart(produtoId);
    } else {
      item.quantity = novaQuantidade;
      updateCartDisplay();
      renderCartItems();
    }
  }
}

function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `       
    <div class="cart-item">
      <div class="cart-item-info">
        <h4>${item.nome}</h4>
        <p>${item.produtor}</p>
        <div class="cart-item-control">
          <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" class="btn-quantidade">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" class="btn-quantidade">+</button>
        </div>
        <div class="cart-item-price">
          R$ ${(item.preço * item.quantity).toFixed(2)}
          <button onclick="removeFromCart(${item.id})" class="remove-from-cart">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function removeFromCart(produtoId) {
  cart = cart.filter(item => item.id !== produtoId);
  updateCartDisplay();
  renderCartItems();
}
