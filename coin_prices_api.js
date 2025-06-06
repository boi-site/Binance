const coins = [
  { name: 'BNB', price: 643.32, change: -4.03 },
  { name: 'BTC', price: 103576.88, change: -1.12 },
  { name: 'ETH', price: 2461.3, change: -5.64 },
  { name: 'PEPE', price: 0.00001107, change: -6.11 },
  { name: 'SOL', price: 148.11, change: -2.80 },
  { name: 'XRP', price: 2.1437, change: -2.50 },
];

function loadCoinPrices() {
  const list = document.getElementById("coin-list");
  list.innerHTML = "";
  coins.forEach(coin => {
    const row = document.createElement("div");
    row.className = "coin-row";

    const name = document.createElement("div");
    name.className = "coin-name";
    name.textContent = coin.name;

    const prices = document.createElement("div");
    prices.className = "coin-price";
    prices.innerHTML = `
      <div class="primary">${coin.price.toLocaleString()}</div>
      <div class="secondary">$${coin.price.toFixed(2)}</div>
    `;

    const change = document.createElement("div");
    change.className = "coin-change";
    change.textContent = `${coin.change.toFixed(2)}%`;
    change.style.backgroundColor = coin.change > 0 ? "#16c784" : coin.change < 0 ? "#ea3943" : "#666";

    row.append(name, prices, change);
    list.appendChild(row);
  });
}

window.onload = loadCoinPrices;
