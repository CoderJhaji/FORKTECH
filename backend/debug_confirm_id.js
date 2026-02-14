const fetch = require('node-fetch');

async function run() {
    const baseUrl = "https://api.foodoscope.com";
    const apiKey = "MEDVJoZ2hipmD2EH908Qn-iWtHRNTz8rYXB6XIlWDBrP5umX";

    console.log("--- Searching for 'Cake' ---");
    const searchUrl = `${baseUrl}/recipe2-api/recipe-bytitle/recipeByTitle?title=Cake`;

    try {
        const res = await fetch(searchUrl, {
            headers: { "Authorization": `Bearer ${apiKey}` }
        });
        const data = await res.json();
        const firstRecipe = data.data[0];

        // Explicitly get Recipe_id
        const correctId = firstRecipe.Recipe_id;
        const wrongId = firstRecipe._id;

        console.log("Found Recipe_id:", correctId);
        console.log("Found _id:", wrongId);

        if (correctId) {
            console.log(`\n--- Testing Search with Recipe_id: ${correctId} ---`);
            const detailsUrl = `${baseUrl}/recipe2-api/search-recipe/${correctId}`;
            const detailsRes = await fetch(detailsUrl, { headers: { "Authorization": `Bearer ${apiKey}` } });
            console.log("Details Status:", detailsRes.status);
            if (detailsRes.ok) {
                const d = await detailsRes.json();
                console.log("Success! Keys:", Object.keys(d));
                if (d.recipe) {
                    console.log("Recipe has ingredients:", !!d.recipe.ingredients);
                    console.log("Recipe has instructions:", !!d.recipe.instructions);
                    console.log("Recipe has steps:", !!d.recipe.steps);
                }
            } else {
                console.log("Failed with Recipe_id");
            }
        }

    } catch (e) {
        console.error("Error:", e);
    }
}

run();
