// ─── total_value.js ────────────────────────────────────────────────

const tokenQuantities = {
  usdt: 244069916.56,
  btc: 1354.01,
  bnb: 31203.02,
  bonk: 12000
};

const coinIds = {
  usdt: "tether",
  btc: "bitcoin",
  bnb: "binancecoin",
  bonk: "bonk"
};

async function updateTotalBalance() {
  try {
    const ids = Object.values(coinIds).join(",");
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
    const data = await res.json();

    let total = 0;

    Object.keys(tokenQuantities).forEach(symbol => {
      const id = coinIds[symbol];
      const qty = tokenQuantities[symbol];
      const price = data[id]?.usd || 0;
      total += qty * price;
    });

    const totalElement = document.getElementById("balance-total");
    if (totalElement) {
      totalElement.innerHTML = `$${total.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} <span class="usd-tag">USD ▼</span>`;
    }
  } catch (e) {
    console.error("Failed to fetch total value:", e);
  }
}

window.addEventListener("load", () => {
  updateTotalBalance();
  setInterval(updateTotalBalance, 15000);
});
