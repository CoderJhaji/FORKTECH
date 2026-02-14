const fetch = require('node-fetch');

async function run() {
    const url = "http://localhost:5001/api/recipe/generate";
    console.log("Testing POST", url);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: "Cake" })
        });

        console.log("Status:", response.status);
        const data = await response.json();

        if (data.recipe) {
            console.log("Recipe Title:", data.recipe.title);
            console.log("Recipe ID:", data.recipe.id);
            console.log("Ingredients Count:", data.recipe.ingredients ? data.recipe.ingredients.length : 0);
            if (data.recipe.ingredients && data.recipe.ingredients.length > 0) {
                console.log("Sample Ingredient:", JSON.stringify(data.recipe.ingredients[0]));
            }
            console.log("Steps Count:", data.recipe.steps ? data.recipe.steps.length : 0);
            if (data.recipe.steps && data.recipe.steps.length > 0) {
                console.log("Sample Step:", JSON.stringify(data.recipe.steps[0]));
            }
        } else {
            console.log("No recipe in response:", JSON.stringify(data, null, 2));
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

run();
