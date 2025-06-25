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
  let totalPercent = 0;

  pnlSymbols.forEach(symbol => {
    const pnlText = document.querySelector(`[data-symbol="${symbol}-pnl"]`)?.textContent;
    if (pnlText) {
      const dollarMatch = pnlText.match(/\$([0-9,.\-]+)/);
      const percentMatch = pnlText.match(/\(([\+\-]?[0-9.]+)%\)/);

      if (dollarMatch && percentMatch) {
        const usdValue = parseFloat(dollarMatch[1].replace(/,/g, ""));
        const percentValue = parseFloat(percentMatch[1]);

        totalPNL += usdValue;
        totalPercent += percentValue;
      }
    }
  });

  const totalPNLSpan = document.getElementById("total-pnl");
  if (totalPNLSpan) {
    const isPositive = totalPNL >= 0;
    const sign = isPositive ? "+" : "-";
    const absTotal = Math.abs(totalPNL).toFixed(8);
    const absPercent = Math.abs(totalPercent).toFixed(2);

    totalPNLSpan.textContent = `${sign}$${absTotal} (${sign}${absPercent}%)`;
    totalPNLSpan.className = isPositive ? "pnl-green" : "pnl-red";
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
