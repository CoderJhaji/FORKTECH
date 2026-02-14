const fetch = require('node-fetch');

async function run() {
    const baseUrl = "https://api.foodoscope.com";
    const apiKey = "MEDVJoZ2hipmD2EH908Qn-iWtHRNTz8rYXB6XIlWDBrP5umX";

    const url = `${baseUrl}/recipe2-api/recipe/recipesinfo?page=1&limit=1`;

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (res.ok) {
            const data = await res.json();

            // Check structure
            console.log("Response keys:", Object.keys(data));
            console.log("Has payload:", !!data.payload);

            if (data.payload) {
                console.log("Payload keys:", Object.keys(data.payload));
                console.log("Has data:", !!data.payload.data);

                if (data.payload.data && data.payload.data.length > 0) {
                    const recipe = data.payload.data[0];
                    console.log("\n=== First Recipe ===");
                    console.log("Recipe keys:", Object.keys(recipe));
                    console.log("Title:", recipe.Recipe_title);
                    console.log("Has ingredients:", !!recipe.ingredients);
                    console.log("Has instructions:", !!recipe.instructions);
                    console.log("Has steps:", !!recipe.steps);

                    if (recipe.ingredients) {
                        console.log("\nIngredients count:", recipe.ingredients.length);
                        console.log("First ingredient:", JSON.stringify(recipe.ingredients[0]));
                    }

                    if (recipe.instructions) {
                        console.log("\nInstructions count:", recipe.instructions.length);
                        console.log("First instruction:", JSON.stringify(recipe.instructions[0]));
                    }

                    if (recipe.steps) {
                        console.log("\nSteps count:", recipe.steps.length);
                        console.log("First step:", JSON.stringify(recipe.steps[0]));
                    }
                }
            }
        }
    } catch (e) {
        console.error("Error:", e.message);
    }
}

run();
