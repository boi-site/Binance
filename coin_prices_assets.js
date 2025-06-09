const coins = [
  {symbol:'BTC', icon:'btc.svg', amount:2534.56, avgCost:60000},
  {symbol:'ETH', icon:'eth.svg', amount:17234.12, avgCost:4000},
  {symbol:'BONK', icon:'btc.svg', amount:9999999, avgCost:0.05},
  {symbol:'XRP', icon:'xrp.svg', amount:2000000, avgCost:0.5},
  {symbol:'USDT', icon:'usdt.svg', amount:300000, avgCost:1}
];

const format = n =>
  n.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
const simulate = base => base * (1 + (Math.random()-0.5)*0.02);

function updateUI() {
  let totalPnl = 0;
  const list = document.getElementById('cryptoList');
  list.innerHTML = '';
  coins.forEach(c => {
    const price = simulate(c.avgCost);
    const value = price * c.amount;
    const cost = c.avgCost * c.amount;
    const pnl = value - cost;
    totalPnl += pnl;

    const div = document.createElement('div');
    div.className = 'crypto';
    div.innerHTML = `
      <div class="info">
        <img class="icon" src="https://raw.githubusercontent.com/boi-site/Binance/main/${c.icon}" alt="${c.symbol}" />
        <div><strong>${c.symbol}</strong><div class="details">${c.symbol==='USDT'?'TetherUS':c.symbol}</div></div>
      </div>
      <div class="crypto-right">
        <div class="amount">${format(c.amount)}</div>
        <div class="price">$${format(price)}</div>
        <div class="stats">PNL: $${format(pnl)}<br>Cost: $${format(cost)}</div>
      </div>`;
    list.appendChild(div);
  });

  const overall = totalPnl;
  const perc = (overall / 406783194.24) * 100;
  document.getElementById('overallPnl').textContent =
    `${overall < 0 ? '‑' : '+'}$${format(Math.abs(overall))} (${overall < 0 ? '' : '+'}${perc.toFixed(2)}%)`;
}

updateUI();
setInterval(updateUI, 5000);

// Top toggle: Exchange / Wallet
document.querySelectorAll('.top-toggle button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.top-toggle button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Main nav-tabs
document.querySelectorAll('.nav-tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-tabs button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.page').forEach(p=>p.style.display='none');
    document.getElementById(btn.dataset.target).style.display='block';
  });
});

// Bottom navigation behavior
document.querySelectorAll('.bottom-nav div').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.bottom-nav div').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    if(btn.dataset.page === 'home') {
      document.querySelector('.nav-tabs button[data-target="overview"]').click();
    } else if(btn.dataset.page === 'assets') {
      document.querySelector('.nav-tabs button[data-target="funding"]').click();
    } else {
      alert(`${btn.dataset.page.charAt(0).toUpperCase() + btn.dataset.page.slice(1)} (dummy)`);
    }
  });
});
