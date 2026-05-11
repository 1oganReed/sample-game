// ---------------------------------------------------------------
// SCREEN ELEMENTS
// ---------------------------------------------------------------
const screenHome     = document.getElementById("screenHome");
const screenLobby    = document.getElementById("screenLobby");
const screenKitchen  = document.getElementById("screenKitchen");
const screenGameOver = document.getElementById("screenGameOver");

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
// NOTE: serveOrderBtn removed — the kitchen game ends automatically now

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
    {
        name: "Alex",
        greeting: "I would like a complete cheeseburger, double patties, double cheese!",
        order: "Double Cheeseburger",
        steps: ["Add Bun", "Add Patty", "Add Cheese", "Add Patty", "Add Cheese", "Add Lettuce", "Add Tomato", "Wrap It Up"],
        reward: 10,
        img: "images/alex-idle-1.png",
    },
    {
        name: "Ann",
        greeting: "Give me a burger, double veggies, no meat",
        order: "Double Vegetarian Cheeseburger",
        steps: ["Add Bun", "Add Cheese", "Add Lettuce", "Add Tomato", "Add Lettuce", "Add Tomato",  "Wrap It Up"],
        reward: 9,
        img: "images/ann-idle-1.png",
    }
];

// All sounds stored in one array of objects

const gameSounds = [
    { name: "background", id: "bg-music" },
    { name: "greeting", id: "customer-greeting" },
    { name: "write", id: "write-order" },
    { name: "tick", id: "clock-tick"},
    { name: "correct",  id: "correct-choice"  },
    { name: "gain",  id: "gain-money"  },
    { name: "incorrect",  id: "incorrect-choice"  },
    { name: "lose",  id: "game-over"  },
];

// Helper function — finds the sound by name and plays it
function playSound(soundName) {
    for (let i = 0; i < gameSounds.length; i++) {
        if (gameSounds[i].name === soundName) {
            let sound = document.getElementById(gameSounds[i].id);
            sound.currentTime = 0;
            // Only loop background music
            sound.loop = (gameSounds[i].name === "background");
            sound.play();
            return;
        }
    }
}

// Call it anywhere in your game like this:
// playSound("roll");
// playSound("hit");
// playSound("win");

// ---------------------------------------------------------------
// GAME STATE
// ---------------------------------------------------------------
let currentCustomer = null;
let money           = 0;
let customersServed = 0;
let secondsLeft     = 10;   // time remaining on the kitchen timer
let currentStep     = 0;    // which step the player must click next
let timerInterval   = null; // reference to setInterval so we can stop it later

// ---------------------------------------------------------------
// SCREEN SWITCHING
// ---------------------------------------------------------------
function showScreen(screen) {
    screenHome.classList.remove("active");
    screenLobby.classList.remove("active");
    screenKitchen.classList.remove("active");
    screenGameOver.classList.remove("active");
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
    document.getElementById("retryBtn").addEventListener("click", retryGame);
    document.getElementById("homeBtn").addEventListener("click", goToHome);
    // No serveOrderBtn listener — game ends itself when steps are done
}

// ---------------------------------------------------------------
// GO TO LOBBY
// ---------------------------------------------------------------
function goToLobby() {
    playSound("background");
    showScreen(screenLobby);
    setupLobby();
}

function setupLobby() {
    playSound("greeting");
    currentCustomer = null;
    goKitchenBtn.classList.add("hidden");
    takeOrderBtn.classList.remove("hidden");
    resetOrderDisplay();
    customerImg.src = "images/unknown.png";
    speechText.textContent = "Hello! I'd like to order.";
}

// ---------------------------------------------------------------
// GO TO HOME
// ---------------------------------------------------------------
function goToHome() {
    showScreen(screenHome);
}

// ---------------------------------------------------------------
// RETRY GAME
// ---------------------------------------------------------------
function retryGame() {
    money = 0;
    customersServed = 0;
    updateDisplay();
    goToLobby();
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
        "4. Click the steps IN ORDER before the timer runs out!\n" +
        "5. Wrong step = 3 second penalty!" +
        "6. Completed orders gain you money while incomplete orders lose you money!"
    );
}

// ---------------------------------------------------------------
// TAKE ORDER
// ---------------------------------------------------------------
function takeOrder() {
    playSound("write");
    currentCustomer = customers[Math.floor(Math.random() * customers.length)];

    customerNameDisplay.textContent = currentCustomer.name;
    orderDisplay.textContent        = currentCustomer.order;
    customerImg.src                 = currentCustomer.img;
    customerImg.alt                 = currentCustomer.name;
    speechText.textContent          = currentCustomer.greeting;

    takeOrderBtn.classList.add("hidden");
    goKitchenBtn.classList.remove("hidden");
}

