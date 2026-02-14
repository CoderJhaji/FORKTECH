const fetch = require("node-fetch");

const BASE_URL = "http://localhost:5001/api";

async function runFromStart() {
    // 1. Login/Register to get token
    let token;
    try {
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "test@example.com",
                password: "testpass123"
            })
        });

        const loginData = await loginRes.json();
        if (loginRes.ok && loginData.token) {
            token = loginData.token;
            console.log("Logged in successfully");
        } else {
            // Try register
            const regRes = await fetch(`${BASE_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: "Test User",
                    email: "test@example.com",
                    password: "testpass123"
                })
            });
            const regData = await regRes.json();
            if (regRes.ok) token = regData.token;
            else console.error("Login/Register failed", regData);
        }
    } catch (e) {
        console.error("Auth error", e);
        return;
    }

    if (!token) return;

    // 2. Generate Recipe
    console.log("Generating recipe...");
    try {
        const res = await fetch(`${BASE_URL}/recipe/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title: "Butter Chicken",
                dietaryConstraints: ["gluten-free"],
                allergies: ["peanuts"]
            })
        });

        const data = await res.json();
        console.log("Status:", res.status);
        if (res.ok) {
            console.log("Recipe:", data.recipe.title);
            console.log("Source:", data.recipe.id.startsWith("mock-") ? "MOCK DATA" : "REAL API");
        } else {
            console.error("Failed:", data);
        }
    } catch (e) {
        console.error("Generation error", e);
    }
}

runFromStart();
