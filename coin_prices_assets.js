const totalValue = 406783194.24;

const coins = [
  { symbol: 'BTC', icon: 'btc.svg', allocation: 0.35, avgCost: 60000 },
  { symbol: 'ETH', icon: 'eth.svg', allocation: 0.30, avgCost: 4000 },
  { symbol: 'XRP', icon: 'xrp.svg', allocation: 0.20, avgCost: 0.5 },
  { symbol: 'BONK', icon: 'btc.svg', allocation: 0.05, avgCost: 0.00002 },
  { symbol: 'USDT', icon: 'usdt.svg', amount: 300000, avgCost: 1 }
];

function formatNumber(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function simulatePrice(avg) {
  return avg * (1 + (Math.random() - 0.5) * 0.02); // ±1%
}

function updateUI() {
  let overallPnl = 0;
  const list = document.getElementById('cryptoList');
  list.innerHTML = '';

  coins.forEach(c => {
    const price = simulatePrice(c.avgCost);
    let amount, value, cost;

    if (c.amount !== undefined) {
      amount = c.amount;
      value = price * amount;
      cost = c.avgCost * amount;
    } else {
      value = totalValue * c.allocation;
      amount = value / price;
      cost = c.avgCost * amount;
    }

    const pnl = value - cost;
    overallPnl += pnl;

    const item = document.createElement('div');
    item.className = 'crypto';
    item.innerHTML = `
      <div class="info">
        <img class="icon" src="https://raw.githubusercontent.com/boi-site/Binance/main/${c.icon}" alt="${c.symbol}">
        <div>
          <strong>${c.symbol}</strong><br>
          <span class="details">${c.symbol === 'USDT' ? 'TetherUS' : c.symbol}</span>
        </div>
      </div>
      <div>
        <div><strong>${formatNumber(amount)}</strong></div>
        <div class="details">$${formatNumber(price)}</div>
        <div class="pnl-cost">
          <span>PNL: $${formatNumber(pnl)}</span>
          <span>Cost: $${formatNumber(cost)}</span>
        </div>
      </div>`;
    list.appendChild(item);
  });

  const percent = (overallPnl / totalValue) * 100;
  document.getElementById('overallPnl').textContent =
    `Today's PNL: $${formatNumber(overallPnl)} (${percent.toFixed(2)}%) ›`;
}

updateUI();
setInterval(updateUI, 5000);

// Top tabs
document.querySelectorAll('.nav-tabs button').forEach(btn => {
  btn.onclick = () => {
    const target = btn.dataset.page;
    document.querySelectorAll('.nav-tabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('#overview-page, #earn-page, #funding-page, #spot-page')
      .forEach(pg => pg.style.display = 'none');
    document.getElementById(`${target}-page`).style.display = 'block';

    if (['earn', 'spot'].includes(target)) {
      alert(`${target.charAt(0).toUpperCase() + target.slice(1)} Page (dummy)`);
    }
  };
});

// Bottom nav
document.querySelectorAll('.bottom-nav div').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.bottom-nav div').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const page = btn.dataset.page;
    if (page === 'home') {
      document.querySelector('.nav-tabs button[data-page="overview"]').click();
    } else if (page === 'assets') {
      document.querySelector('.nav-tabs button[data-page="funding"]').click();
    } else {
      alert(`${page.charAt(0).toUpperCase() + page.slice(1)} Page (dummy)`);
    }
  };
});
