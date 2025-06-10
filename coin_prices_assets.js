const coins = ['btc', 'eth', 'xrp', 'bonk', 'usdt'];
const allocations = {
  BTC: 162713277.70,
  ETH: 81356638.85,
  XRP: 20339159.71,
  BONK: 20339159.71,
  USDT: 100000000.00
};

async function fetchPrices() {
  try {
    const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
    const data = await res.json();

    return data
      .filter(item =>
        item.symbol.endsWith("USDT") &&
        coins.includes(item.symbol.replace("USDT", "").toLowerCase())
      )
      .map(item => {
        const name = item.symbol.replace("USDT", "");
        const price = parseFloat(item.lastPrice);
        const change = parseFloat(item.priceChangePercent);
        const value = allocations[name.toUpperCase()];
        if (!value) return null;
        const amount = value / price;
        const avgCost = price / (1 + change / 100);

        return {
          name,
          price,
          change,
          value,
          amount,
          avgCost,
          icon: `${name.toLowerCase()}.svg`
        };
      }).filter(Boolean);
  } catch (e) {
    console.error("Failed to fetch prices", e);
    return [];
  }
}

async function loadAssets() {
  const list = document.getElementById("asset-list");
  list.innerHTML = '<div class="loading">Loading assets…</div>';

  const coinData = await fetchPrices();
  list.innerHTML = '';

  if (coinData.length === 0) {
    list.innerHTML = '<div class="loading">No assets found or failed to load.</div>';
    return;
  }

  let totalValue = 0, totalCost = 0, totalChange = 0;

  coinData.forEach(coin => {
    const { name, price, change, value, amount, avgCost, icon } = coin;
    totalValue += value;
    totalCost += avgCost * amount;
    totalChange += change;

    const row = document.createElement("div");
    row.className = "asset-row";
    row.innerHTML = `
      <div class="asset-left">
        <img src="${icon}" class="asset-icon-img" onerror="this.src='default.svg'" />
        <div class="asset-info">
          <div class="asset-name">${name.toUpperCase()}</div>
          <div class="asset-sub">$${price.toFixed(name === 'usdt' ? 2 : 5)}</div>
          <div class="asset-sub">Today's PNL: $${(price * amount - avgCost * amount).toFixed(2)} (${change.toFixed(2)}%)</div>
          <div class="asset-sub">Average cost: $${avgCost.toFixed(2)}</div>
        </div>
      </div>
      <div class="asset-right">
        <div class="asset-amount">${amount.toFixed(8)}</div>
        <div class="asset-usd">$${value.toFixed(2)}</div>
      </div>
    `;
    list.appendChild(row);
  });

  const pnlEl = document.getElementById("total-pnl");
  const netPNL = totalValue - totalCost;
  const avgChange = totalChange / coinData.length;
  pnlEl.textContent = `$${netPNL.toFixed(8)} (${avgChange.toFixed(2)}%)`;
  pnlEl.className = netPNL >= 0 ? 'pnl-green' : 'pnl-red';

  document.getElementById("balance-total").innerHTML = `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span class="usd-tag">USD ▼</span>`;
}

loadAssets();
