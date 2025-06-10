const totalValue = 406783194.24;
const coins = [
  { symbol: 'BTC', icon: 'btc.svg', allocation: 0.35, avgCost: 60000 },
  { symbol: 'ETH', icon: 'eth.svg', allocation: 0.30, avgCost: 4000 },
  { symbol: 'XRP', icon: 'xrp.svg', allocation: 0.20, avgCost: 0.5 },
  { symbol: 'BONK', icon: 'bonk.svg', allocation: 0.05, avgCost: 0.00002 },
  { symbol: 'USDT', icon: 'usdt.svg', amount: 300000, avgCost: 1 }
];

const fmt = n => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const sim = avg => avg * (1 + (Math.random() - 0.5) * 0.02);

function updateUI() {
  let totalPnl = 0;
  const list = document.getElementById('cryptoList');
  list.innerHTML = '';

  coins.forEach(c => {
    const price = sim(c.avgCost);
    let amount, value, cost;

    if (c.amount !== undefined) {
      amount = c.amount;
      value = price * amount;
      cost = c.avgCost * amount;
    } else {
      value = totalValue * c.allocation;
      amount = value / price;
      cost = amount * c.avgCost;
    }

    const pnl = value - cost;
    totalPnl += pnl;

    const item = document.createElement('div');
    item.className = 'crypto';
    item.innerHTML = `
      <div class="info">
        <img class="icon" src="${c.icon}" alt="${c.symbol}">
        <div>
          <strong>${c.symbol}</strong>
          <div class="details">${c.symbol === 'USDT' ? 'TetherUS' : c.symbol}</div>
        </div>
      </div>
      <div class="crypto-right">
        <div class="amount">${fmt(amount)}</div>
        <div class="price">$${fmt(price)}</div>
        <div class="stats">
          PNL: $${fmt(pnl)}<br>Cost: $${fmt(cost)}
        </div>
      </div>`;
    list.appendChild(item);
  });

  const percent = (totalPnl / totalValue) * 100;
  document.getElementById('overallPnl').textContent =
    `${totalPnl < 0 ? '‑' : '+'}$${fmt(Math.abs(totalPnl))} (${percent.toFixed(2)}%) ›`;
}

updateUI();
setInterval(updateUI, 5000);

// Top navigation (Overview, Earn, Funding, Spot)
document.querySelectorAll('.nav-tabs button').forEach(btn => {
  btn.onclick = () => {
    if (btn.classList.contains('active')) return; // Don't reapply
    document.querySelectorAll('.nav-tabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const pageId = btn.dataset.page;
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
  };
});

// Bottom navigation (Home, Assets, etc.)
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
