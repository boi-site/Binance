// Icon toggle logic
function setActive(el) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  el.classList.add('active');
}

// Price update logic
const rows = document.querySelectorAll("#price-table-body tr");

setInterval(() => {
  rows.forEach(row => {
    const changeCell = row.querySelector(".change-box");
    const rand = (Math.random() * 10 - 5).toFixed(2); // -5.00 to +5.00
    const change = parseFloat(rand);

    changeCell.textContent = (change >= 0 ? "+" : "") + change + "%";

    if (change > 0) {
      changeCell.style.background = "#16c784"; // green
    } else if (change < 0) {
      changeCell.style.background = "#ea3943"; // red
    } else {
      changeCell.style.background = "gray"; // unchanged
    }
  });
}, 4000);
