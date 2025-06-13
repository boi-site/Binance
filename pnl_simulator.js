function simulatePNL() {
  const pnlSpan = document.getElementById('total-pnl');

  const isProfit = Math.random() > 0.5;
  const amount = (Math.random() * 5).toFixed(2);
  const percent = (Math.random() * 10).toFixed(2);

  const formatted = `${isProfit ? '+' : '-'} $${amount} (${isProfit ? '+' : '-'}${percent}%)`;

  pnlSpan.textContent = formatted;
  pnlSpan.classList.remove('pnl-green', 'pnl-red');
  pnlSpan.classList.add(isProfit ? 'pnl-green' : 'pnl-red');
}

// Update every 5 seconds
setInterval(simulatePNL, 5000);

// Run once on load
simulatePNL();
