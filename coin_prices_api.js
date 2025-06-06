const coins = ["bnb", "btc", "eth", "pepe", "sol", "xrp"];

async function fetchPrices() {
  try {
    const response = await fetch("https://api.binance.com/api/v3/ticker/24hr");
    const data = await response.json();

    return data
      .filter(item => coins.includes(item.symbol.replace("USDT", "").toLowerCase()))
      .map(item => ({
        name: item.symbol.replace("USDT", ""),
        price: parseFloat(item.lastPrice),
        change: parseFloat(item.priceChangePercent)
      }));
  } catch (err) {
    console.error("Failed to fetch prices", err);
    return [];
  }
}

async function loadCoinPrices() {
  const list = document.getElementById("coin-list");
  list.innerHTML = "";

  const coinData = await fetchPrices();

  coinData.forEach(coin => {
    const row = document.createElement("div");
    row.className = "coin-row";

    const name = document.createElement("div");
    name.className = "coin-name";
    name.textContent = coin.name.toUpperCase();

    const price = document.createElement("div");
    price.className = "coin-price";
    price.innerHTML = `
      <div class="primary">${coin.price.toLocaleString()}</div>
      <div class="secondary">$${coin.price.toFixed(2)}</div>
    `;

    const change = document.createElement("div");
    change.className = "coin-change";
    change.textContent = `${coin.change.toFixed(2)}%`;
    change.style.backgroundColor = coin.change > 0 ? "#16c784" : coin.change < 0 ? "#ea3943" : "#666";

    row.appendChild(name);
    row.appendChild(price);
    row.appendChild(change);
    list.appendChild(row);
  });
}

window.onload = () => {
  loadCoinPrices();
  setInterval(loadCoinPrices, 6000);
};
