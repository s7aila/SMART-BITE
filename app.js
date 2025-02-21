// Function to get user input (using prompts)
function getUserInput() {
    let weight = parseFloat(prompt("Enter your weight (in kg):"));
    let height = parseFloat(prompt("Enter your height (in meters):"));

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert("Invalid input! Please enter valid numeric values greater than zero.");
        return null;
    }
    return [weight, height];
}

// Function to calculate BMI
function calculateBMI(weight, height) {
    return weight / (height ** 2);
}

// Function to categorize BMI
function getBMICategory(bmi) {
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 24.9) {
        return 'Normal weight';
    } else {
        return 'Overweight';
    }
}

// Function to estimate protein intake
function estimateProtein(foodData, proteinChart) {
    let totalProtein = 0;

    for (let food in foodData) {
        let quantity = foodData[food];
        if (proteinChart[food.toLowerCase()]) {
            totalProtein += proteinChart[food.toLowerCase()] * quantity;
        } else {
            let customProtein = parseFloat(prompt(`Protein content for '${food}' is unknown. Enter protein per serving (in grams):`));
            if (!isNaN(customProtein) && customProtein > 0) {
                totalProtein += customProtein * quantity;
            }
        }
    }
    return totalProtein;
}

// Function to recommend protein intake based on weight
function recommendedProtein(weight) {
    return weight * 0.8; // 0.8g per kg of body weight (general recommendation)
}

// Function to suggest foods to meet protein goals
function suggestFoods(deficit, proteinChart) {
    let suggestions = [];
    for (let food in proteinChart) {
        let servings = Math.ceil(deficit / proteinChart[food]);
        suggestions.push(`${servings} serving(s) of ${food}`);
    }
    return suggestions;
}

// Example Usage
let userInput = getUserInput();

if (userInput) {
    let [weight, height] = userInput;
    let bmi = calculateBMI(weight, height);
    alert(`Your BMI is ${bmi.toFixed(2)} (${getBMICategory(bmi)})`);

    // Sample food data and protein chart
    let foodData = { 'chicken': 2, 'rice': 1 };
    let proteinChart = { 'chicken': 25, 'rice': 2.5, 'eggs': 6, 'tofu': 10 };

    let totalProtein = estimateProtein(foodData, proteinChart);
    alert(`Total protein intake: ${totalProtein}g`);

    let recommended = recommendedProtein(weight);
    alert(`Recommended daily protein intake: ${recommended}g`);

    if (totalProtein < recommended) {
        let deficit = recommended - totalProtein;
        let suggestions = suggestFoods(deficit, proteinChart);
        alert(`You need ${deficit}g more protein. Consider adding:
- ${suggestions.join('\n- ')}`);
    } else {
        alert("You've met or exceeded your daily protein needs!");
    }
} else {
    alert("BMI calculation aborted due to invalid input.");
}

console.log("THANK YOU FOR USING OUR APPLICATION");
