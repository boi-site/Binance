const coinIds = {
  usdt: "tether",
  btc: "bitcoin",
  bnb: "binancecoin",
  bonk: "bonk",
  eth: "ethereum"
};

async function updateAssetPrices() {
  try {
    const ids = Object.values(coinIds).join(",");
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
    const data = await res.json();

    Object.entries(coinIds).forEach(([symbol, id]) => {
      const usdDiv = document.querySelector(`.asset-usd[data-symbol="${symbol}-usd"]`);
      const qtyDiv = document.querySelector(`.asset-name[data-symbol="${symbol}"]`)?.closest(".asset-row")?.querySelector(".asset-amount");
      const costDiv = document.querySelector(`.asset-sub-label-right[data-symbol="${symbol}-cost"]`);

      if (usdDiv && qtyDiv) {
        const qty = parseFloat(qtyDiv.textContent.replace(/,/g, ""));

        let price = data[id]?.usd;

        if (symbol === "bonk") {
          price = price || 0.000000017;
        } else {
          price = price || 0;
        }

        const usdValue = qty * price;

        usdDiv.textContent = `$${usdValue.toLocaleString(undefined, {
          minimumFractionDigits: 6,
          maximumFractionDigits: 8
        })}`;

        if (costDiv) {
          costDiv.textContent = `$${price.toLocaleString(undefined, {
            minimumFractionDigits: 8,
            maximumFractionDigits: 8
          })}`;
        }
      }
    });
  } catch (e) {
    console.error("Live asset price fetch failed:", e);
  }
}

window.addEventListener("load", () => {
  updateAssetPrices();
  setInterval(updateAssetPrices, 15000);
});
