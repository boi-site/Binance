* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Inter', sans-serif;
  background: #131722;
  color: #fff;
  height: 100vh;
  overflow: hidden;
}
/* Top toggle */
.top-toggle {
  display: flex;
  border-bottom: 1px solid #272b3a;
}
.top-toggle button {
  flex: 1;
  padding: 1rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: #888;
}
.top-toggle button.active {
  color: #fff;
  border-bottom: 2px solid #f0b90b;
}

/* Main nav-tabs */
.nav-tabs {
  display: flex;
  padding-left: 1rem;
  border-bottom: 1px solid #272b3a;
}
.nav-tabs button {
  background: none;
  border: none;
  color: #888;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.75rem;
}
.nav-tabs button.active {
  color: #fff;
  border-bottom: 2px solid #fff;
}

/* Scrollable content */
.content {
  height: calc(100vh - 224px);
  overflow-y: auto;
}

/* Total value section */
.wallet-value {
  padding: 1rem;
}
.wallet-value p {
  font-size: 0.85rem;
  color: #888;
  display: flex;
  align-items: center;
}
.wallet-value .icon-sm {
  width: 16px;
  height: 16px;
  margin-left: 4px;
}
.wallet-value h1 {
  font-size: 2.4rem;
  font-weight: 600;
  margin: 0.4rem 0;
  display: flex;
  align-items: center;
}
.wallet-value .currency, .wallet-value .usd {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0 0.25rem;
}
.wallet-value .pnl-overall {
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  margin-top: 4px;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #272b3a;
}
.wallet-value .arrow {
  font-size: 1.2rem;
  margin-left: 0.3rem;
}
.wallet-value #overallPnl {
  color: #00c292;
  margin-left: 3px;
  font-weight: 500;
}

/* Buttons */
.actions {
  display: flex;
  gap: 0.75rem;
  padding: 0 1rem;
  margin-top: 1rem;
  border-bottom: 1px solid #272b3a;
}
.actions button {
  flex: 1;
  padding: 0.8rem;
  font-weight: 600;
  border-radius: 8px;
}
.add-funds { background: #f0b90b; color: #000; }
.send, .transfer { background: #1e2029; color: #fff; }

/* Crypto/account tabs */
.crypto-account-tabs {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #272b3a;
}
.crypto-account-tabs button {
  color: #888;
  background: none;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  margin-right: 1rem;
}
.crypto-account-tabs button.active { color: #fff; }
.crypto-account-tabs .icons {
  margin-left: auto;
  display: flex;
  gap: 1rem;
}
.icon-md {
  width: 20px;
  height: 20px;
}

/* Coin list */
.crypto-list {
  padding: 0 1rem 1rem;
}
.crypto {
  background: #1e2029;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
}
.crypto .info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.crypto img.icon {
  width: 28px;
  height: 28px;
}
.details {
  color: #888;
  font-size: 0.85rem;
}
.crypto-right {
  text-align: right;
}
.amount {
  font-size: 1.1rem;
  font-weight: 500;
}
.price {
  font-size: 0.85rem;
  color: #888;
  margin: 2px 0;
}
.stats {
  font-size: 0.85rem;
  color: #888;
  line-height: 1.3;
}

/* Bottom nav */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #131722;
  border-top: 1px solid #272b3a;
  display: flex;
  justify-content: space-around;
  padding: 0.75rem 0;
}
.bottom-nav div {
  font-size: 0.7rem;
  color: #888;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bottom-nav div.active { color: #f0b90b; }
.bottom-nav img {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

/* Utility */
.hidden { display: none; }
