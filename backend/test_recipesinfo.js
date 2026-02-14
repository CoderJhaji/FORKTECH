const fetch = require('node-fetch');

async function run() {
    const baseUrl = "https://api.foodoscope.com";
    const apiKey = "MEDVJoZ2hipmD2EH908Qn-iWtHRNTz8rYXB6XIlWDBrP5umX";

    console.log("=== Testing Recipes Info Endpoint ===\n");

    const url = `${baseUrl}/recipe2-api/recipe/recipesinfo?page=1&limit=2`;
    console.log("URL:", url);

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        console.log("Status:", res.status);

        if (res.ok) {
            const data = await res.json();
            console.log("\nResponse Keys:", Object.keys(data));

            if (data.data && data.data.length > 0) {
                const firstRecipe = data.data[0];
                console.log("\nFirst Recipe Keys:", Object.keys(firstRecipe));
                console.log("Recipe ID:", firstRecipe.Recipe_id || firstRecipe._id);
                console.log("Recipe Title:", firstRecipe.Recipe_title);

                console.log("\n✅ Has ingredients:", !!firstRecipe.ingredients);
                if (firstRecipe.ingredients) {
                    console.log("   Ingredients count:", firstRecipe.ingredients.length);
                    console.log("   Sample:", JSON.stringify(firstRecipe.ingredients.slice(0, 2), null, 2));
                }

                console.log("\n✅ Has instructions:", !!firstRecipe.instructions);
                if (firstRecipe.instructions) {
                    console.log("   Instructions count:", firstRecipe.instructions.length);
                    console.log("   Sample:", JSON.stringify(firstRecipe.instructions.slice(0, 2), null, 2));
                }

                console.log("\n✅ Has steps:", !!firstRecipe.steps);
                if (firstRecipe.steps) {
                    console.log("   Steps count:", firstRecipe.steps.length);
                }
            }
        } else {
            console.log("Failed:", await res.text());
        }
    } catch (e) {
        console.error("Error:", e.message);
    }
}

run();
