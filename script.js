// Real-time clock
function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  clock.textContent = `${hours}:${minutes}`;
}
setInterval(updateClock, 1000);
updateClock();

// Dummy coin data
const coins = [
  { name: "BNB", price: 668.06 },
  { name: "BTC", price: 105354.82 },
  { name: "ETH", price: 2650.61 },
  { name: "PEPE", price: 0.00001241 },
  { name: "SOL", price: 156.93 },
  { name: "XRP", price: 2.2354 }
];

function randomChange() {
  return +(Math.random() * 6 - 3).toFixed(2); // ±3%
}

function renderCoins() {
  const list = document.getElementById('coin-list');
  list.innerHTML = '';
  coins.forEach((coin) => {
    const change = randomChange();
    const percentText = `${change > 0 ? "+" : ""}${change.toFixed(2)}%`;
    const boxClass = change > 0 ? "green" : change < 0 ? "red" : "gray";
    const row = `
      <div class="coin-row">
        <span>${coin.name}</span>
        <span>$${coin.price.toLocaleString()}</span>
        <span class="price-box ${boxClass}">${percentText}</span>
      </div>
    `;
    list.innerHTML += row;
  });
}
setInterval(renderCoins, 3000);
renderCoins();
