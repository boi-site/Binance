console.log("%cJS Loaded ✅", "color: lime");

const coins = ['BTC', 'ETH', 'XRP', 'BONK', 'USDT'];
const allocations = {
  BTC: 100000,
  ETH: 100000,
  XRP: 50000,
  BONK: 50000,
  USDT: 100000
};

async function fetchPrices() {
  try {
    const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
    const data = await res.json();

    const filtered = data.filter(item =>
      coins.includes(item.symbol.replace("USDT", ""))
    );

    console.log("🔍 Debug: Filtered coins:", filtered);

    return filtered.map(item => {
      const name = item.symbol.replace("USDT", "");
      const price = parseFloat(item.lastPrice);
      const change = parseFloat(item.priceChangePercent);
      const value = allocations[name];
      const amount = value / price;
      const avgCost = price / (1 + change / 100);

      return {
        name,
        price,
        change,
        value: value.toFixed(2),
        amount: amount.toFixed(6),
        avgCost: avgCost.toFixed(2),
        icon: `${name.toLowerCase()}.svg`
      };
    });
  } catch (err) {
    console.error("Error fetching prices", err);
    return [];
  }
}

async function loadAssets() {
  const list = document.getElementById("asset-list");
  list.innerHTML = "";
  const data = await fetchPrices();

  data.forEach(coin => {
    const row = document.createElement("div");
    row.className = "coin-row";
    row.innerHTML = `
      <div class="coin-left">
        <img src="${coin.icon}" class="coin-icon">
        <div>
          <div class="coin-name">${coin.name}</div>
          <div class="coin-sub">$${coin.price.toFixed(5)}</div>
          <div class="coin-sub">Today's PNL: $0.00 (${coin.change.toFixed(2)}%)</div>
          <div class="coin-sub">Average cost: $${coin.avgCost}</div>
        </div>
      </div>
      <div class="coin-right">
        <div>${coin.amount}</div>
        <div>$${coin.value}</div>
      </div>
    `;
    list.appendChild(row);
  });
}

loadAssets();
