const coins = [
  { name: "BNB", price: 668.06, change: 0.34 },
  { name: "BTC", price: 105354.82, change: -2.09 },
  { name: "ETH", price: 2650.61, change: 1.36 },
  { name: "PEPE", price: 0.00001241, change: -2.21 },
  { name: "SOL", price: 156.93, change: -3.41 },
  { name: "XRP", price: 2.2354, change: -1.49 },
];

function renderCoins() {
  const container = document.getElementById("coinList");
  container.innerHTML = "";

  coins.forEach((coin) => {
    const colorClass = coin.change > 0 ? "green" : coin.change < 0 ? "red" : "gray";

    const row = document.createElement("div");
    row.className = "coin-row";

    row.innerHTML = `
      <div>${coin.name}</div>
      <div>$${coin.price.toLocaleString()}</div>
      <div class="percent ${colorClass}">${coin.change > 0 ? "+" : ""}${coin.change.toFixed(2)}%</div>
    `;

    container.appendChild(row);
  });
}

// Run initially
renderCoins();

// Optional: simulate dynamic update
setInterval(() => {
  coins.forEach((c) => {
    const delta = (Math.random() * 0.5 - 0.25).toFixed(2);
    c.change += parseFloat(delta);
  });
  renderCoins();
}, 5000);
