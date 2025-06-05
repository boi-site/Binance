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
