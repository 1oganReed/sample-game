// ---------------------------------------------------------------
// SCREEN ELEMENTS
// ---------------------------------------------------------------
const screenHome    = document.getElementById("screenHome");
const screenLobby   = document.getElementById("screenLobby");
const screenKitchen = document.getElementById("screenKitchen");
 
// ---------------------------------------------------------------
// HUD ELEMENTS
// ---------------------------------------------------------------
const moneyDisplay        = document.getElementById("moneyDisplay");
const customersDisplay    = document.getElementById("customersDisplay");
const customerNameDisplay = document.getElementById("customerNameDisplay");
const orderDisplay        = document.getElementById("orderDisplay");
 
// Kitchen HUD
const kitchenCustomerName = document.getElementById("kitchenCustomerName");
const kitchenOrderItem    = document.getElementById("kitchenOrderItem");
 
// ---------------------------------------------------------------
// CUSTOMER AREA ELEMENTS
// ---------------------------------------------------------------
const customerArea  = document.getElementById("customerArea");
const speechText    = document.getElementById("speechText");
const customerImg   = document.getElementById("customerImg");
 
// ---------------------------------------------------------------
// BUTTONS
// ---------------------------------------------------------------
const startBtn      = document.getElementById("startBtn");
const takeOrderBtn  = document.getElementById("takeOrderBtn");
const goKitchenBtn  = document.getElementById("goKitchenBtn");
const serveOrderBtn = document.getElementById("serveOrderBtn");
 
// ---------------------------------------------------------------
// CUSTOMER DATA
// ---------------------------------------------------------------
const customers = [
    {
        name: "Joe",
        greeting: "Hi! Can I get JUST a cheeseburger?",
        order: "Cheeseburger",
        steps: ["Add Bun", "Add Patty", "Add Cheese", "Wrap It Up"],
        reward: 5,
        img: "images/joe-idle-1.png",
    },
    {
        name: "Bob",
        greeting: "Hey, one classic burger with everything please!",
        order: "Classic Burger",
        steps: ["Add Bun", "Add Patty", "Add Cheese", "Add Lettuce", "Add Tomato", "Wrap It Up"],
        reward: 7,
        img: "images/bob-idle-1.png",
    },
    {
        name: "Jane",
        greeting: "Hamburger, NO Tomatoes...",
        order: "Hamburger",
        steps: ["Add Bun", "Add Patty", "Add Lettuce", "Wrap It Up"],
        reward: 4,
        img: "images/jane-idle-1.png",
    },
];
 
// ---------------------------------------------------------------
// GAME STATE
// ---------------------------------------------------------------
let currentCustomer = null;
let money           = 0;
let customersServed = 0;
let secondsLeft = 15;
let currentStep = 0;
 
// ---------------------------------------------------------------
// SCREEN SWITCHING
// Only one screen is visible at a time.
// ---------------------------------------------------------------
function showScreen(screen) {
    screenHome.classList.remove("active");
    screenLobby.classList.remove("active");
    screenKitchen.classList.remove("active");
    screen.classList.add("active");
}
 
// ---------------------------------------------------------------
// INITIALIZE — wire up all button listeners once
// ---------------------------------------------------------------
function initializeGame() {
    startBtn.addEventListener("click", goToLobby);
    document.getElementById("howToBtn").addEventListener("click", showHowToPlay);
    takeOrderBtn.addEventListener("click", takeOrder);
    goKitchenBtn.addEventListener("click", goToKitchen);
    serveOrderBtn.addEventListener("click", serveOrder);   // NEW: serve button in kitchen
}
 
// ---------------------------------------------------------------
// GO TO LOBBY
// ---------------------------------------------------------------
function goToLobby() {
    showScreen(screenLobby);
    setupLobby();
}
 
function setupLobby() {
    // Reset order-taking state
    currentCustomer = null;
    goKitchenBtn.classList.add("hidden");
    takeOrderBtn.classList.remove("hidden");
    resetOrderDisplay();
    // Clear customer image so no ghost image lingers between customers
    customerImg.src = "images/unknown.png";
    speechText.textContent = "Hello! I'd like to order.";
}
 
// ---------------------------------------------------------------
// HOW TO PLAY
// ---------------------------------------------------------------
function showHowToPlay() {
    alert(
        "How To Play:\n" +
        "1. Click 'Start Your Shift' to begin\n" +
        "2. Click 'Take Order' to receive a customer's order\n" +
        "3. Click 'Go to Kitchen' to prepare the order\n" +
        "4. Click 'Serve Order' to complete it and earn money!"
    );
}
 
// ---------------------------------------------------------------
// TAKE ORDER — pick a random customer, update HUD + character
// ---------------------------------------------------------------
function takeOrder() {
    currentCustomer = customers[Math.floor(Math.random() * customers.length)];
 
    // Update lobby HUD
    customerNameDisplay.textContent = currentCustomer.name;
    orderDisplay.textContent        = currentCustomer.order;
 
    // Update customer sprite + speech bubble
    customerImg.src         = currentCustomer.img;
    customerImg.alt         = currentCustomer.name;
    speechText.textContent  = currentCustomer.greeting;
 
    // Swap buttons: hide Take Order, show Go to Kitchen
    takeOrderBtn.classList.add("hidden");
    goKitchenBtn.classList.remove("hidden");
}
 
// ---------------------------------------------------------------
// GO TO KITCHEN — switch screen, mirror order into kitchen HUD
// ---------------------------------------------------------------
function goToKitchen() {
    // Mirror current order into the kitchen HUD so the player can see what to make
    if (currentCustomer) {
        kitchenCustomerName.textContent = currentCustomer.name;
        kitchenOrderItem.textContent    = currentCustomer.order;
    }
    showScreen(screenKitchen);
    
    startKitchenGame();
}

//startKitchenGame() {
//
//}
 
// ---------------------------------------------------------------
// SERVE ORDER — award money, increment counter, return to lobby
// ---------------------------------------------------------------
function serveOrder() {
    if (currentCustomer) {
        money           += currentCustomer.reward;
        customersServed += 1;
        updateDisplay();
    }
    // Go back to lobby ready for the next customer
    goToLobby();
}
 
// ---------------------------------------------------------------
// DISPLAY HELPERS
// ---------------------------------------------------------------
function resetOrderDisplay() {
    customerNameDisplay.textContent = "None 🙂";
    orderDisplay.textContent        = "Waiting...";
}
 
function updateDisplay() {
    moneyDisplay.textContent     = "$" + money;
    customersDisplay.textContent = customersServed;
}
 
// ---------------------------------------------------------------
// BOOT
// ---------------------------------------------------------------
initializeGame();
updateDisplay();
