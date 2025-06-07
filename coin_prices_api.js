const coins = [
  { id: "binancecoin", symbol: "BNB" },
  { id: "bitcoin", symbol: "BTC" },
  { id: "ethereum", symbol: "ETH" },
  { id: "pepe", symbol: "PEPE" },
  { id: "solana", symbol: "SOL" },
  { id: "ripple", symbol: "XRP" }
];

async function fetchPrices() {
  try {
    const ids = coins.map(c => c.id).join(",");
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;

    const res = await fetch(url);
    const data = await res.json();

    return coins.map(coin => ({
      name: coin.symbol,
      price: data[coin.id]?.usd ?? 0,
      change: data[coin.id]?.usd_24h_change ?? 0
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

    // Dynamic color
    if (coin.change > 0) {
      change.style.backgroundColor = "#16c784"; // Green
    } else if (coin.change < 0) {
      change.style.backgroundColor = "#ea3943"; // Red
    } else {
      change.style.backgroundColor = "#848e9c"; // Gray
    }

    row.append(name, prices, change);
    list.appendChild(row);
  });
}

window.onload = () => {
  loadCoinPrices();
  setInterval(loadCoinPrices, 5000);
};
