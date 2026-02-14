const fetch = require('node-fetch');

async function run() {
    const baseUrl = "https://api.foodoscope.com";
    const apiKey = "MEDVJoZ2hipmD2EH908Qn-iWtHRNTz8rYXB6XIlWDBrP5umX";

    // Use Recipe_id from your example: 2613
    const recipeId = 2613;

    console.log("=== Testing Instructions Endpoint ===");
    const instrUrl = `${baseUrl}/recipe2-api/instructions/${recipeId}`;
    console.log("URL:", instrUrl);

    try {
        const res = await fetch(instrUrl, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            }
        });

        console.log("Status:", res.status);
        if (res.ok) {
            const data = await res.json();
            console.log("\n✅ SUCCESS!");
            console.log("Response:", JSON.stringify(data, null, 2));
        } else {
            console.log("❌ Failed:", res.status, await res.text());
        }
    } catch (e) {
        console.error("Error:", e.message);
    }

    // Try to find ingredients endpoint
    console.log("\n=== Testing Possible Ingredients Endpoints ===");

    const possibleEndpoints = [
        `/recipe2-api/ingredients/${recipeId}`,
        `/recipe2-api/recipe/ingredients/${recipeId}`,
        `/recipe2-api/recipe/${recipeId}/ingredients`
    ];

    for (const endpoint of possibleEndpoints) {
        const url = `${baseUrl}${endpoint}`;
        console.log(`\nTrying: ${url}`);
        try {
            const res = await fetch(url, {
                headers: { "Authorization": `Bearer ${apiKey}` }
            });
            console.log("Status:", res.status);
            if (res.ok) {
                const data = await res.json();
                console.log("✅ FOUND IT!");
                console.log("Response:", JSON.stringify(data, null, 2));
                break;
            }
        } catch (e) {
            console.log("Error:", e.message);
        }
    }
}

run().catch(console.error);
