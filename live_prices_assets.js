const coinIds = {
  usdt: "tether",
  btc: "bitcoin",
  bnb: "binancecoin",
  bonk: "bonk"
};

const tokenQuantities = {
  usdt: 1.03117068,
  btc: 0,
  bnb: 0,
  bonk: 12000,
  eth: 0.00005666
};

async function updateAssetPrices() {
  try {
    const ids = Object.values(coinIds).join(",");
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
    const data = await res.json();

    Object.entries(coinIds).forEach(([symbol, id]) => {
      const price = data[id]?.usd || 0;

      // Update small faded price line
      const faded = document.querySelector(`[data-symbol="${symbol}-price"]`);
      if (faded) {
        faded.textContent = `$${price.toFixed(2)}`;
      }

      // Update USD value = price * qty
      const qtyDiv = document.querySelector(`.asset-name[data-symbol="${symbol}"]`)?.closest(".asset-row")?.querySelector(".asset-amount");
      const usdDiv = document.querySelector(`.asset-usd[data-symbol="${symbol}-usd"]`);
      const avgCostDiv = document.querySelector(`[data-symbol="${symbol}-cost"]`);

      if (qtyDiv && usdDiv) {
        const qty = parseFloat(qtyDiv.textContent.replace(/,/g, ""));
        const usd = qty * price;

        usdDiv.textContent = `$${usd.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`;

        if (avgCostDiv) {
          avgCostDiv.textContent = `$${price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}`;
        }
      }
    });
  } catch (err) {
    console.error("Error loading live asset prices:", err);
  }
}

window.addEventListener("load", () => {
  updateAssetPrices();
  setInterval(updateAssetPrices, 15000);
});
