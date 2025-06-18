// ─── total_value.js ────────────────────────────────────────────────

const tokenQuantities = {
  usdt: 245833916.56,   // 60% of $406,783,194.27
  btc: 142374118.00,    // 35%
  bnb: 20339159.71,     // 5%
  bonk: 0               // negligible USD value, ignored for total
};

const coinIds = {
  usdt: "tether",
  btc: "bitcoin",
  bnb: "binancecoin"
};

async function updateTotalValue() {
  try {
    const ids = Object.values(coinIds).join(",");
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
    const prices = await res.json();

    let total = 0;
    for (const symbol in tokenQuantities) {
      const id = coinIds[symbol];
      const qty = tokenQuantities[symbol];
      const price = prices[id]?.usd || 0;
      total += qty;
    }

    const totalElement = document.getElementById("balance-total");
    if (totalElement) {
      totalElement.innerHTML = `$${total.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} <span class="usd-tag">USD ▼</span>`;
    }
  } catch (e) {
    console.error("Total balance fetch failed:", e);
  }
}

window.addEventListener("load", () => {
  updateTotalValue();
  setInterval(updateTotalValue, 15000);
});
