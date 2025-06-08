const coins = ["bnb", "btc", "eth", "pepe", "sol", "xrp"];
const coinMap = {
  bnb: "binancecoin",
  btc: "bitcoin",
  eth: "ethereum",
  pepe: "pepe",
  sol: "solana",
  xrp: "ripple"
};

async function fetchPrices() {
  try {
    const ids = coins.map(symbol => coinMap[symbol]).join(",");
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`);
    const data = await res.json();

    return coins.map(symbol => {
      const coinData = data[coinMap[symbol]];
      return {
        name: symbol.toUpperCase(),
        price: coinData?.usd ?? 0,
        change: coinData?.usd_24h_change ?? 0
      };
    });
  } catch (e) {
    console.error("Error fetching prices", e);
    return [];
  }
}

async function loadCoinPrices() {
  const list = document.getElementById("coin-list");
  list.innerHTML = ""; // Clear only once to avoid flicker

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

    // Color styling
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

// Initial load and interval update
window.onload = () => {
  loadCoinPrices();
  setInterval(loadCoinPrices, 15000); // every 15 secs to avoid flicker
};
