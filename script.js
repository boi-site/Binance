// Redirect to home.html when "Next" is clicked
function goToHome() {
  window.location.href = "home.html";
}

// Only run these if on home.html
if (window.location.pathname.includes("home.html")) {
  const coinList = [
    { name: "BTC/USDT", price: 27899.35, change: 0.00 },
    { name: "ETH/USDT", price: 1899.12, change: 0.00 },
    { name: "BNB/USDT", price: 305.28, change: 0.00 },
  ];

  function updatePrices() {
    const container = document.getElementById("coin-container");
    container.innerHTML = ""; // Clear old content

    coinList.forEach(coin => {
      const change = (Math.random() * 2 - 1).toFixed(2); // simulate -1% to +1%
      coin.change = parseFloat(change);
      coin.price = (coin.price * (1 + coin.change / 100)).toFixed(2);

      let bgColor = "#6c757d"; // gray default
      if (coin.change > 0) bgColor = "#16c784"; // green
      else if (coin.change < 0) bgColor = "#ea3943"; // red

      const coinDiv = document.createElement("div");
      coinDiv.className = "coin-row";
      coinDiv.innerHTML = `
        <div class="coin-name">${coin.name}</div>
        <div class="coin-price">$${coin.price}</div>
        <div class="coin-change" style="background-color:${bgColor};">${coin.change}%</div>
      `;
      container.appendChild(coinDiv);
    });
  }

  setInterval(updatePrices, 3000); // update every 3 seconds
  updatePrices(); // initial call
}

// Navbar icon color switcher
document.addEventListener("DOMContentLoaded", () => {
  const navIcons = document.querySelectorAll(".nav-icon");

  navIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      navIcons.forEach(i => i.classList.remove("active"));
      icon.classList.add("active");
    });
  });
});
