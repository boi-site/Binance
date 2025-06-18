const coinIdMap = {
  usdt: "tether",
  btc: "bitcoin",
  bnb: "binancecoin",
  bonk: "bonk"
};

const tokenQuantities = {
  usdt: 244069916.56,
  btc: 1354.01,
  bnb: 31203.02,
  bonk: 12000
};

async function updateTotalValue() {
  try {
    const ids = Object.values(coinIdMap).join(",");
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
    const data = await res.json();

    let total = 0;

    Object.keys(tokenQuantities).forEach(symbol => {
      const id = coinIdMap[symbol];
      const qty = tokenQuantities[symbol];
      const price = data[id]?.usd || 0;
      total += qty * price;
    });

    const totalDisplay = document.getElementById("balance-total");
    if (totalDisplay) {
      totalDisplay.innerHTML = `$${total.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} <span class="usd-tag">USD ▼</span>`;
    }
  } catch (err) {
    console.error("Failed to fetch prices for total value:", err);
  }
}

window.addEventListener("load", () => {
  updateTotalValue();
  setInterval(updateTotalValue, 15000);
});
