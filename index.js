import {
    createRecipe,
    getRecipes,
    deleteRecipe,
    updateRecipe,
  } from "./modules/data.js";
  
  import { setupCountries } from "./modules/setup.js";
  
  setupCountries();

  document.getElementById('serves').addEventListener('input', function() {
  
});
 
  async function showRecipes() {
    const response = await getRecipes();
    console.table(response);
    const el = document.querySelector("template").content;
    const parent = document.querySelector(".recipes");
    parent.innerHTML = "";
    response.forEach((rec) => {
      const clone = el.cloneNode(true);
      clone.querySelector("[data-name]").textContent = rec.name;
      clone.querySelector("[data-origin]").textContent = rec.origin;
      clone.querySelector("[data-category]").textContent = rec.category;
      clone.querySelector("[data-ingredients]").textContent = rec.ingredients;
      clone.querySelector("[data-studentFriendly]").textContent = rec.studentFriendly;
      clone.querySelector("[data-serves]").textContent = rec.serves;
      
      if (rec.studentFriendly) {
        clone.querySelector(".friendly").hidden = false;
      } else {
        clone.querySelector(".friendly").hidden = true;
      }
  
      clone.querySelectorAll("[data-id]").forEach((e) => (e.dataset.id = rec.id));
      clone
        .querySelector("button[data-action='delete']")
        .addEventListener("click", async () => {
          await deleteRecipe(rec.id);
          await showRecipes();
        });
      clone
        .querySelector("button[data-action='update']")
        .addEventListener("click", async () => {
          await updateRecipe(rec.id, !rec.studentFriendly);
          await showRecipes();
        });
      parent.appendChild(clone);
    });
  }
  showRecipes();
  
  function handleSubmit() {
    const form = document.querySelector("form");
    form.addEventListener("submit", async (e) => {
      console.log(e);
    
      e.preventDefault();
      const formData = new FormData(form);
      console.log(formData.get("ingredients").split("\n"));
  
      await createRecipe({
        name: formData.get("name"),
        description: formData.get("description"),
        ingredients: formData.get("ingredients").split("\n"),
        serves: formData.get("serves"),
        allergens: formData.get("allergens").split("\n"),
        category: formData.get("category"),
        studentFriendly: formData.get("studentFriendly"),
        origin: formData.get("origin"),
      });
      showRecipes();
    });
  }
  handleSubmit();
  