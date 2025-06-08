const coins = ["bnb", "bitcoin", "ethereum", "pepe", "solana", "ripple"];
const coinSymbols = {
  bnb: "BNB",
  bitcoin: "BTC",
  ethereum: "ETH",
  pepe: "PEPE",
  solana: "SOL",
  ripple: "XRP"
};

async function fetchPrices() {
  try {
    const response = await fetch("https://api.coincap.io/v2/assets");
    const { data } = await response.json();

    return data
      .filter(item => coins.includes(item.id))
      .map(item => ({
        name: coinSymbols[item.id],
        price: parseFloat(item.priceUsd),
        change: parseFloat(item.changePercent24Hr)
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

  if (coinData.length === 0) {
    coins.forEach(name => {
      const row = document.createElement("div");
      row.className = "coin-row";

      const coinName = document.createElement("div");
      coinName.className = "coin-name";
      coinName.textContent = coinSymbols[name];

      const prices = document.createElement("div");
      prices.className = "coin-price";
      prices.innerHTML = `
        <div class="primary">–</div>
        <div class="secondary">–</div>
      `;

      const change = document.createElement("div");
      change.className = "coin-change";
      change.textContent = "–";
      change.style.backgroundColor = "#848e9c";

      row.append(coinName, prices, change);
      list.appendChild(row);
    });
    return;
  }

  coinData.forEach(coin => {
    const row = document.createElement("div");
    row.className = "coin-row";

    const name = document.createElement("div");
    name.className = "coin-name";
    name.textContent = coin.name;

    const prices = document.createElement("div");
    prices.className = "coin-price";
    prices.innerHTML = `
      <div class="primary">${coin.price.toLocaleString(undefined, {
        maximumFractionDigits: 2
      })}</div>
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
  setInterval(loadCoinPrices, 10000); // update every 10 seconds
};
