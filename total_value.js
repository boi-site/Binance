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

    for (const [symbol, qty] of Object.entries(tokenQuantities)) {
      const id = coinIds[symbol];
      const price = data[id]?.usd;
      if (price) {
        total += qty * price;
      }
    }

    const balanceEl = document.getElementById("balance-total");
    if (balanceEl) {
      balanceEl.innerHTML = `$${total.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} <span class="usd-tag">USD ▼</span>`;
    }

  } catch (error) {
    console.error("Error updating total balance:", error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  updateTotalBalance();
  setInterval(updateTotalBalance, 15000);
});
