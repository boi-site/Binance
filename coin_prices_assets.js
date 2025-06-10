const coins = [
  { symbol: 'USDT', icon: 'usdt.svg', amount: 1.03117068, avgCost: 1.00 },
  { symbol: 'BONK', icon: 'bonk.svg', amount: 12000, avgCost: 0.00001483 },
  { symbol: 'ETH', icon: 'eth.svg', amount: 0.00005666, avgCost: 2642.77 }
];

const fmt = n => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 5 });

function updateUI() {
  const list = document.getElementById('cryptoList');
  list.innerHTML = '';

  coins.forEach(c => {
    const price = c.avgCost * (1 + Math.random() * 0.05 - 0.025);
    const value = c.amount * price;
    const cost = c.amount * c.avgCost;
    const pnl = value - cost;
    const pnlPercent = ((pnl / cost) * 100).toFixed(2);

    const div = document.createElement('div');
    div.className = 'crypto';
    div.innerHTML = `
      <div class="info">
        <img src="${c.icon}" class="icon" />
        <div>
          <strong>${c.symbol}</strong>
          <div class="details">${c.symbol === 'USDT' ? 'TetherUS' : c.symbol}</div>
        </div>
      </div>
      <div class="crypto-right">
        <div class="amount">${c.amount}</div>
        <div class="price">$${fmt(price)}</div>
        <div class="stats">
          Today's PNL: $${fmt(pnl)} (${pnlPercent}%)
          ${c.symbol === 'ETH' ? `<br>Average cost: $${fmt(c.avgCost)}` : ''}
        </div>
      </div>
    `;
    list.appendChild(div);
  });
}

updateUI();
setInterval(updateUI, 5000);

// Tab navigation
document.querySelectorAll('.nav-tabs button').forEach(btn => {
  btn.onclick = () => {
    if (btn.classList.contains('active')) return;
    document.querySelectorAll('.nav-tabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const pageId = btn.dataset.page;
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
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
