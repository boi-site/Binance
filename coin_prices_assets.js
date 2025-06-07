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
    const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
    const data = await res.json();

    return data
      .filter(item => coins.includes(item.symbol.replace("USDT", "").toLowerCase()))
      .map(item => {
        const name = item.symbol.replace("USDT", "");
        const price = parseFloat(item.lastPrice);
        const change = parseFloat(item.priceChangePercent);
        const value = allocations[name];
        const amount = value / price;
        const avgCost = price / (1 + change / 100); // crude approximation

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
  } catch (e) {
    console.error("Price fetch error", e);
    return [];
  }
}

async function loadAssets() {
  const list = document.getElementById("asset-list");
  list.innerHTML = "";

  const coinData = await fetchPrices();

  let totalPNL = 0;

  coinData.forEach(coin => {
    const pnlValue = ((coin.price - coin.avgCost) / coin.avgCost) * 100;
    totalPNL += parseFloat(coin.change);

    const row = document.createElement("div");
    row.className = "asset-row";

    row.innerHTML = `
      <div class="asset-left">
        <img src="${coin.icon}" alt="${coin.name}" class="asset-icon-img" />
        <div class="asset-info">
          <div class="asset-name">${coin.name}</div>
          <div class="asset-sub">$${coin.price.toFixed(5)}</div>
          <div class="asset-sub">Today’s PNL: $0.00 (${coin.change.toFixed(2)}%)</div>
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

  const avgTotalPNL = (totalPNL / coinData.length).toFixed(2);
  const totalPNLSpan = document.getElementById("total-pnl");
  if (totalPNLSpan) {
    totalPNLSpan.textContent = `+0.00 (${avgTotalPNL}%)`;
  }
}

loadAssets();
