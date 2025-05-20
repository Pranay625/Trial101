// Sample recipes
const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    description: "Classic Roman pasta dish with eggs, cheese, pancetta, and pepper.",
    image: "https://source.unsplash.com/featured/?spaghetti",
    category: "Pasta",
  },
  {
    id: 2,
    title: "Margherita Pizza",
    description: "Tomato, mozzarella, fresh basil, salt, and olive oil.",
    image: "https://source.unsplash.com/featured/?pizza",
    category: "Pizza",
  },
  {
    id: 3,
    title: "Tiramisu",
    description: "Coffee-flavoured Italian dessert with mascarpone and cocoa.",
    image: "https://source.unsplash.com/featured/?tiramisu",
    category: "Dessert",
  },
  {
    id: 4,
    title: "Caprese Salad",
    description: "Fresh mozzarella, tomatoes, and basil with olive oil.",
    image: "https://source.unsplash.com/featured/?salad",
    category: "Salad",
  },
  {
    id: 5,
    title: "Pesto Pasta",
    description: "Fresh basil pesto tossed with pasta and parmesan.",
    image: "https://source.unsplash.com/featured/?pasta",
    category: "Pasta",
  },
  {
    id: 6,
    title: "Gelato",
    description: "Italian-style ice cream with creamy texture and rich flavor.",
    image: "https://source.unsplash.com/featured/?gelato",
    category: "Dessert",
  },
];

let favorites = new Set();
let darkMode = false;

const recipeGrid = document.getElementById("recipeGrid");
const searchInput = document.getElementById("searchInput");
const toggleDarkMode = document.getElementById("toggleDarkMode");
const toggleFavorites = document.getElementById("toggleFavorites");

// Render recipe cards
function renderRecipes(recipeList) {
  recipeGrid.innerHTML = "";

  if (recipeList.length === 0) {
    recipeGrid.innerHTML = `<p>No recipes found.</p>`;
    return;
  }

  recipeList.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <h2>${recipe.title}</h2>
      <p>${recipe.description}</p>
      <button class="fav-btn ${favorites.has(recipe.id) ? "active" : ""}" data-id="${recipe.id}">
        ❤️
      </button>
    `;

    recipeGrid.appendChild(card);
  });

  // Attach favorite toggle
  document.querySelectorAll(".fav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      if (favorites.has(id)) {
        favorites.delete(id);
        btn.classList.remove("active");
      } else {
        favorites.add(id);
        btn.classList.add("active");
      }
    });
  });
}

// Filter recipes by category
function filterByCategory(category) {
  if (category === "All") {
    renderRecipes(recipes);
  } else {
    const filtered = recipes.filter((r) => r.category === category);
    renderRecipes(filtered);
  }
}

// Filter favorites
toggleFavorites.addEventListener("click", () => {
  const favList = recipes.filter((r) => favorites.has(r.id));
  renderRecipes(favList);
});

// Dark mode toggle
toggleDarkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  darkMode = !darkMode;
});

// Search functionality
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = recipes.filter((r) =>
    r.title.toLowerCase().includes(query)
  );
  renderRecipes(filtered);
});

// Initial render
renderRecipes(recipes);

const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish.",
    ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan cheese", "Pepper"],
    instructions: "Cook spaghetti. Fry pancetta. Mix eggs and cheese. Combine all."
  },
  // add more recipes here with unique ids
];

const modal = document.getElementById("recipeModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalIngredients = document.getElementById("modalIngredients");
const modalInstructions = document.getElementById("modalInstructions");
const closeBtn = document.querySelector(".close-btn");

// Show modal with recipe info
function openModal(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  modalTitle.textContent = recipe.title;
  modalDescription.textContent = recipe.description;

  // Clear and add ingredients
  modalIngredients.innerHTML = "";
  recipe.ingredients.forEach(ing => {
    const li = document.createElement("li");
    li.textContent = ing;
    modalIngredients.appendChild(li);
  });

  modalInstructions.textContent = recipe.instructions;
  modal.style.display = "block";
}

// Close modal function
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Attach event listeners to buttons after DOM loads
document.querySelectorAll(".view-details-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const id = parseInt(e.target.closest(".recipe-card").dataset.id);
    openModal(id);
  });
});
