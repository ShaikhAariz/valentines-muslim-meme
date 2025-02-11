let noClicks = 1;
const maxNoClicks = 4;
const minNoScale = 0.65;
let noScale = 1;
let yesScale = 1; // This now tracks the scaling factor directly
const gifElement = document.getElementById("togepi-gif");
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const buttonContainer = document.querySelector(".btn-container");
const yesButtonStyle = window.getComputedStyle(yesButton);
const maxYesWidth = parseFloat(yesButtonStyle.maxWidth);

// array of gifs - in order
const gifs = ["assets/images/togepi-happy.gif", "assets/images/togepi-sad-1.gif", "assets/images/togepi-sad-2.gif", "assets/images/togepi-crying.gif"];
// array of messages
const buttonMessages = ["Are you sure??", "Pookie please", "Pookie PLEASE", "You can't do this to me!"];

// no button clicked
noButton.addEventListener("click", () => {
    if (noClicks < maxNoClicks) {
        // Change image
        gifElement.src = gifs[noClicks];
        // Change button text
        noButton.textContent = buttonMessages[noClicks % maxNoClicks];
        // Adjust button width to fit text
        noButton.style.width = 'auto';
        noButton.style.width = `${noButton.scrollWidth}px`;

        // Decrease "No" button size
        if (noScale > minNoScale) {
            noScale -= 0.1;
            noButton.style.transform = `scale(${noScale})`;
        }

        // Scale "Yes" button
        const baseWidth = parseFloat(yesButtonStyle.width);
        const scaledWidth = baseWidth * yesScale;
        if (scaledWidth < maxYesWidth) {
            yesScale += 0.5;
            yesButton.style.transform = `scale(${yesScale})`;
            const rootStyles = getComputedStyle(document.documentElement);
            const gapScaleFactor = parseFloat(rootStyles.getPropertyValue("--gap-scale-factor")) || 250;
            const currentGap = parseFloat(buttonContainer.style.gap) || 20;
            const newGap = Math.sqrt(currentGap * gapScaleFactor);
            buttonContainer.style.gap = `${newGap}px`;
        }
    } else {
        // Redirect to the new page when max "No" clicks are reached
        window.location.href = "passed.html";
    }

    noClicks++;
});

