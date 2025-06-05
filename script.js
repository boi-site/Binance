// Ready for future dynamic logic
console.log("Binance clone ready");
// Dummy coin data
const coins = [
  { name: "BTC/USDT", price: 68231.21 },
  { name: "ETH/USDT", price: 3823.44 },
  { name: "BNB/USDT", price: 613.55 },
  { name: "DOGE/USDT", price: 0.127 },
  { name: "ADA/USDT", price: 0.458 }
];

function getRandomChange() {
  const val = (Math.random() * 4 - 2).toFixed(2); // -2.00% to +2.00%
  return parseFloat(val);
}

function updateCoinList() {
  const list = document.getElementById("coin-list");
  list.innerHTML = "";

  coins.forEach(coin => {
    const change = getRandomChange();
    const changeClass = change > 0 ? "green" : change < 0 ? "red" : "gray";
    const subPrice = (coin.price * 1.002).toFixed(2);

    const row = `
      <div class="coin-row">
        <div>
          <div class="coin-name">${coin.name}</div>
          <div class="coin-subtext">$${subPrice}</div>
        </div>
        <div class="price-info">
          <div class="price">$${coin.price.toFixed(2)}</div>
          <div class="percent-change ${changeClass}">${change}%</div>
        </div>
      </div>
    `;
    list.innerHTML += row;
  });
}

updateCoinList();
setInterval(updateCoinList, 4000);
// Highlight active nav
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach(item => {
  item.addEventListener("click", () => {
    navItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});
const coins = [
  { name: "BTC/USDT", price: "67,204.17", faded: "$67,204.17", change: 2.15 },
  { name: "ETH/USDT", price: "3,762.10", faded: "$3,762.10", change: -1.07 },
  { name: "BNB/USDT", price: "593.20", faded: "$593.20", change: 0.00 },
  { name: "SOL/USDT", price: "168.45", faded: "$168.45", change: 3.20 },
];

function renderCoins() {
  const list = document.getElementById("coinList");
  list.innerHTML = "";

  coins.forEach(coin => {
    let colorClass = "gray";
    if (coin.change > 0) colorClass = "green";
    else if (coin.change < 0) colorClass = "red";

    const row = document.createElement("div");
    row.className = "coin-row";
    row.innerHTML = `
      <div class="coin-name">${coin.name}</div>
      <div>
        <div class="coin-price"><b>${coin.price}</b></div>
        <div class="coin-price">${coin.faded}</div>
      </div>
      <div class="coin-change ${colorClass}">${coin.change.toFixed(2)}%</div>
    `;
    list.appendChild(row);
  });
}

renderCoins();
