const coinIds = {
  BNB: 'binancecoin',
  BTC: 'bitcoin',
  ETH: 'ethereum',
  PEPE: 'pepe',
  SOL: 'solana',
  XRP: 'ripple',
};

const coins = Object.keys(coinIds);

async function fetchPrices() {
  const ids = Object.values(coinIds).join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const updated = coins.map(symbol => {
      const coinData = data[coinIds[symbol]];
      return {
        name: symbol,
        price: coinData.usd,
        change: coinData.usd_24h_change,
      };
    });

    updateCoinList(updated);
  } catch (error) {
    console.error('Failed to fetch prices:', error);
  }
}

function updateCoinList(prices) {
  const list = document.getElementById("coin-list");
  list.innerHTML = "";

  prices.forEach(coin => {
    const row = document.createElement("div");
    row.className = "coin-row";

    const name = document.createElement("div");
    name.className = "coin-name";
    name.textContent = coin.name;

    const pricesDiv = document.createElement("div");
    pricesDiv.className = "coin-price";
    pricesDiv.innerHTML = `
      <div class="primary">${coin.price.toLocaleString(undefined, {maximumFractionDigits: 8})}</div>
      <div class="secondary">$${coin.price.toFixed(2)}</div>
    `;

    const change = document.createElement("div");
    change.className = "coin-change";
    change.textContent = `${coin.change.toFixed(2)}%`;

    if (coin.change > 0) {
      change.style.backgroundColor = "#16c784"; // green
    } else if (coin.change < 0) {
      change.style.backgroundColor = "#ea3943"; // red
    } else {
      change.style.backgroundColor = "#666"; // gray
    }

    row.append(name, pricesDiv, change);
    list.appendChild(row);
  });
}

window.onload = () => {
  fetchPrices();
  setInterval(fetchPrices, 15000); // update every 15 seconds
};
