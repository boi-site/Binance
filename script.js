// Update time
function updateTime() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById("time").textContent = time;
}
setInterval(updateTime, 1000);
updateTime();

// Toggle nav icon highlight
const icons = document.querySelectorAll('.nav-icon');
icons.forEach(icon => {
  icon.addEventListener('click', () => {
    icons.forEach(i => i.classList.remove('active'));
    icon.classList.add('active');
  });
});

// Simulate price updates
function updatePrices() {
  document.querySelectorAll('.token .change').forEach(el => {
    const rand = Math.random();
    if (rand > 0.66) {
      el.textContent = "+" + (Math.random() * 5).toFixed(2) + "%";
      el.dataset.change = "up";
    } else if (rand > 0.33) {
      el.textContent = "-" + (Math.random() * 5).toFixed(2) + "%";
      el.dataset.change = "down";
    } else {
      el.textContent = "0.00%";
      el.dataset.change = "same";
    }
  });
}
setInterval(updatePrices, 3000);
