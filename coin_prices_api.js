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
    const res = await fetch(`https://api.coincap.io/v2/assets?ids=${ids}`);
    const json = await res.json();
    return json.data.map(c => ({
      name: c.symbol,
      price: parseFloat(c.priceUsd),
      change: parseFloat(c.changePercent24Hr)
    }));
  } catch (e) {
    console.error("Error fetching prices:", e);
    return [];
  }
}

function formatPrice(value) {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function renderOrUpdateCoin(list, coin) {
  let row = document.getElementById(`coin-${coin.name}`);
  if (!row) {
    row = document.createElement("div");
    row.id = `coin-${coin.name}`;
    row.className = "coin-row";
    row.innerHTML = `
      <div class="coin-name">${coin.name}</div>
      <div class="coin-price">
        <div class="primary">${formatPrice(coin.price)}</div>
        <div class="secondary">$${coin.price.toFixed(2)}</div>
      </div>
      <div class="coin-change">${coin.change.toFixed(2)}%</div>
    `;
    list.appendChild(row);
  } else {
    row.querySelector(".primary").textContent = formatPrice(coin.price);
    row.querySelector(".secondary").textContent = `$${coin.price.toFixed(2)}`;
    row.querySelector(".coin-change").textContent = `${coin.change.toFixed(2)}%`;

    const changeBox = row.querySelector(".coin-change");
    if (coin.change > 0) {
      changeBox.style.backgroundColor = "#16c784";
    } else if (coin.change < 0) {
      changeBox.style.backgroundColor = "#ea3943";
    } else {
      changeBox.style.backgroundColor = "#848e9c";
    }
  }
}

async function loadCoinPrices() {
  const list = document.getElementById("coin-list");
  const data = await fetchPrices();
  data.forEach(coin => renderOrUpdateCoin(list, coin));
}

window.onload = () => {
  loadCoinPrices();
  setInterval(loadCoinPrices, 5000); // Smooth update every 5 seconds
};
