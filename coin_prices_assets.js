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
      .filter(item => coins.includes(item.symbol.replace("USDT", "").toLowerCase()))
      .map(item => {
        const name = item.symbol.replace("USDT", "");
        const price = parseFloat(item.lastPrice);
        const change = parseFloat(item.priceChangePercent);
        const value = allocations[name.toUpperCase()];
        const amount = value / price;
        const avgCost = price / (1 + change / 100);

        return {
          name,
          price,
          change,
          value: value.toFixed(2),
          amount: amount.toFixed(8),
          avgCost: avgCost.toFixed(2),
          icon: `${name.toLowerCase()}.svg`
        };
      });
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
  let totalValue = 0;
  let totalPNL = 0;

  // Sort assets by USD value descending
  coinData.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));

  coinData.forEach(coin => {
    const value = parseFloat(coin.value);
    const pnlUSD = value * (coin.change / 100);

    totalChange += coin.change;
    totalValue += value;
    totalPNL += pnlUSD;

    const row = document.createElement("div");
    row.className = "asset-row";

    row.innerHTML = `
      <div class="asset-left">
        <img src="${coin.icon}" class="asset-icon-img" />
        <div class="asset-info">
          <div class="asset-name">${coin.name}</div>
          <div class="asset-sub">$${coin.price.toFixed(5)}</div>
          <div class="asset-sub">Today's PNL: $0.00 (${coin.change.toFixed(2)}%)</div>
          ${coin.name === 'eth' ? `<div class="asset-sub">Average cost: $${coin.avgCost}</div>` : ''}
        </div>
      </div>
      <div class="asset-right">
        <div class="asset-amount">${coin.amount}</div>
        <div class="asset-usd">$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
      </div>
    `;

    list.appendChild(row);
  });

  const pnl = document.getElementById("total-pnl");
  if (pnl && coinData.length > 0 && totalValue > 0) {
    const avgChange = totalChange / coinData.length;
    const pnlPercent = (totalPNL / totalValue) * 100;

    pnl.innerHTML = `
      $${totalPNL.toFixed(8)} 
      (<span style="color:#0ecb81">${pnlPercent.toFixed(2)}%</span>)
    `;
  }

  // OPTIONAL: Do NOT overwrite hardcoded balance amount
  // document.querySelector(".balance-amount").innerHTML = `$${totalValue.toFixed(2)} <span class="usd-tag">USD ▼</span>`;
}

loadAssets();
