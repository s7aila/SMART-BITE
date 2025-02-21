const proteinChart = {
    // Healthy Proteins
    'chicken': 25, 'rice': 2.5, 'eggs': 6, 'tofu': 10, 'cheese': 7, 
    'milk': 3.4, 'beef': 26, 'fish': 20, 'lentils': 9, 'yogurt': 5, 
    'almonds': 21, 'peanuts': 26, 'chickpeas': 19, 

    // Unhealthy & Processed Foods
    'burger': 12, 'pizza': 11, 'hot dog': 8, 'fried chicken': 18, 
    'bacon': 37, 'sausage': 14, 'ice cream': 3, 'chocolate': 5, 
    'cheetos': 6, 'doritos': 5, 'pringles': 4, 'fries': 3, 

    // Traditional Foods
    'naan': 9, 'samosa': 4, 'falafel': 13, 'hummus': 8, 'curry': 10, 
    'sushi': 7, 'dumplings': 6, 'pasta': 6, 'tortilla': 8, 

    // Noodles & Instant Food
    'instant noodles': 5, 'ramen': 7, 'spaghetti': 8, 'mac and cheese': 9,

    // Drinks & Liquids
    'coke': 0, 'orange juice': 1, 'milkshake': 4, 'protein shake': 20, 
    'smoothie': 5, 'coffee': 1, 'tea': 0, 'energy drink': 2
};

let totalProtein = 0;

function calculateBMI() {
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);

    if (isNaN(weight) || isNaN(height) || height <= 0) {
        document.getElementById("bmiResult").innerText = "Please enter valid numbers!";
        return;
    }

    let bmi = weight / (height ** 2);
    let category = bmi < 18.5 ? "Underweight" : bmi < 24.9 ? "Normal weight" : "Overweight";

    document.getElementById("bmiResult").innerText = `Your BMI is ${bmi.toFixed(2)} (${category})`;
}

function addFood() {
    let food = document.getElementById("food").value.trim().toLowerCase();
    let quantity = parseFloat(document.getElementById("quantity").value);

    if (!food || isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid food name and quantity.");
        return;
    }

    let protein = proteinChart[food] ? proteinChart[food] * quantity : 0;

    if (!proteinChart[food]) {
        protein = parseFloat(prompt(`Protein content for '${food}' is unknown. Enter protein per serving (in grams):`));
        if (isNaN(protein)) {
            alert("Invalid protein input.");
            return;
        }
        protein *= quantity;
    }

    totalProtein += protein;

    let foodList = document.getElementById("foodList");
    let listItem = document.createElement("li");
    listItem.innerText = `${food}: ${quantity} serving(s)`;
    foodList.appendChild(listItem);

    document.getElementById("totalProtein").innerText = `Total Protein: ${totalProtein.toFixed(2)}g`;
}
