document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const bookCards = document.querySelectorAll(".book-card");

  function filterBooks() {
    const searchValue = searchInput.value.toLowerCase().trim();

    bookCards.forEach(card => {
      const title = card.querySelector("h4").textContent.toLowerCase();

      if (title.includes(searchValue)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
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