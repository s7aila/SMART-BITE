// Food data storage
let foodData = {};
let proteinChart = { 'chicken': 25, 'rice': 2.5, 'eggs': 6, 'tofu': 10 };

// Function to add food dynamically
function addFood() {
    let food = document.getElementById("foodInput").value.toLowerCase();
    let quantity = parseFloat(document.getElementById("quantityInput").value);

    if (!food || isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid food name and quantity.");
        return;
    }

    // Check if the food exists in the chart or ask user for protein amount
    if (!proteinChart[food]) {
        let customProtein = parseFloat(prompt(`Protein content for '${food}' is unknown. Enter protein per serving (in grams):`));
        if (!isNaN(customProtein) && customProtein > 0) {
            proteinChart[food] = customProtein;
        } else {
            alert("Invalid protein amount entered.");
            return;
        }
    }

    // Store food data
    foodData[food] = (foodData[food] || 0) + quantity;

    // Update UI
    updateFoodList();
}

// Function to update food list display
function updateFoodList() {
    let foodList = document.getElementById("foodList");
    foodList.innerHTML = "";
    for (let food in foodData) {
        foodList.innerHTML += `<li>${food}: ${foodData[food]} serving(s)</li>`;
    }
}

// Function to calculate and display protein intake
function calculateProtein() {
    let totalProtein = 0;
    for (let food in foodData) {
        totalProtein += proteinChart[food] * foodData[food];
    }

    let recommended = recommendedProtein(parseFloat(document.getElementById("weightInput").value));

    document.getElementById("result").innerHTML = `
        <p>Total Protein: ${totalProtein}g</p>
        <p>Recommended Intake: ${recommended}g</p>
        <p>${totalProtein < recommended ? `You need ${recommended - totalProtein}g more protein.` : "You have met your daily protein needs!"}</p>
    `;
}

// Function to recommend protein intake
function recommendedProtein(weight) {
    return weight * 0.8; // 0.8g per kg of body weight
}
