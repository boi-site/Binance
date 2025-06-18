// ─── total_value.js ──────────────────────────────────────────────

// Fixed token quantities (edit only here to update everywhere)
const fixedQuantities = {
  usdt: 244069916.56, // 60% of 406,783,194.27
  btc: 1.368,         // 35% worth of BTC
  bnb: 1354.3,        // 5% worth of BNB
  bonk: 12000         // stays unchanged, very small portion
};

// Map to CoinGecko IDs
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

    Object.keys(fixedQuantities).forEach(symbol => {
      const id = coinIds[symbol];
      const price = data[id]?.usd || 0;
      const quantity = fixedQuantities[symbol];
      total += price * quantity;
    });

    const balanceDiv = document.getElementById("balance-total");
    if (balanceDiv) {
      balanceDiv.innerHTML = `$${total.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} <span class="usd-tag">USD ▼</span>`;
    }
  } catch (err) {
    console.error("Failed to update total balance:", err);
  }
}

window.addEventListener("load", () => {
  updateTotalBalance();
  setInterval(updateTotalBalance, 15000);
});
