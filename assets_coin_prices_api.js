const coins = ['usdt', 'btc', 'eth', 'bonk', 'xrp'];
const allocations = {
  USDT: 122034958.27,
  BTC: 162713277.70,
  ETH: 81356638.85,
  BONK: 20339159.71,
  XRP: 20339159.71
};

async function fetchPrices() {
  try {
    const response = await fetch("https://api.binance.com/api/v3/ticker/24hr");
    const data = await response.json();
    const filtered = data.filter(item => 
      coins.includes(item.symbol.replace("USDT", "").toLowerCase())
    );

    return filtered.map(item => {
      const name = item.symbol.replace("USDT", "");
      const price = parseFloat(item.lastPrice);
      const change = parseFloat(item.priceChangePercent);
      const value = allocations[name];
      const amount = value / price;

      return {
        name,
        price,
        change,
        value: value.toFixed(2),
        amount: amount.toFixed(8),
      };
    });
  } catch (error) {
    console.error("Failed to fetch prices:", error);
    return [];
  }
}

async function loadAssets() {
  const list = document.getElementById("asset-list");
  list.innerHTML = "";

  const data = await fetchPrices();
  data.forEach(coin => {
    const row = document.createElement("div");
    row.className = "asset-row";

    row.innerHTML = `
      <div class="asset-left">
        <div class="asset-icon">${coin.name}</div>
        <div class="asset-info">
          <div class="asset-name">${coin.name}</div>
          <div class="asset-sub">Today’s PNL: $0.00 (${coin.change.toFixed(2)}%)</div>
          ${coin.name === 'ETH' ? `<div class="asset-sub">Average cost: $2,642.77</div>` : ""}
        </div>
      </div>
      <div class="asset-right">
        <div class="asset-amount">${coin.amount}</div>
        <div class="asset-usd">$${coin.price.toFixed(5)}</div>
      </div>
    `;
    list.appendChild(row);
  });
}

loadAssets();
