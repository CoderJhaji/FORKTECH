const fetch = require('node-fetch');

async function run() {
    const baseUrl = "https://api.foodoscope.com";
    const apiKey = "MEDVJoZ2hipmD2EH908Qn-iWtHRNTz8rYXB6XIlWDBrP5umX";

    // 1. Search for a recipe
    console.log("--- 1. Searching for 'Cake' ---");
    const searchUrl = `${baseUrl}/recipe2-api/recipe-bytitle/recipeByTitle?title=Cake`;

    try {
        const res = await fetch(searchUrl, {
            headers: { "Authorization": `Bearer ${apiKey}` }
        });
        const data = await res.json();

        if (!data.data || data.data.length === 0) {
            console.log("No recipes found.");
            return;
        }

        const firstRecipe = data.data[0];
        const recipeId = firstRecipe.recipe_id || firstRecipe._id || firstRecipe.id;
        console.log("Recipes Found:", data.data.length);
        console.log("First Recipe ID:", recipeId);
        console.log("First Recipe Keys:", Object.keys(firstRecipe));

        if (firstRecipe.ingredients) {
            console.log("Ingredients Type:", typeof firstRecipe.ingredients);
            console.log("Ingredients Sample:", JSON.stringify(firstRecipe.ingredients.slice(0, 2)));
        } else {
            console.log("No 'ingredients' key in search result.");
        }

        // 2. Fetch Details by ID
        if (recipeId) {
            console.log(`\n--- 2. Fetching Details for ID: ${recipeId} ---`);
            const detailsUrl = `${baseUrl}/recipe2-api/search-recipe/${recipeId}`;
            console.log("URL:", detailsUrl);

            const detailsRes = await fetch(detailsUrl, {
                headers: { "Authorization": `Bearer ${apiKey}` }
            });

            console.log("Status:", detailsRes.status);
            if (detailsRes.ok) {
                const detailsData = await detailsRes.json();
                // Check if detailsData is the recipe object or wrapped
                const exactRecipe = detailsData.recipe || detailsData;
                console.log("Details Data Keys:", Object.keys(detailsData));

                if (exactRecipe.ingredients) {
                    console.log("Ingredients in Details:", JSON.stringify(exactRecipe.ingredients.slice(0, 2)));
                } else {
                    console.log("No Ingredients in details.");
                }

                if (exactRecipe.instructions) {
                    console.log("Instructions in Details:", JSON.stringify(exactRecipe.instructions.slice(0, 1)));
                } else if (exactRecipe.steps) {
                    console.log("Steps in Details:", JSON.stringify(exactRecipe.steps.slice(0, 1)));
                } else {
                    console.log("No Instructions/Steps in details.");
                }

                // 3. Try instructions endpoint again just in case
                console.log(`\n--- 3. Fetching Instructions Endpoint for ID: ${recipeId} ---`);
                const instrUrl = `${baseUrl}/recipe2-api/instructions/${recipeId}`;
                const instrRes = await fetch(instrUrl, { headers: { "Authorization": `Bearer ${apiKey}` } });
                console.log("Instr Status:", instrRes.status);
                if (instrRes.ok) {
                    const iData = await instrRes.json();
                    console.log("Instructions Data keys:", Object.keys(iData));
                }
            } else {
                console.log("Failed to fetch details.");
            }
        }

    } catch (e) {
        console.error("Error:", e);
    }
}

run();
