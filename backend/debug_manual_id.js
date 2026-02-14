const fetch = require('node-fetch');

async function run() {
    const baseUrl = "https://api.foodoscope.com";
    const apiKey = "MEDVJoZ2hipmD2EH908Qn-iWtHRNTz8rYXB6XIlWDBrP5umX";
    const testId = 2611;
    const testId2 = 12345;

    console.log(`--- Testing Manual ID: ${testId} ---`);

    // 1. Details
    const detailsUrl = `${baseUrl}/recipe2-api/search-recipe/${testId}`;
    try {
        const res = await fetch(detailsUrl, { headers: { "Authorization": `Bearer ${apiKey}` } });
        console.log("Details Status:", res.status);
        if (res.ok) {
            const data = await res.json();
            console.log("Details Keys:", Object.keys(data));
            if (data.recipe) console.log("Recipe Keys:", Object.keys(data.recipe));
            else console.log("Root Keys:", Object.keys(data));
        } else {
            console.log("Details failed text:", await res.text());
        }
    } catch (e) { console.error(e); }

    // 2. Instructions
    const instrUrl = `${baseUrl}/recipe2-api/instructions/${testId}`;
    try {
        const res = await fetch(instrUrl, { headers: { "Authorization": `Bearer ${apiKey}` } });
        console.log("Instr Status:", res.status);
        if (res.ok) {
            const data = await res.json();
            console.log("Instr Data:", JSON.stringify(data));
        }
    } catch (e) { console.error(e); }
}

run();
