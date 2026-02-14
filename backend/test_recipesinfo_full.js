const fetch = require('node-fetch');

async function run() {
    const baseUrl = "https://api.foodoscope.com";
    const apiKey = "MEDVJoZ2hipmD2EH908Qn-iWtHRNTz8rYXB6XIlWDBrP5umX";

    console.log("=== Testing Recipes Info Endpoint (Full Output) ===\n");

    const url = `${baseUrl}/recipe2-api/recipe/recipesinfo?page=1&limit=1`;

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
            console.log("\nFull Response:");
            console.log(JSON.stringify(data, null, 2));
        } else {
            console.log("Failed:", await res.text());
        }
    } catch (e) {
        console.error("Error:", e.message);
    }
}

run();
