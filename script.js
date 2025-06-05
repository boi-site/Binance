// ======== Live Clock at Top ========
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    document.getElementById("clock").innerText = `${hours}:${minutes}`;
}
setInterval(updateClock, 1000);
updateClock();

// ======== Simulate Token Price Changes ========
function simulatePriceChanges() {
    const rows = document.querySelectorAll(".token-row");
    rows.forEach(row => {
        const changeCell = row.querySelector(".change");
        const box = row.querySelector(".change-box");
        const random = (Math.random() * 4 - 2).toFixed(2); // -2% to +2%
        const isPositive = random > 0;
        const isZero = random == 0;

        changeCell.innerText = (isZero ? "0.00%" : `${isPositive ? "+" : ""}${random}%`);
        box.style.backgroundColor = isZero ? "#6c757d" : (isPositive ? "#28a745" : "#dc3545");
    });
}
setInterval(simulatePriceChanges, 4000);
simulatePriceChanges();

// ======== Dummy Tab Switching (Crypto / Futures) ========
document.querySelectorAll(".sub-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".sub-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
    });
});

// ======== Dummy View More Button ========
document.getElementById("viewMore").addEventListener("click", () => {
    alert("View More clicked (dummy)");
});

// ======== Dummy Bottom Nav Highlight ========
const navItems = document.querySelectorAll(".bottom-nav-item");
navItems.forEach(item => {
    item.addEventListener("click", () => {
        navItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
    });
});
