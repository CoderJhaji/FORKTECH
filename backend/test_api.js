const fetch = require("node-fetch");

async function test() {
  console.log("Testing recipe API (no auth)...");

  const res = await fetch("http://localhost:5001/api/recipe/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      dishName: "Butter Chicken",
    }),
  });

  const data = await res.json();

  console.log("HTTP Status:", res.status);
  console.log("Response:", JSON.stringify(data, null, 2));

  if (res.ok && data.recipe) {
    console.log("✅ Recipe title:", data.recipe.title);
    console.log("✅ Ingredients:", data.recipe.ingredients.length);
  } else {
    console.log("❌ API failed");
  }
}

test().catch(console.error);
