'use strict'

const searchInput = document.getElementById('searchInput');
const detailsAreaSection = document.getElementById('detailsAreaSection');
const itemDetailsSection = document.getElementById('itemDetails');
const foodItems = document.getElementById('foodItems');
const emptyMessage = document.getElementById("emptyMessage");
const notFoundMessage = document.getElementById("notFoundMessage");
const mealDetailsInfo = document.getElementById("mealDetailsInfo");

//                                       Close button Option
const closeDetailsButton = () => {

    detailsAreaSection.style.display = 'none';
};


const closeEmptyButton = () => {
    emptyMessage.style.display = 'none';
}
const closeNotFoundButton = () => {
    notFoundMessage.style.display = 'none';
}

//                                     Search Section
const searchBtnClicked = () => {
    const searchItem = searchInput.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`)
        .then((res) => res.json())
        .then((data) => {
            let listItem = '';
            if (searchItem === '') {
                emptyMessage.style.display = "block";
                itemDetailsSection.innerHTML = emptyMessage;

            } else if (data.meals) {
                data.meals.forEach((item) => {
                    listItem += `
                  <div onclick="itemDetails('${item.strMeal}')" class="food-item rounded shadow"> 
                   <img class="rounded-top"  src="${item.strMealThumb}" />
                  <h4>${item.strMeal}</h4>
          </div>`;
                });
                foodItems.innerHTML = listItem;

                detailsAreaSection.style.display = 'none';

            } else {

                notFoundMessage.style.display = "block";
                itemDetailsSection.innerHTML = notFoundMessage;
            }

        })
        .catch(error => alert("Error INTERNET DISCONNECTED!"));
    searchInput.value = '';
};

//                                       Food Item Details
const itemDetails = (itemName) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${itemName}`)
        .then((res) => res.json())
        .then((data) => {

            const mealsItem = data.meals[0];

            itemDetailsSection.innerHTML = `
       <div id="mealDetailsInfo">
       <div class="row">
       <div class="col-6">
       <div class="details-img ">
        
       <img id="details-img" 
         src="${mealsItem.strMealThumb}"
         alt="${mealsItem.strMeal}"
       />
     </div>
     </div>
     <div class="col-6">
     <h2 >${mealsItem.strMeal}</h2>
     <h4>Ingredients</h4>

     <div>
       <p><i class="font-color fas fa-check"></i>${mealsItem.strMeasure1} ${mealsItem.strIngredient1}</p>
       <p><i class="font-color fas fa-check"></i>${mealsItem.strMeasure2} ${mealsItem.strIngredient2}</p>
       <p><i class="font-color fas fa-check"></i>${mealsItem.strMeasure3} ${mealsItem.strIngredient3}</p>
       <p><i class="font-color fas fa-check"></i>${mealsItem.strMeasure4} ${mealsItem.strIngredient4}</p>
       <p><i class="font-color fas fa-check"></i>${mealsItem.strMeasure5} ${mealsItem.strIngredient5}</p>
       <p><i class="font-color fas fa-check"></i>${mealsItem.strMeasure6} ${mealsItem.strIngredient6}</p>
       <p><i class="font-color fas fa-check"></i>${mealsItem.strMeasure7} ${mealsItem.strIngredient7}</p>
       <p><i class="font-color fas fa-check"></i>${mealsItem.strMeasure8} ${mealsItem.strIngredient8}</p>
       <p><i class="font-color fas fa-check"></i>${mealsItem.strMeasure9} ${mealsItem.strIngredient9}</p>
       <p><i class="font-color fas fa-check"></i>${mealsItem.strMeasure10} ${mealsItem.strIngredient10}</p>
     </div>
     <button onclick="closeDetailsButton()" class="closeBtnIcon"><i class="fas fa-times"></i></button>
     </div>
       </div>
       </div>
      `;

            detailsAreaSection.style.display = 'block';
        });
};