// ---------------------------------------------------------------
// GO TO KITCHEN
// ---------------------------------------------------------------
function goToKitchen() {
    if (currentCustomer) {
        kitchenCustomerName.textContent = currentCustomer.name;
        kitchenOrderItem.textContent    = currentCustomer.order;
    }
    showScreen(screenKitchen);
    startKitchenGame();
}

<<<<<<< HEAD
=======
//startKitchenGame() {
//
//}
 
>>>>>>> 0f4bdb19b3553c506a6f906f004162250f2e777b
// ---------------------------------------------------------------
// KITCHEN MINI-GAME
// ---------------------------------------------------------------
function startKitchenGame() {
    // Reset state fresh every time the kitchen loads
    currentStep = 0;
    secondsLeft = 10;

    // Build the progress tracker — a row of pills showing each step
    // They start grey and turn green as steps are completed
    const progress = document.getElementById("stepProgress");
    progress.innerHTML = ""; // wipe anything left from a previous round
    currentCustomer.steps.forEach(function(step) {
        const dot = document.createElement("span");
        dot.classList.add("progress-step");
        dot.textContent = step;
        progress.appendChild(dot);
    });

    // Build the clickable step buttons
    // Shuffle a copy of the steps array so buttons appear in a random order each round
    // We keep the original index (the step's true position) attached to each button
    // so handleStepClick still knows what order is correct
    const stepContainer = document.getElementById("stepButtons");
    stepContainer.innerHTML = ""; // wipe leftovers

    // Make a list of objects pairing each step with its correct index
    const shuffled = currentCustomer.steps
        .map(function(step, index) { return { step: step, index: index }; })
        .sort(function() { return Math.random() - 0.5; }); // Fisher-Yates-style shuffle

    shuffled.forEach(function(item) {
        const btn = document.createElement("button");
        btn.textContent   = item.step;
        btn.dataset.index = item.index; // store the TRUE step number, not display position

        // No highlight on any button — player must read and decide themselves
        btn.addEventListener("click", function() {
            handleStepClick(item.index, btn);
        });

        stepContainer.appendChild(btn);
    });

    // Show timer immediately (so it reads 15s, not blank)
    updateTimerDisplay();

    // Start the countdown — fires every 1000ms (1 second)
    timerInterval = setInterval(function() {
        playSound("tick");
        secondsLeft--;
        updateTimerDisplay();

        if (secondsLeft <= 0) {
            clearInterval(timerInterval); // stop ticking
            failOrder();
        }
    }, 1000);
}

// ---------------------------------------------------------------
// HANDLE A STEP BUTTON CLICK
// ---------------------------------------------------------------
function handleStepClick(index, btn) {
    if (index === currentStep) {
        playSound("correct");
        // CORRECT — this is the step we expected
        btn.disabled    = true;                     // grey it out, can't re-click
        btn.textContent = "✅ " + btn.textContent; // mark it done visually
        btn.classList.remove("next-step");          // remove the orange highlight

        // Mark the matching pill in the progress tracker green
        const dots = document.querySelectorAll(".progress-step");
        dots[currentStep].classList.add("done");

        currentStep++; // move to the next expected step

        // All steps done? Stop timer and reward the player
        if (currentStep === currentCustomer.steps.length) {
            clearInterval(timerInterval);
            serveOrder();
        }

    } else {
        playSound("incorrect")
        // WRONG — not the step we expected, apply a 3 second penalty
        secondsLeft = Math.max(0, secondsLeft - 1);
        updateTimerDisplay();

        // Flash the button red for 400ms so player knows they clicked wrong
        btn.classList.add("wrong");
        setTimeout(function() {
            btn.classList.remove("wrong");
        }, 400);
    }
}

// ---------------------------------------------------------------
// UPDATE TIMER DISPLAY
// ---------------------------------------------------------------
function updateTimerDisplay() {
    const display = document.getElementById("timerDisplay");
    display.textContent = secondsLeft + "s";

    // Turn red at 5 seconds or less as an urgency warning
    if (secondsLeft <= 5) {
        display.classList.add("urgent");
    } else {
        display.classList.remove("urgent");
    }
}

// ---------------------------------------------------------------
// FAIL — timer hit zero
// ---------------------------------------------------------------
function failOrder() {
    playSound("lose");
    alert("⏰ Too slow! The order was ruined.");
    money -= currentCustomer.reward;
    updateDisplay();
    if (money < 0) {
        showScreen(screenGameOver);
    } else {
        goToLobby(); // return to lobby, no money awarded
    }
}

// ---------------------------------------------------------------
// SERVE ORDER — called automatically when all steps complete
// ---------------------------------------------------------------
function serveOrder() {
    playSound("gain");
    clearInterval(timerInterval); // safety net — always stop the timer

    if (currentCustomer) {
        money           += currentCustomer.reward;
        customersServed += 1;
        updateDisplay();
    }
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
