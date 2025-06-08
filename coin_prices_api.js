const coins = ["bnb", "btc", "eth", "pepe", "sol", "xrp"];
const coinMap = {
  bnb: "binancecoin",
  btc: "bitcoin",
  eth: "ethereum",
  pepe: "pepe",
  sol: "solana",
  xrp: "ripple"
};

let previousPrices = {}; // Track last price

async function fetchPrices() {
  try {
    const ids = coins.map(symbol => coinMap[symbol]).join(",");
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`);
    const data = await res.json();

    return coins.map(symbol => {
      const coinData = data[coinMap[symbol]];
      return {
        name: symbol.toUpperCase(),
        symbol,
        price: coinData?.usd ?? 0,
        change: coinData?.usd_24h_change ?? 0
      };
    });
  } catch (e) {
    console.error("Error fetching prices", e);
    return [];
  }
}

function getColorClass(change) {
  if (change > 0) return "green";
  if (change < 0) return "red";
  return "gray";
}

async function loadCoinPrices() {
  const list = document.getElementById("coin-list");
  list.innerHTML = ""; // Clear only once

  const coinData = await fetchPrices();

  coinData.forEach(coin => {
    const oldPrice = previousPrices[coin.symbol] ?? coin.price;
    const priceDiff = coin.price - oldPrice;

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
    change.className = `coin-change ${getColorClass(coin.change)}`;
    change.textContent = `${coin.change.toFixed(2)}%`;

    // Animation class if price changed
    if (priceDiff !== 0) {
      change.classList.add("flash");
      setTimeout(() => change.classList.remove("flash"), 500);
    }

    row.append(name, prices, change);
    list.appendChild(row);

    // Save new price
    previousPrices[coin.symbol] = coin.price;
  });
}

window.onload = () => {
  loadCoinPrices();
  setInterval(loadCoinPrices, 15000); // every 15 secs
};
