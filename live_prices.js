const coinIds = {
  usdt: "tether",
  btc: "bitcoin",
  bnb: "binancecoin",
  bonk: "bonk"
};

async function updateFundingPrices() {
  try {
    const ids = Object.values(coinIds).join(",");
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
    const data = await res.json();

    Object.entries(coinIds).forEach(([symbol, id]) => {
      const usdDiv = document.querySelector(`.asset-usd[data-symbol="${symbol}"]`);
      const qtyDiv = document.querySelector(`.asset-name[data-symbol="${symbol}"]`)?.closest(".asset-row")?.querySelector(".asset-amount");

      if (usdDiv && qtyDiv) {
        const qty = parseFloat(qtyDiv.textContent.replace(/,/g, ""));
        const price = data[id]?.usd || 0;
        const usdValue = qty * price;

        usdDiv.textContent = `$${usdValue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`;
      }
    });
  } catch (e) {
    console.error("Live price fetch failed:", e);
  }
}

window.addEventListener("load", () => {
  updateFundingPrices();
  setInterval(updateFundingPrices, 15000);
});
