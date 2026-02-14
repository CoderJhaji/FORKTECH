const fetch = require('node-fetch');

async function run() {
    // Use the verified URL from .env (https://api.foodoscope.com)
    const baseUrl = "https://api.foodoscope.com";
    const endpoint = "/recipe2-api/recipe-bytitle/recipeByTitle";
    const title = "Butter Chicken"; // Test with a known recipe
    const apiKey = "MEDVJoZ2hipmD2EH908Qn-iWtHRNTz8rYXB6XIlWDBrP5umX";

    const url = `${baseUrl}${endpoint}?title=${encodeURIComponent(title)}`;

    console.log("Testing URL:", url);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            }
        });

        console.log("Status:", response.status);
        const data = await response.json();
        console.log("Response Data:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Error:", e);
    }
}

run();
