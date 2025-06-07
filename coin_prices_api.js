const coins = ["bnb", "bitcoin", "ethereum", "pepe", "solana", "ripple"];

async function fetchPrices() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,bitcoin,ethereum,pepe,solana,ripple&vs_currencies=usd&include_24hr_change=true"
    );
    const data = await response.json();

    return coins.map(id => ({
      name: id.toUpperCase(),
      price: data[id].usd,
      change: data[id].usd_24h_change
    }));
  } catch (e) {
    console.error("Failed to fetch prices:", e);
    return [];
  }
}

async function loadCoinPrices() {
  const list = document.getElementById("coin-list");
  list.innerHTML = "";

  const coinData = await fetchPrices();

  coinData.forEach(coin => {
    const row = document.createElement("div");
    row.className = "coin-row";

    const name = document.createElement("div");
    name.className = "coin-name";
    name.textContent = coin.name;

    const prices = document.createElement("div");
    prices.className = "coin-price";
    prices.innerHTML = `
      <div class="primary">${coin.price.toLocaleString()}</div>
      <div class="secondary">$${coin.price.toFixed(2)}</div>
    `;

    const change = document.createElement("div");
    change.className = "coin-change";
    change.textContent = `${coin.change.toFixed(2)}%`;

    // Color logic
    if (coin.change > 0) {
      change.style.backgroundColor = "#16c784";
    } else if (coin.change < 0) {
      change.style.backgroundColor = "#ea3943";
    } else {
      change.style.backgroundColor = "#848e9c";
    }

    row.append(name, prices, change);
    list.appendChild(row);
  });
}

window.onload = () => {
  loadCoinPrices();
  setInterval(loadCoinPrices, 5000);
};
