document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const bookCards = document.querySelectorAll(".book-card");

  function filterBooks() {
    const searchValue = searchInput.value.toLowerCase().trim();

    // Show a loading effect
    bookCards.forEach(card => card.style.opacity = 0.5);
    searchBtn.textContent = "Loading...";
    searchBtn.disabled = true;

    // Simulate 3-second delay
    setTimeout(() => {
      bookCards.forEach(card => {
        const title = card.querySelector("h4").textContent.toLowerCase();
        if (title.includes(searchValue)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
        card.style.opacity = 1; // reset opacity
      });

      // Reset button
      searchBtn.textContent = "Search";
      searchBtn.disabled = false;
    }, 3000); // 3000ms = 3 seconds
  }

  // When search button is clicked
  searchBtn.addEventListener("click", filterBooks);

  // When Enter key is pressed
  searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      filterBooks();
    }
  });

});
// Responsive Navbar Toggle
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('hidden'); // show/hide menu
});