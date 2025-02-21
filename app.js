// Food protein chart
const proteinChart = {
    "chicken": 25,
    "rice": 2.5,
    "eggs": 6,
    "tofu": 10
};

// Function to calculate BMI
function calculateBMI() {
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);
    
    if (!weight || !height) {
        document.getElementById("bmi-result").innerText = "Please enter valid weight and height.";
        return;
    }

    let bmi = weight / (height ** 2);
    let category = getBMICategory(bmi);
    document.getElementById("bmi-result").innerText = `Your BMI is ${bmi.toFixed(2)} (${category})`;
}

// Function to categorize BMI
function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 24.9) return 'Normal weight';
    return 'Overweight';
}

// Function to add food and calculate protein
let foodData = {};

function addFood() {
    let food = document.getElementById("food").value.toLowerCase();
    let quantity = parseFloat(document.getElementById("quantity").value);
    
    if (!food || !quantity) {
        alert("Please enter a valid food and quantity.");
        return;
    }

    if (!proteinChart[food]) {
        let customProtein = parseFloat(prompt(`Unknown food: ${food}. Enter protein per serving:`));
        if (isNaN(customProtein)) return;
        proteinChart[food] = customProtein;
    }

    foodData[food] = (foodData[food] || 0) + quantity;

    updateProteinIntake();
    displayFoodList();
}

// Function to update protein intake display
function updateProteinIntake() {
    let totalProtein = Object.entries(foodData).reduce((sum, [food, quantity]) => {
        return sum + (proteinChart[food] * quantity);
    }, 0);

    document.getElementById("protein-result").innerText = `Total Protein: ${totalProtein}g`;
}

// Function to display food list
function displayFoodList() {
    let list = document.getElementById("food-list");
    list.innerHTML = "";
    for (let food in foodData) {
        let li = document.createElement("li");
        li.innerText = `${food}: ${foodData[food]} serving(s)`;
        list.appendChild(li);
    }
}
