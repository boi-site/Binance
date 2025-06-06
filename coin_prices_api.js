const coins = ["bnb", "btc", "eth", "pepe", "sol", "xrp"];

async function fetchPrices() {
  try {
    const response = await fetch("https://api.binance.com/api/v3/ticker/24hr");
    const data = await response.json();

    return data
      .filter(d => coins.includes(d.symbol.replace("USDT", "").toLowerCase()))
      .map(d => ({
        name: d.symbol.replace("USDT", "").toUpperCase(),
        price: parseFloat(d.lastPrice),
        change: parseFloat(d.priceChangePercent),
      }));
  } catch (err) {
    console.error("Price fetch failed:", err);
    return [];
  }
}

async function loadCoinPrices() {
  const container = document.getElementById("coin-list");
  container.innerHTML = "";

  const prices = await fetchPrices();

  prices.forEach(c => {
    const row = document.createElement("div");
    row.className = "coin-row";

    const name = document.createElement("div");
    name.className = "coin-name";
    name.textContent = c.name;

    const price = document.createElement("div");
    price.className = "coin-price";
    price.innerHTML = `
      <div class="primary">${c.price.toLocaleString()}</div>
      <div class="secondary">$${c.price.toFixed(2)}</div>
    `;

    const change = document.createElement("div");
    change.className = "coin-change";
    change.textContent = `${c.change.toFixed(2)}%`;
    change.style.backgroundColor =
      c.change > 0 ? "#16c784" : c.change < 0 ? "#ea3943" : "#666";

    row.appendChild(name);
    row.appendChild(price);
    row.appendChild(change);

    container.appendChild(row);
  });
}

window.onload = () => {
  loadCoinPrices();
  setInterval(loadCoinPrices, 5000);
};
