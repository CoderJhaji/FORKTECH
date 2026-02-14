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

        if (!data.data || data.data.length === 0) {
            console.log("No recipes found.");
            return;
        }

        const firstRecipe = data.data[0];
        const objectId = firstRecipe._id || firstRecipe.id;
        const recipeId = firstRecipe.Recipe_id;

        console.log("Recipes Found:", data.data.length);
        console.log("_id (ObjectId):", objectId);
        console.log("Recipe_id (Int?):", recipeId);

        // Test with Recipe_id if it exists
        if (recipeId) {
            console.log(`\n--- Testing Search with Recipe_id: ${recipeId} ---`);
            const detailsUrl = `${baseUrl}/recipe2-api/search-recipe/${recipeId}`;
            const detailsRes = await fetch(detailsUrl, { headers: { "Authorization": `Bearer ${apiKey}` } });
            console.log("Details Status:", detailsRes.status);
            if (detailsRes.ok) {
                const d = await detailsRes.json();
                console.log("Details Keys:", Object.keys(d));
                if (d.recipe) console.log("Recipe Keys:", Object.keys(d.recipe));
            }

            console.log(`\n--- Testing Instructions with Recipe_id: ${recipeId} ---`);
            const instrUrl = `${baseUrl}/recipe2-api/instructions/${recipeId}`;
            const instrRes = await fetch(instrUrl, { headers: { "Authorization": `Bearer ${apiKey}` } });
            console.log("Instr Status:", instrRes.status);
            if (instrRes.ok) {
                const i = await instrRes.json();
                console.log("Instr Keys:", Object.keys(i));
            }
        }

        // Test with ObjectId just to be sure
        if (objectId) {
            console.log(`\n--- Testing Search with ObjectId: ${objectId} ---`);
            const detailsUrl2 = `${baseUrl}/recipe2-api/search-recipe/${objectId}`;
            const detailsRes2 = await fetch(detailsUrl2, { headers: { "Authorization": `Bearer ${apiKey}` } });
            console.log("Details (ObjectId) Status:", detailsRes2.status);
        }


    } catch (e) {
        console.error("Error:", e);
    }
}

run();
