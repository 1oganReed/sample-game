// Screens
const screenHome = document.getElementById("screenHome");
const screenLobby = document.getElementById("screenLobby");
const screenKitchen = document.getElementById("screenKitchen");

// HUD text elements — the ones JS will update
const moneyDisplay = document.getElementById("moneyDisplay");
const customersDisplay = document.getElementById("customersDisplay");
const customerNameDisplay = document.getElementById("customerNameDisplay");
const orderDisplay = document.getElementById("orderDisplay");

// Customer area elements
const customerArea = document.getElementById("customerArea");
const speechText = document.getElementById("speechText");
const customerImg = document.getElementById("customerImg");

// Buttons
const startBtn = document.getElementById("startBtn");
// const howToBtn = document.getElementById("howToBtn");
const takeOrderBtn = document.getElementById("takeOrderBtn");
const goKitchenBtn = document.getElementById("goKitchenBtn");








const customers = [
  {
    name: "John",
    greeting: "Hi! Can I get a cheeseburger?",
    order: "Cheeseburger",
    reward: 5,
    img: "images/customer-john.png",
  },
  {
    name: "Bob",
    greeting: "Hey, one classic burger please!",
    order: "Classic Burger",
    reward: 7,
    img: "images/customer-bob.png",
  },
  {
    name: "Jane",
    greeting: "Just a hamburger",
    order: "Hamburger",
    reward: 4,
    img: "images/customer-jane.png",
  },
];

// Game state
let currentCustomer = null;
let money = 0;
let customersServed = 0;








function showScreen(screen) {
    // Hide all screens
    screenHome.classList.remove("active");
    screenLobby.classList.remove("active");
    screenKitchen.classList.remove("active");
    // Show the requested screen
    screen.classList.add("active");
}

// Initialize event listeners
function initializeGame() {
    startBtn.addEventListener("click", goToLobby);
    document.getElementById("howToBtn").addEventListener("click", showHowToPlay);
    takeOrderBtn.addEventListener("click", takeOrder);
    goKitchenBtn.addEventListener("click", goToKitchen);
}

// Switch to lobby screen
function goToLobby() {
    showScreen(screenLobby);
    setupLobby();
}

// Setup lobby with character and button
function setupLobby() {
    // Check if the image container already exists to avoid duplicates
    if (!document.getElementById("cafeImgContainer")) {
        // Create a container div for the framed image
        const container = document.createElement("div");
        container.id = "cafeImgContainer";
        container.style.width = "70%";
        container.style.maxWidth = "800px";
        container.style.margin = "20px auto";
        container.style.padding = "15px";
        container.style.backgroundColor = "#f5f5dc"; // Beige frame color
        container.style.border = "8px solid #8b4513"; // Brown border
        container.style.borderRadius = "10px";
        container.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
        container.style.position = "relative";
        
        // Create the interior image
        const img = document.createElement("img");
        img.src = "images/interior.png";
        img.alt = "Cafe Interior";
        img.id = "cafeImg";
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.display = "block";
        img.style.borderRadius = "5px";
        
        // Add the image to the container
        container.appendChild(img);
        
        // Insert the container at the top of the lobby screen
        screenLobby.insertBefore(container, screenLobby.firstChild);
    }
    
    // Reset and show customer area
    customerArea.classList.remove("hidden");
    goKitchenBtn.classList.add("hidden");
    takeOrderBtn.classList.remove("hidden");
    currentCustomer = null;
    resetDisplay();
}

// Show how to play information
function showHowToPlay() {
    alert("How To Play:\n1. Click 'Start Your Shift' to begin\n2. Click 'Take Order' to receive a customer's order\n3. Go to the kitchen to prepare the order\n4. Complete orders to earn money!");
}

// Take order from random customer
function takeOrder() {
    // Select random customer from array
    currentCustomer = customers[Math.floor(Math.random() * customers.length)];
    
    // Update displays
    customerNameDisplay.textContent = currentCustomer.name;
    orderDisplay.textContent = currentCustomer.order;
    
    // Update customer image and speech
    customerImg.src = currentCustomer.img;
    customerImg.alt = currentCustomer.name;
    speechText.textContent = currentCustomer.greeting;
    
    // Hide take order button and show kitchen button
    takeOrderBtn.classList.add("hidden");
    goKitchenBtn.classList.remove("hidden");
}

// Switch to kitchen screen
function goToKitchen() {
    showScreen(screenKitchen);
}

// Reset display values
function resetDisplay() {
    customerNameDisplay.textContent = "None 🙂";
    orderDisplay.textContent = "Waiting...";
}

// Update HUD displays
function updateDisplay() {
    moneyDisplay.textContent = "$" + money;
    customersDisplay.textContent = customersServed;
}

// Start the game
initializeGame();
updateDisplay();

























































// ---------------------------------------------------------------
// START HOVER EFFECT
// ---------------------------------------------------------------
const box = document.getElementById("box");
// find the draggable box and stores it in a variable

const dropZone = document.getElementById("dropZone");
// finds the drop zone and stores it in a variable

box.addEventListener("dragStart", function(event){
    // Runs when dragging begins

    event.dataTransfer.setData("text", event.target.id);
    // Save the id of the dragged element
    // "text" is the data type label
    // event.target.id is "box"
});

dropZone.addEventListener("dragover", function(event){
    // Runs repeatedly while the dragged item is over the drop zone

    event.preventDefault();
    // Prevents the browser's default blocking behavior
    // This is required to allow dropping here
});

dropZone.addEventListener("dragenter", function(event){
    // Runs when the dragged itme first enters the dorp zone

    event.preventDefault();
    // Helps keep this area as a valid drop target

    dropZone.classList.add("hovered");
    // Add a CSS Class so the drop zone changes color
});

dropZone.addEventListener("drop", function(event){
    // Runs when the dragged item is dropped into the drop zone

    event.preventDefault();

    const id = event.dataTransfer.getData("text");
    // Gets back the saved id from dragstart

    const draggedElement = document.getElementById(id);
    // Uses this id to find the dragged element

    dropZone.textContent = "";
    // Removes the words "Drop Here"

    dropZone.classList.remove("hovered");
    // Removes the hover background color

    draggedElement.style.margin = "0";
    // Removes the old auto margin so the box fits nearly inside the zone

    dropZone.appendChild(draggedElement);
    // Moves the dragged box into the drop zone
});

dropZone.addEventListener("dragleave", function(){
    // Runs when the dragged item leaves the drop zone

    dropZone.classList.remove("hovered");
    // Removes the highlight color
});
// ---------------------------------------------------------------
// END HOVER EFFECT
// ---------------------------------------------------------------