const fetch = require('node-fetch');

async function run() {
    const baseUrl = "https://api.foodoscope.com";
    const apiKey = "MEDVJoZ2hipmD2EH908Qn-iWtHRNTz8rYXB6XIlWDBrP5umX";
    const recipeId = 2613;

    const instrUrl = `${baseUrl}/recipe2-api/instructions/${recipeId}`;

    const res = await fetch(instrUrl, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        }
    });

    if (res.ok) {
        const data = await res.json();
        console.log(JSON.stringify(data, null, 2));
    }
}

run().catch(console.error);
