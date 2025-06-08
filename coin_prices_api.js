const coins = [
  { id: "binance-coin", symbol: "BNB" },
  { id: "bitcoin", symbol: "BTC" },
  { id: "ethereum", symbol: "ETH" },
  { id: "pepe", symbol: "PEPE" },
  { id: "solana", symbol: "SOL" },
  { id: "xrp", symbol: "XRP" }
];

async function fetchPrices() {
  try {
    const response = await fetch("https://api.coincap.io/v2/assets");
    const { data } = await response.json();

    return coins.map(({ id, symbol }) => {
      const coinData = data.find(item => item.id === id);
      if (!coinData) return null;
      return {
        name: symbol,
        price: parseFloat(coinData.priceUsd),
        change: parseFloat(coinData.changePercent24Hr)
      };
    }).filter(Boolean);
  } catch (e) {
    console.error("Failed to fetch prices:", e);
    return [];
  }
}

async function loadCoinPrices() {
  const list = document.getElementById("coin-list");
  list.innerHTML = "";

  const coinData = await fetchPrices();

  if (coinData.length === 0) {
    coins.forEach(({ symbol }) => {
      const row = document.createElement("div");
      row.className = "coin-row";

      const name = document.createElement("div");
      name.className = "coin-name";
      name.textContent = symbol;

      const prices = document.createElement("div");
      prices.className = "coin-price";
      prices.innerHTML = `
        <div class="primary">–</div>
        <div class="secondary">–</div>
      `;

      const change = document.createElement("div");
      change.className = "coin-change";
      change.textContent = "–";
      change.style.backgroundColor = "#848e9c";

      row.append(name, prices, change);
      list.appendChild(row);
    });
    return;
  }

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
  setInterval(loadCoinPrices, 10000); // every 10 seconds
};
