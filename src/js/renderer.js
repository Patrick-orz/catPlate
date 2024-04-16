// Fetch elements
const mdInput = document.getElementById("markdown-input");
const mdDisplay = document.getElementById("markdown-display");
const editButton = document.getElementById("edit-button");

async function initialize() {
    // load saved plate
    mdInput.value = await plate.loadPlate();
    mdDisplay.innerHTML = mdInput.value.replace(/\n/g, "<br>");

    // hide editing
    mdInput.style.display = "none";
}
initialize()

// toggle edit button
function toggleMarkdownEdit() {
    if (mdInput.style.display === "none") {
        // Show the input area and hide the display area
        mdInput.style.display = "block";
        mdDisplay.style.display = "none";
        editButton.textContent = "View Markdown";
    } else {
        // Show the display area and hide the input area
        mdInput.style.display = "none";
        mdDisplay.style.display = "block";
        mdDisplay.innerHTML = mdInput.value.replace(/\n/g, "<br>");
        editButton.textContent = "Edit Markdown";
    }
}
editButton.addEventListener("click", toggleMarkdownEdit);


// Listen for save command: CTRL+S (win) or META+S (mac)
document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        console.log("Save");
        // Call save
        plate.savePlate(mdInput.value);
    }
});
