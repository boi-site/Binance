// Toggle active class for bottom nav icons
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// Simulate real-time price updates
function updatePrices() {
  document.querySelectorAll('.price-change').forEach(cell => {
    const change = (Math.random() * 5 - 2.5).toFixed(2); // random between -2.5% and +2.5%
    const value = parseFloat(change);

    cell.textContent = (value > 0 ? '+' : '') + change + '%';

    cell.classList.remove('positive', 'negative', 'neutral');

    if (value > 0) {
      cell.classList.add('positive');
    } else if (value < 0) {
      cell.classList.add('negative');
    } else {
      cell.classList.add('neutral');
    }
  });

  // Repeat every 4 seconds
  setTimeout(updatePrices, 4000);
}

// Start updates when DOM is ready
document.addEventListener('DOMContentLoaded', updatePrices);
