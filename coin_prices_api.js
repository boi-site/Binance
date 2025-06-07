const coins = ["bnb", "btc", "eth", "pepe", "sol", "xrp"];

async function fetchPrices() {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,bitcoin,ethereum,pepe,solana,ripple&vs_currencies=usd&include_24hr_change=true");
    const data = await response.json();

    return [
      {
        name: "BNB",
        price: data.binancecoin.usd,
        change: data.binancecoin.usd_24h_change,
      },
      {
        name: "BTC",
        price: data.bitcoin.usd,
        change: data.bitcoin.usd_24h_change,
      },
      {
        name: "ETH",
        price: data.ethereum.usd,
        change: data.ethereum.usd_24h_change,
      },
      {
        name: "PEPE",
        price: data.pepe.usd,
        change: data.pepe.usd_24h_change,
      },
      {
        name: "SOL",
        price: data.solana.usd,
        change: data.solana.usd_24h_change,
      },
      {
        name: "XRP",
        price: data.ripple.usd,
        change: data.ripple.usd_24h_change,
      }
    ];
  } catch (e) {
    console.error("Failed to fetch prices:", e);
    return [];
  }
}

async function loadCoinPrices() {
  const list = document.getElementById("coin-list");
  const coinData = await fetchPrices();

  coinData.forEach(coin => {
    const existing = document.querySelector(`[data-coin='${coin.name}']`);

    if (existing) {
      // Update existing coin row
      existing.querySelector(".primary").textContent = coin.price.toLocaleString();
      existing.querySelector(".secondary").textContent = `$${coin.price.toFixed(2)}`;
      const changeBox = existing.querySelector(".coin-change");
      changeBox.textContent = `${coin.change.toFixed(2)}%`;

      // Update color
      if (coin.change > 0) {
        changeBox.style.backgroundColor = "#16c784";
      } else if (coin.change < 0) {
        changeBox.style.backgroundColor = "#ea3943";
      } else {
        changeBox.style.backgroundColor = "#848e9c";
      }

    } else {
      // Create new coin row
      const row = document.createElement("div");
      row.className = "coin-row";
      row.setAttribute("data-coin", coin.name);

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

      // Set color
      if (coin.change > 0) {
        change.style.backgroundColor = "#16c784";
      } else if (coin.change < 0) {
        change.style.backgroundColor = "#ea3943";
      } else {
        change.style.backgroundColor = "#848e9c";
      }

      row.append(name, prices, change);
      list.appendChild(row);
    }
  });
}

window.onload = () => {
  loadCoinPrices();
  setInterval(loadCoinPrices, 5000); // update every 5 seconds
};
