const coins = [
  { name: "BNB", price: 643.32 },
  { name: "BTC", price: 103576.88 },
  { name: "ETH", price: 2461.3 },
  { name: "PEPE", price: 0.00001107 },
  { name: "SOL", price: 148.11 },
  { name: "XRP", price: 2.1437 }
];

function getRandomChange() {
  const change = (Math.random() * 10 - 5).toFixed(2); // -5% to +5%
  return parseFloat(change);
}

function updatePrices() {
  const coinList = document.getElementById("coin-list");
  coinList.innerHTML = "";

  coins.forEach(coin => {
    const change = getRandomChange();
    const price = coin.price + coin.price * (change / 100);
    const percentChange = change.toFixed(2);
    const bgClass =
      change > 0
        ? "percent-green"
        : change < 0
        ? "percent-red"
        : "percent-gray";

    const row = document.createElement("div");
    row.className = "coin-row";

    row.innerHTML = `
      <div class="coin-name">${coin.name}</div>
      <div class="price-stack">
        <div>$${price.toLocaleString()}</div>
        <div class="usd-price">$${price.toLocaleString()}</div>
      </div>
      <div class="percent-box ${bgClass}">${percentChange}%</div>
    `;

    coinList.appendChild(row);
  });
}

// Initial run
updatePrices();
// Simulate real-time updates every 5 seconds
setInterval(updatePrices, 5000);
