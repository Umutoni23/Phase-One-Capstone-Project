document.addEventListener("DOMContentLoaded", () => {

  // ================= ADD TO FAVORITE =================
  const favoriteButtons = document.querySelectorAll(".book-card button");

  favoriteButtons.forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".book-card");
      const title = card.querySelector("h4").textContent;
      const author = card.querySelector("p").textContent.replace("Author: ", "");
      const imgSrc = card.querySelector("img").src;

      // Get current favorites
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      // Check if already saved
      const exists = favorites.some(book => book.title === title);
      if (!exists) {
        favorites.push({ title, author, imgSrc });
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }

      // Change button text
      button.textContent = "Saved!";
      button.disabled = true;
    });
  });

  // ================= DISPLAY FAVORITES PAGE =================
  const favoritesContainer = document.getElementById("favorites-container");

  if (favoritesContainer) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
      favoritesContainer.innerHTML = "<p>No favorite books yet.</p>";
      return;
    }

    favoritesContainer.innerHTML = "";

    favorites.forEach((book, index) => {
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book-card", "bg-white", "shadow", "rounded", "p-4", "mb-4");

      bookDiv.innerHTML = `
        <div class="h-64 overflow-hidden rounded mb-2">
          <img src="${book.imgSrc}" alt="${book.title}" class="w-full h-full object-cover">
        </div>
        <h4 class="font-bold">${book.title}</h4>
        <p class="text-sm text-gray-600">${book.author}</p>
      `;

      favoritesContainer.appendChild(bookDiv);
    });
  }

});