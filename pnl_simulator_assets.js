const pnlSymbols = ["usdt", "bonk", "eth", "btc", "bnb"];

function getRandomPNL() {
  const percent = (Math.random() * 2 - 1).toFixed(2); // Random between -1.00 and +1.00
  const dollar = (Math.random() * 1).toFixed(2);      // Small USD change
  const isPositive = percent >= 0;

  return {
    percent,
    dollar,
    isPositive
  };
}

function updatePNLs() {
  pnlSymbols.forEach(symbol => {
    const pnlDiv = document.querySelector(`[data-symbol="${symbol}-pnl"]`);
    if (pnlDiv) {
      const { percent, dollar, isPositive } = getRandomPNL();
      pnlDiv.textContent = `$${dollar} (${percent}%)`;
      pnlDiv.className = isPositive
        ? "asset-sub-label-right pnl-green"
        : "asset-sub-label-right pnl-red";
    }
  });
}

function updateTotalPNL() {
  let totalPNL = 0;

  pnlSymbols.forEach(symbol => {
    const pnlText = document.querySelector(`[data-symbol="${symbol}-pnl"]`)?.textContent;
    if (pnlText) {
      const match = pnlText.match(/\$([0-9,.\-]+)/);
      if (match) {
        const usdValue = parseFloat(match[1].replace(/,/g, ""));
        totalPNL += usdValue;
      }
    }
  });

  const totalPNLSpan = document.getElementById("total-pnl");
  if (totalPNLSpan) {
    const formatted = `$${Math.abs(totalPNL).toFixed(2)}`;
    const colorClass = totalPNL > 0 ? "pnl-green" : totalPNL < 0 ? "pnl-red" : "";

    totalPNLSpan.className = colorClass;
    totalPNLSpan.textContent = `${totalPNL >= 0 ? "" : "-"}${formatted}`;
  }
}

window.addEventListener("load", () => {
  updatePNLs();
  setTimeout(updateTotalPNL, 500);
  setInterval(() => {
    updatePNLs();
    updateTotalPNL();
  }, 15000);
});
