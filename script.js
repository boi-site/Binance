const coins = [
  { name: 'BNB', price: 668.06, change: 0.34 },
  { name: 'BTC', price: 105354.82, change: -0.56 },
  { name: 'ETH', price: 2650.61, change: 1.36 },
  { name: 'PEPE', price: 0.00001241, change: -2.21 },
  { name: 'SOL', price: 156.93, change: -2.47 },
  { name: 'XRP', price: 2.2354, change: -0.69 },
];

function renderCoins() {
  const container = document.getElementById('coin-list');
  container.innerHTML = '';
  coins.forEach((coin) => {
    const color = coin.change > 0 ? '#10c45c' : coin.change < 0 ? '#f6465d' : '#555';
    const row = document.createElement('div');
    row.className = 'coin-row';
    row.innerHTML = `
      <span>${coin.name}</span>
      <span>$${coin.price.toLocaleString()}</span>
      <span><div class="percent-box" style="background-color:${color}">${coin.change > 0 ? '+' : ''}${coin.change}%</div></span>
    `;
    container.appendChild(row);
  });
}

function updatePrices() {
  coins.forEach((coin) => {
    const delta = (Math.random() * 2 - 1).toFixed(2);
    coin.change = parseFloat((coin.change + parseFloat(delta)).toFixed(2));
  });
  renderCoins();
}

function setActive(elem) {
  document.querySelectorAll('.nav-item').forEach((el) => el.classList.remove('active'));
  elem.classList.add('active');
}

renderCoins();
setInterval(updatePrices, 4000);
