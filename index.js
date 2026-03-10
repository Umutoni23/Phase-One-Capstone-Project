document.addEventListener("DOMContentLoaded", () => {

  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const grid = document.querySelector(".grid");

  searchBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    const query = searchInput.value.trim();

    if(query === ""){
      alert("Please type a book name");
      return;
    }

    grid.innerHTML = `
      <p class="col-span-full text-center text-gray-600">
        Searching books...
      </p>
    `;

    try {

      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);

      const data = await response.json();

      grid.innerHTML = "";

      if(!data.items){
        grid.innerHTML = `
          <p class="col-span-full text-center text-red-500">
            No books found
          </p>
        `;
        return;
      }

      data.items.forEach(book => {

        const title = book.volumeInfo.title || "No title";
        const author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Unknown Author";
        const image = book.volumeInfo.imageLinks ?
        book.volumeInfo.imageLinks.thumbnail :
        "https://via.placeholder.com/150";

        const bookCard = document.createElement("div");

        bookCard.className = "book-card bg-white shadow rounded p-4";

        bookCard.innerHTML = `
          <div class="h-64 overflow-hidden rounded">
            <img src="${image}" alt="${title}" class="w-full h-full object-cover">
          </div>
          <h4 class="font-bold">${title}</h4>
          <p class="text-sm text-gray-600">Author: ${author}</p>
          <button class="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500">
            Add to Favorite
          </button>
        `;

        grid.appendChild(bookCard);

      });

    } catch(error){

      grid.innerHTML = `
        <p class="col-span-full text-center text-red-600">
          Failed to load books. Please check your internet.
        </p>
      `;

      console.error("Error fetching books:", error);

    }

  });

});