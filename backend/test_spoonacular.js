const fetch = require('node-fetch');

async function run() {
    const apiKey = "674036ce5e864c3db9bc7765c6892dee";
    const baseUrl = "https://api.spoonacular.com";

    // Test 1: Search for a recipe
    console.log("=== Testing Spoonacular Search ===");
    const searchUrl = `${baseUrl}/recipes/complexSearch?query=pasta&number=1&addRecipeInformation=true&fillIngredients=true&apiKey=${apiKey}`;

    const searchRes = await fetch(searchUrl);
    console.log("Search Status:", searchRes.status);

    if (searchRes.ok) {
        const searchData = await searchRes.json();
        console.log("Search Results:", searchData.totalResults);

        if (searchData.results && searchData.results.length > 0) {
            const recipe = searchData.results[0];
            console.log("\n=== Recipe Data ===");
            console.log("ID:", recipe.id);
            console.log("Title:", recipe.title);
            console.log("Has extendedIngredients:", !!recipe.extendedIngredients);

            if (recipe.extendedIngredients) {
                console.log("Ingredients count:", recipe.extendedIngredients.length);
                console.log("Sample ingredient:", JSON.stringify(recipe.extendedIngredients[0], null, 2));
            }

            // Test 2: Get detailed recipe info
            console.log("\n=== Testing Recipe Information ===");
            const infoUrl = `${baseUrl}/recipes/${recipe.id}/information?includeNutrition=false&apiKey=${apiKey}`;
            const infoRes = await fetch(infoUrl);

            if (infoRes.ok) {
                const infoData = await infoRes.json();
                console.log("✅ Has instructions:", !!infoData.instructions);
                console.log("✅ Has analyzedInstructions:", !!infoData.analyzedInstructions);

                if (infoData.analyzedInstructions && infoData.analyzedInstructions.length > 0) {
                    console.log("Steps count:", infoData.analyzedInstructions[0].steps.length);
                    console.log("Sample step:", JSON.stringify(infoData.analyzedInstructions[0].steps[0], null, 2));
                }
            }
        }
    }
}

run().catch(console.error);
