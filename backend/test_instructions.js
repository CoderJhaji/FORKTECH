const fetch = require('node-fetch');

async function run() {
    const baseUrl = "https://api.foodoscope.com";
    const apiKey = "MEDVJoZ2hipmD2EH908Qn-iWtHRNTz8rYXB6XIlWDBrP5umX";

    // First get a recipe to get its ID
    console.log("=== Step 1: Get Recipe ===");
    const recipesUrl = `${baseUrl}/recipe2-api/recipe/recipesinfo?page=1&limit=1`;
    const recipesRes = await fetch(recipesUrl, {
        headers: { "Authorization": `Bearer ${apiKey}` }
    });
    const recipesData = await recipesRes.json();
    const recipe = recipesData.payload.data[0];
    const recipeId = recipe.Recipe_id;

    console.log("Recipe ID:", recipeId);
    console.log("Recipe Title:", recipe.Recipe_title);

    // Test instructions endpoint
    console.log("\n=== Step 2: Get Instructions ===");
    const instrUrl = `${baseUrl}/recipe2-api/instructions/${recipeId}`;
    console.log("URL:", instrUrl);

    const instrRes = await fetch(instrUrl, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        }
    });

    console.log("Status:", instrRes.status);
    if (instrRes.ok) {
        const instrData = await instrRes.json();
        console.log("Response keys:", Object.keys(instrData));
        console.log("Full response:", JSON.stringify(instrData, null, 2));
    } else {
        console.log("Failed:", await instrRes.text());
    }
}

run().catch(console.error);
