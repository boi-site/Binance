const coins = ['BTC', 'ETH', 'XRP', 'BONK', 'USDT'];

const allocations = {
  BTC: 162713277.70,
  ETH: 81356638.85,
  XRP: 20339159.71,
  BONK: 20339159.71,
  USDT: 100000000.00
};

async function fetchPrices() {
  console.log("Fetching prices...");
  try {
    const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
    const data = await res.json();

    const filtered = data
      .filter(item =>
        item.symbol.endsWith("USDT") &&
        coins.includes(item.symbol.replace("USDT", ""))
      )
      .map(item => {
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
          amount: amount.toFixed(8),
          avgCost: avgCost.toFixed(2),
          icon: `icons/${name.toLowerCase()}.svg`
        };
      });

    console.log("Coin Data:", filtered);
    return filtered;
  } catch (e) {
    console.error("Failed to fetch prices", e);
    return [];
  }
}

async function loadAssets() {
  const list = document.getElementById("asset-list");
  list.innerHTML = "";

  const coinData = await fetchPrices();
  let totalChange = 0;

  coinData.forEach(coin => {
    totalChange += coin.change;

    const row = document.createElement("div");
    row.className = "asset-row";

    row.innerHTML = `
      <div class="asset-left">
        <img src="${coin.icon}" class="asset-icon-img" alt="${coin.name}" />
        <div class="asset-info">
          <div class="asset-name">${coin.name}</div>
          <div class="asset-sub">$${coin.price.toFixed(5)}</div>
          <div class="asset-sub">Today's PNL: $0.00 (${coin.change.toFixed(2)}%)</div>
          <div class="asset-sub">Average cost: $${coin.avgCost}</div>
        </div>
      </div>
      <div class="asset-right">
        <div class="asset-amount">${coin.amount}</div>
        <div class="asset-usd">$${coin.value}</div>
      </div>
    `;

    list.appendChild(row);
  });

  const pnl = document.getElementById("total-pnl");
  if (pnl && coinData.length > 0) {
    const avgChange = totalChange / coinData.length;
    pnl.textContent = `+0.00 (${avgChange.toFixed(2)}%)`;
  }
}

document.addEventListener("DOMContentLoaded", loadAssets);
