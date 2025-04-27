document.getElementById("cycleButton").addEventListener("click", function () {
    const images = [
        "slots/cherries.png",
        "slots/diamond.png",
        "slots/lemon.png",
        "slots/seven.png",
    ];

    // Toggle spin sound
    let playSpinSound = true; // Flag to toggle spin sound
    const spinSound = new Audio("sfx/spin.mp3");

    if (playSpinSound) {
        spinSound.play();
    }
    playSpinSound = !playSpinSound; // Toggle the flag

    // Get all boxes
    const boxes = [document.getElementById("box1"), document.getElementById("box2"), document.getElementById("box3")];
    const bigbox = document.querySelector(".bigbox"); // Select the bigbox

    // Store the final images for comparison
    const finalImages = [];
    let jackpotPlayed = false; // Flag to ensure the jackpot sound plays only once

    // Add spinning effect to the bigbox
    bigbox.classList.add("spinning");

    // Function to simulate spinning for a single box
    function spinBox(box, duration, index) {
        box.style.opacity = "0.8"; // Set opacity to 80% during spinning
        let spinInterval = setInterval(() => {
            const randomImage = images[Math.floor(Math.random() * images.length)];
            box.style.backgroundImage = `url(${randomImage})`;
        }, 100); // Change image every 100ms

        // Stop spinning after the specified duration
        setTimeout(() => {
            clearInterval(spinInterval);
            const finalImage = images[Math.floor(Math.random() * images.length)];
            box.style.backgroundImage = `url(${finalImage})`;
            box.style.opacity = "1"; // Set opacity to 100% when spinning stops
            finalImages[index] = finalImage;

            // Check if all boxes have stopped spinning
            if (finalImages.length === 3) {
                bigbox.classList.remove("spinning"); // Remove spinning effect

                // If all images match, trigger the jackpot glow
                if (finalImages.every(img => img === finalImages[0]) && !jackpotPlayed) {
                    jackpotPlayed = true; // Set the flag to true
                    bigbox.classList.add("jackpot"); // Add fast flashing glow
                    displayJackpot(); // Display "JACKPOT"
                }
            }
        }, duration);
    }

    // Spin each box with a slight delay for a slot machine effect
    spinBox(boxes[0], 2700, 0); // Spins for 2 seconds
    spinBox(boxes[1], 2900, 1); // Spins for 2.7 seconds
    spinBox(boxes[2], 3150, 2); // Spins for 3.5 seconds

    // Function to display and flash "JACKPOT"
    function displayJackpot() {
        const scorebox = document.querySelector(".scorebox");
        scorebox.textContent = "JACKPOT"; // Set the "JACKPOT" text
        scorebox.classList.add("flash"); // Add the flashing effect

        // Play jackpot sound
        const jackpotSound = new Audio("sfx/jackpot.mp3");
        jackpotSound.play();

        // Remove the jackpot glow and flashing effect after 3 seconds
        setTimeout(() => {
            bigbox.classList.remove("jackpot"); // Remove fast flashing glow
            scorebox.textContent = ""; // Clear the "JACKPOT" text
            scorebox.classList.remove("flash");
            jackpotPlayed = false; // Reset the flag for the next spin
        }, 3000);
    }
});

document.getElementById("backButton").addEventListener("click", function () {
    window.location.href = "milf.html";
});