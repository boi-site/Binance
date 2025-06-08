// ─── coin_prices_api.js ──────────────────────────────────────────────────

const coins = ["bnb", "btc", "eth", "pepe", "sol", "xrp"];
const coinMap = {
  bnb: "binancecoin",
  btc: "bitcoin",
  eth: "ethereum",
  pepe: "pepe",
  sol: "solana",
  xrp: "ripple"
};

let previousPrices = {};

// format sub-$1 coins to 8 decimals, others to 2
function formatPrice(value) {
  if (value < 1) {
    return value.toFixed(8);
  }
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

async function fetchPrices() {
  try {
    const ids = coins.map(sym => coinMap[sym]).join(",");
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}` +
      `&vs_currencies=usd&include_24hr_change=true`
    );
    const data = await res.json();
    return coins.map(symbol => {
      const d = data[coinMap[symbol]] || {};
      return {
        symbol,
        price: d.usd ?? 0,
        change: d.usd_24h_change ?? 0
      };
    });
  } catch (err) {
    console.error("Error fetching prices", err);
    return coins.map(symbol => ({
      symbol,
      price: previousPrices[symbol] || 0,
      change: 0
    }));
  }
}

function getColorClass(change) {
  if (change > 0) return "green";
  if (change < 0) return "red";
  return "gray";
}

async function loadCoinPrices() {
  const list = document.getElementById("coin-list");
  list.innerHTML = ""; // clear old rows

  const prices = await fetchPrices();
  prices.forEach(({ symbol, price, change }) => {
    const old = previousPrices[symbol] ?? price;
    const diff = price - old;

    const row = document.createElement("div");
    row.className = "coin-row";

    const name = document.createElement("div");
    name.className = "coin-name";
    name.textContent = symbol.toUpperCase();

    const priceDiv = document.createElement("div");
    priceDiv.className = "coin-price";
    priceDiv.innerHTML = `
      <div class="primary">${formatPrice(price)}</div>
      <div class="secondary">$${price.toFixed(2)}</div>
    `;

    const changeDiv = document.createElement("div");
    const cls = getColorClass(change);
    changeDiv.className = `coin-change ${cls}`;
    const sign = change > 0 ? "+" : "";
    changeDiv.textContent = `${sign}${change.toFixed(2)}%`;

    if (diff !== 0) {
      changeDiv.classList.add("flash");
      setTimeout(() => changeDiv.classList.remove("flash"), 500);
    }

    row.append(name, priceDiv, changeDiv);
    list.appendChild(row);

    previousPrices[symbol] = price;
  });
}

window.onload = () => {
  loadCoinPrices();
  setInterval(loadCoinPrices, 15000); // refresh every 15s
};
