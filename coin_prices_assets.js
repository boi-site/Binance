const totalValue = 406783194.24;
const coins = [
  { symbol: 'USDT', icon: 'usdt.svg', amount: 1.03117068, avgCost: 1 },
  { symbol: 'BONK', icon: 'bonk.svg', amount: 12000, avgCost: 0.00001483 },
  { symbol: 'ETH', icon: 'eth.svg', amount: 0.00005666, avgCost: 2642.77 }
];

const fmt = n => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const sim = avg => avg * (1 + (Math.random() - 0.5) * 0.02);

function updateUI() {
  let totalPnl = 0;
  const list = document.getElementById('cryptoList');
  list.innerHTML = '';

  coins.forEach(c => {
    const price = sim(c.avgCost);
    const value = price * c.amount;
    const cost = c.avgCost * c.amount;
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
        <div class="amount">${c.amount}</div>
        <div class="price">$${fmt(price)}</div>
        <div class="stats">Today's PNL: $${fmt(pnl)} (${(pnl / cost * 100).toFixed(2)}%)</div>
        ${c.symbol === 'ETH' ? `<div class="avg-cost">Average cost: $${fmt(c.avgCost)}</div>` : ''}
      </div>`;
    list.appendChild(item);
  });

  const percent = (totalPnl / totalValue) * 100;
  document.getElementById('overallPnl').textContent =
    `${totalPnl < 0 ? '‑' : '+'}$${fmt(Math.abs(totalPnl))} (${percent.toFixed(2)}%) ›`;
}

updateUI();
setInterval(updateUI, 5000);

// Top navigation
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

// Bottom navigation
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
