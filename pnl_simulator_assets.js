const pnlSymbols = ["usdt", "bonk", "eth"];

function getRandomPNL() {
  const percent = (Math.random() * 2 - 1).toFixed(2); // Random between -1.00 and +1.00
  const dollar = (Math.random() * 1).toFixed(2); // Small USD change
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
      pnlDiv.className = isPositive ? "asset-sub-label-right pnl-green" : "asset-sub-label-right pnl-red";
    }
  });
}

window.addEventListener("load", () => {
  updatePNLs();
  setInterval(updatePNLs, 15000);
});
