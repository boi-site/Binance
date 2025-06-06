// coin_prices_api.js
const coins = [
  { name: "BTC/USDT", price: 67000.25, change: 2.45 },
  { name: "ETH/USDT", price: 3050.75, change: -1.78 },
  { name: "BNB/USDT", price: 540.00, change: 0.0 },
];

function renderCoins() {
  const container = document.getElementById("coinList");
  container.innerHTML = "";
  coins.forEach((coin) => {
    const row = document.createElement("div");
    row.className = "coin-row";

    const name = document.createElement("span");
    name.textContent = coin.name;

    const price = document.createElement("span");
    price.textContent = `$${coin.price.toLocaleString()}`;
    price.className = "price";

    const change = document.createElement("span");
    change.textContent = `${coin.change.toFixed(2)}%`;
    change.className = "change";
    if (coin.change > 0) change.classList.add("green");
    else if (coin.change < 0) change.classList.add("red");
    else change.classList.add("gray");

    row.appendChild(name);
    row.appendChild(price);
    row.appendChild(change);
    container.appendChild(row);
  });
}

setInterval(() => {
  coins.forEach(c => {
    const random = (Math.random() - 0.5) * 2;
    c.change = Math.round((c.change + random) * 100) / 100;
    c.price = Math.round((c.price * (1 + c.change / 100)) * 100) / 100;
  });
  renderCoins();
}, 3000);

window.onload = renderCoins;
