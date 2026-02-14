const fetch = require('node-fetch');

async function run() {
    const baseUrl = "https://api.foodoscope.com";
    const apiKey = "MEDVJoZ2hipmD2EH908Qn-iWtHRNTz8rYXB6XIlWDBrP5umX";

    // Test 1: Get a recipe using the by-ingredients endpoint
    console.log("=== Step 1: Fetch recipe by title ===");
    const searchUrl = `${baseUrl}/recipe2-api/recipebyingredient/by-ingredients-categories-title?title=Cake&page=1&limit=1`;

    const res = await fetch(searchUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    });

    const data = await res.json();
    console.log("Status:", res.status);

    if (data.payload && data.payload.data && data.payload.data.length > 0) {
        const recipe = data.payload.data[0];
        console.log("Recipe ID:", recipe.Recipe_id);
        console.log("Recipe Title:", recipe.Recipe_title);
        console.log("Recipe Keys:", Object.keys(recipe));
        console.log("\nHas ingredients field:", !!recipe.ingredients);

        const recipeId = recipe.Recipe_id;

        // Test 2: Try to get ingredients for this recipe
        console.log("\n=== Step 2: Try to get ingredients ===");
        const possibleEndpoints = [
            `/recipe2-api/ingredients/${recipeId}`,
            `/recipe2-api/recipe/${recipeId}/ingredients`,
            `/recipe2-api/recipebyingredient/ingredients/${recipeId}`,
            `/recipe2-api/recipebyingredient/${recipeId}`
        ];

        for (const endpoint of possibleEndpoints) {
            const url = `${baseUrl}${endpoint}`;
            console.log(`\nTrying: ${endpoint}`);
            try {
                const r = await fetch(url, {
                    headers: { "Authorization": `Bearer ${apiKey}` }
                });
                console.log("Status:", r.status);
                if (r.ok) {
                    const d = await r.json();
                    console.log("✅ SUCCESS!");
                    console.log("Response:", JSON.stringify(d, null, 2));
                    break;
                }
            } catch (e) {
                console.log("Error:", e.message);
            }
        }
    }
}

run().catch(console.error);
