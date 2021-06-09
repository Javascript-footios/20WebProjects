const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

// Search meal and fetch from api
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = "";

  // Get search term
  const term = search.value;
  console.log(term);
  // Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for "${term}": </h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no results. Try again!</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
          <a href="#single-meal">
            <figure class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </figure>
          </a>  
          `
            )
            .join("");
        }
      });
    // Clear search
    search.value = "";
  } else {
    alert("Please enter a search term!");
  }
}

// Fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// Fetch random meal
function getRandomMeal() {
  // Clear meals and headings
  meals.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// Add Meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i < 20; i++) {
    // console.log("ing==", `meal.ingredient${i}`);
    // console.log("ing==", meal[`strIngredient${i}`]);
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  // console.log(ingredients);
  single_mealEl.innerHTML = `
  <article class="single-meal" >
    <section>
      <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info">
        ${meal.strArea ? `<p> ${meal.strArea}</p>` : ""}
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        </div>
    </section>
        <article class="ingredients-container">
          <p>${meal.strInstructions}</p>
          <h2>Ingredients</h2>
          <section>
            <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
            </ul>
          <section>
      </article>
      <footer>
        <a class="backToTop" href="#meal-finder">Back to top</a>
      </footer>
  </article>
  `;
}

// Event listeners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});
