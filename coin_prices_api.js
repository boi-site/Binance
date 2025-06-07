const coins = [
  { id: "binance-coin", symbol: "BNB" },
  { id: "bitcoin", symbol: "BTC" },
  { id: "ethereum", symbol: "ETH" },
  { id: "pepe", symbol: "PEPE" },
  { id: "solana", symbol: "SOL" },
  { id: "ripple", symbol: "XRP" }
];

async function fetchPrices() {
  try {
    const ids = coins.map(c => c.id).join(",");
    const url = `https://api.coincap.io/v2/assets?ids=${ids}`;
    const response = await fetch(url);
    const result = await response.json();
    const data = result.data;

    return data.map(item => ({
      name: item.symbol,
      price: parseFloat(item.priceUsd),
      change: parseFloat(item.changePercent24Hr)
    }));
  } catch (e) {
    console.error("Failed to fetch CoinCap prices:", e);
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
      <div class="primary">${coin.price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}</div>
      <div class="secondary">$${coin.price.toFixed(2)}</div>
    `;

    const change = document.createElement("div");
    change.className = "coin-change";
    change.textContent = `${coin.change.toFixed(2)}%`;

    if (coin.change > 0) {
      change.style.backgroundColor = "#16c784";
    } else if (coin.change < 0) {
      change.style.backgroundColor = "#ea3943";
    } else {
      change.style.backgroundColor = "#848e9c";
    }

    row.append(name, prices, change);
    list.appendChild(row);
  });
}

window.onload = () => {
  loadCoinPrices();
  setInterval(loadCoinPrices, 5000); // Refresh every 5 seconds
};
