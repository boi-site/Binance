const coins = ['usdt', 'btc', 'eth', 'bonk', 'xrp'];
const allocations = {
  USDT: 122034958.27,
  BTC: 162713277.70,
  ETH: 81356638.85,
  BONK: 20339159.71,
  XRP: 20339159.71
};

async function fetchPrices() {
  try {
    const response = await fetch("https://api.binance.com/api/v3/ticker/24hr");
    const data = await response.json();

    const filtered = data.filter(item =>
      coins.includes(item.symbol.replace("USDT", "").toLowerCase())
    );

    return filtered.map(item => {
      const name = item.symbol.replace("USDT", "");
      const price = parseFloat(item.lastPrice);
      const change = parseFloat(item.priceChangePercent);
      const value = allocations[name];
      const amount = value / price;

      return {
        name,
        price,
        change,
        value: value.toFixed(2),
        amount: amount.toFixed(8),
        icon: `icons/${name.toLowerCase()}.svg`
      };
    });
  } catch (error) {
    console.error("API failed. Loading dummy fallback data.", error);
    return [
      {
        name: "USDT",
        price: 1.03,
        change: 0.52,
        value: allocations["USDT"].toFixed(2),
        amount: (allocations["USDT"] / 1.03).toFixed(8),
        icon: "icons/usdt.svg"
      },
      {
        name: "BONK",
        price: 0.00001483,
        change: 1.99,
        value: allocations["BONK"].toFixed(2),
        amount: (allocations["BONK"] / 0.00001483).toFixed(8),
        icon: "icons/bonk.svg"
      },
      {
        name: "ETH",
        price: 0.14025567,
        change: 2.54,
        value: allocations["ETH"].toFixed(2),
        amount: (allocations["ETH"] / 0.14025567).toFixed(8),
        icon: "icons/eth.svg"
      },
      {
        name: "BTC",
        price: 68473.24,
        change: 3.12,
        value: allocations["BTC"].toFixed(2),
        amount: (allocations["BTC"] / 68473.24).toFixed(8),
        icon: "icons/btc.svg"
      },
      {
        name: "XRP",
        price: 0.52,
        change: 0.85,
        value: allocations["XRP"].toFixed(2),
        amount: (allocations["XRP"] / 0.52).toFixed(8),
        icon: "icons/xrp.svg"
      }
    ];
  }
}

async function loadAssets() {
  const list = document.getElementById("asset-list");
  list.innerHTML = "";

  const coins = await fetchPrices();

  coins.forEach(coin => {
    const row = document.createElement("div");
    row.className = "asset-row";

    row.innerHTML = `
      <div class="asset-left">
        <img src="${coin.icon}" alt="${coin.name}" class="asset-icon-img" />
        <div class="asset-info">
          <div class="asset-name">${coin.name}</div>
          <div class="asset-sub">$${coin.price.toFixed(5)}</div>
          <div class="asset-sub">Today’s PNL: $0.00 (${coin.change.toFixed(2)}%)</div>
          ${coin.name === "ETH" ? `<div class="asset-sub">Average cost: $2,642.77</div>` : ""}
        </div>
      </div>
      <div class="asset-right">
        <div class="asset-amount">${coin.amount}</div>
        <div class="asset-usd">$${coin.value}</div>
      </div>
    `;
    list.appendChild(row);
  });
}

loadAssets();
