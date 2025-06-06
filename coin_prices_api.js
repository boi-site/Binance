const coins = [
  { name: 'BNB', price: 649.25, change: -2.16 },
  { name: 'BTC', price: 103965, change: -1.81 },
  { name: 'ETH', price: 2479.48, change: -5.84 },
  { name: 'PEPE', price: 0.00001117, change: -6.83 },
  { name: 'SOL', price: 151.24, change: -1.79 },
  { name: 'XRP', price: 2.16, change: -2.83 },
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
    change.style.backgroundColor =
      coin.change > 0 ? "#16c784" :
      coin.change < 0 ? "#ea3943" : "#848e9c";

    row.appendChild(name);
    row.appendChild(prices);
    row.appendChild(change);
    list.appendChild(row);
  });
}

window.onload = loadCoinPrices;
