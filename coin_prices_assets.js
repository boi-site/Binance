const coins = ["btc", "eth", "bonk", "xrp"];

async function fetchCoinData() {
  try {
    const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
    const data = await res.json();
    const coinData = coins.map(c => {
      const match = data.find(d => d.symbol === c.toUpperCase() + "USDT");
      return {
        name: c.toUpperCase(),
        price: match ? parseFloat(match.lastPrice) : 0,
        change: match ? parseFloat(match.priceChangePercent) : 0,
        cost: match ? (parseFloat(match.weightedAvgPrice)).toFixed(2) : 0,
        amount: (Math.random() * 10).toFixed(4)
      };
    });
    return coinData;
  } catch {
    return [];
  }
}

async function loadAssets() {
  const container = document.getElementById("asset-list");
  const coins = await fetchCoinData();

  container.innerHTML = "";
  coins.forEach(coin => {
    const row = document.createElement("div");
    row.className = "asset-row";
    row.innerHTML = `
      <div class="asset-left">
        <img src="icons/${coin.name.toLowerCase()}.svg" width="32">
        <div>
          <div class="asset-text">${coin.name}</div>
          <div class="asset-sub">${coin.name === 'BONK' ? 'Bonk' : coin.name === 'XRP' ? 'Ripple' : coin.name}</div>
          <div class="asset-pnl">Today's PNL: ${coin.change.toFixed(2)}%</div>
          <div class="asset-cost">Avg Cost: $${coin.cost}</div>
        </div>
      </div>
      <div class="asset-right">
        ${coin.amount}<br>
        <span class="usd">$${(coin.amount * coin.price).toFixed(2)}</span>
      </div>
    `;
    container.appendChild(row);
  });

  const pnl = coins.reduce((a, c) => a + c.change, 0) / coins.length;
  document.getElementById("main-pnl").textContent = 
