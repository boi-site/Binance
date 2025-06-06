const targetSymbols = ['BNBUSDT', 'BTCUSDT', 'ETHUSDT', 'PEPEUSDT', 'SOLUSDT', 'XRPUSDT'];

async function fetchRealTimePrices() {
  try {
    const res = await fetch('https://api.binance.com/api/v3/ticker/24hr');
    const data = await res.json();

    const filtered = data.filter(item => targetSymbols.includes(item.symbol)).map(item => {
      return {
        name: item.symbol.replace('USDT', ''),
        price: parseFloat(item.lastPrice),
        change: parseFloat(item.priceChangePercent)
      };
    });

    updateUI(filtered);
  } catch (err) {
    console.error("Failed to load Binance API:", err);
  }
}

function updateUI(coins) {
  const list = document.getElementById("coin-list");
  list.innerHTML = "";

  coins.forEach(coin => {
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

    if (coin.change > 0) {
      change.style.backgroundColor = "#16c784";
    } else if (coin.change < 0) {
      change.style.backgroundColor = "#ea3943";
    } else {
      change.style.backgroundColor = "#666";
    }

    row.append(name, prices, change);
    list.appendChild(row);
  });
}

// Load once and refresh every 10 seconds
fetchRealTimePrices();
setInterval(fetchRealTimePrices, 10000);
