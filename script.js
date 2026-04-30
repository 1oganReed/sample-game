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








function showScreen(screen) {
    // Hide all screens
    screenHome.classList.remove("active");
    screenLobby.classList.remove("active");
    screenKitchen.classList.remove("active");
    // Show the requested screen
    screen.classList.add("active");
}

startBtn.onclick = function(){
    showScreen(screenLobby);
    startGame();
}



// closeHelp.onclick = function(){
//   helpCard.style.display = "none";
// }

document.getElementById("howToBtn").onclick = function(){

}

function startGame() {
    // Check if the image already exists to avoid duplicates
    if (!document.getElementById("cafeImg")) {
        const img = document.createElement("img");
        img.src = "images/interior.png";
        img.alt = "Cafe";
        img.id = "cafeImg";
        img.style.width = "60%";
        img.style.margin = "32px auto";
        img.style.display = "block";
        screenLobby.insertBefore(img, screenLobby.firstChild);
    }
}

























































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


