function simulatePNL() {
  const pnlSpan = document.getElementById('total-pnl');

  const isProfit = Math.random() > 0.5;
  const amount = (Math.random() * 5).toFixed(2);
  const percent = (Math.random() * 10).toFixed(2);

  const formatted = `$${amount} (${isProfit ? '+' : '-'}${percent}%)`;

  pnlSpan.textContent = formatted;
  pnlSpan.className = isProfit ? 'pnl-green' : 'pnl-red';
}

// Update every 5 seconds
setInterval(simulatePNL, 5000);

// Run once on load
simulatePNL();
