const coins = ['btc','eth','xrp','bonk','usdt'];
const allocations = {
  BTC: 162713277.70,
  ETH: 81356638.85,
  XRP: 20339159.71,
  BONK: 20339159.71,
  USDT: 100000000.00
};

async function fetchPrices() {
  try {
    const res = await fetch('https://api.binance.com/api/v3/ticker/24hr');
    const data = await res.json();

    const filtered = data.filter(item =>
      coins.includes(item.symbol.replace('USDT','').toLowerCase())
    );

    return filtered.map(item => {
      const name = item.symbol.replace('USDT','');
      const price = parseFloat(item.lastPrice);
      const change = parseFloat(item.priceChangePercent);
      const value = allocations[name.toUpperCase()] || 0;
      const amount = value / price;
      const avgCost = price / (1 + change/100);
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
    console.error('Fetch error:', e);
    return [];
  }
}

async function loadAssets() {
  const list = document.getElementById('asset-list');
  list.innerHTML = '';
  const coinData = await fetchPrices();
  let totalChange = 0;

  coinData.forEach(coin => {
    totalChange += coin.change;
    const row = document.createElement('div');
    row.className = 'asset-row';
    row.innerHTML = `
      <div class="asset-left">
        <img src="${coin.icon}" class="asset-icon-img" alt="${coin.name}"/>
        <div class="asset-info">
          <div class="asset-name">${coin.name.toUpperCase()}</div>
          <div class="asset-sub">$${coin.price.toFixed(5)}</div>
          <div class="asset-sub">Today's PNL: $0.00 (${coin.change.toFixed(2)}%)</div>
          <div class="asset-sub">Average cost: $${coin.avgCost}</div>
        </div>
      </div>
      <div class="asset-right">
        <div class="asset-amount">${coin.amount}</div>
        <div class="asset-usd">$${coin.value}</div>
      </div>`;
    list.appendChild(row);
  });

  const pnlEl = document.getElementById('total-pnl');
  if (pnlEl && coinData.length) {
    const avg = (totalChange / coinData.length).toFixed(2);
    pnlEl.textContent = `+0.00 (${avg}%)`;
  }
}

loadAssets();
