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
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 4000);

    const url = `https://api.coincap.io/v2/assets?ids=${coins.map(c => c.id).join(",")}`;
    const res = await fetch(url, { signal: controller.signal });
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

function renderOrUpdateCoin(coin) {
  const row = document.getElementById(`coin-${coin.name}`);
  const primary = row.querySelector(".primary");
  const secondary = row.querySelector(".secondary");
  const changeBox = row.querySelector(".coin-change");

  primary.textContent = coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  secondary.textContent = `$${coin.price.toFixed(2)}`;
  changeBox.textContent = `${coin.change.toFixed(2)}%`;
  changeBox.style.backgroundColor = coin.change > 0 ? "#16c784" : coin.change < 0 ? "#ea3943" : "#848e9c";
}

async function loadCoinPrices() {
  const prices = await fetchPrices();
  prices.forEach(renderOrUpdateCoin);
}

window.onload = () => {
  const list = document.getElementById("coin-list");
  coins.forEach(c => {
    const row = document.createElement("div");
    row.id = `coin-${c.symbol}`;
    row.className = "coin-row";
    row.innerHTML = `
      <div class="coin-name">${c.symbol}</div>
      <div class="coin-price">
        <div class="primary">–</div>
        <div class="secondary">–</div>
      </div>
      <div class="coin-change">–</div>
    `;
    list.appendChild(row);
  });

  loadCoinPrices();
  setInterval(loadCoinPrices, 5000);
};
