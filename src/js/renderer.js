// Fetch elements
const mdInput = document.getElementById("markdown-input");
const mdDisplay = document.getElementById("markdown-display");
const editButton = document.getElementById("edit-button");

let viewing = true;

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
    if (viewing) {
        viewing = false;
        // Show the input area and hide the display area
        mdInput.style.display = "block";
        mdDisplay.style.display = "none";
        // Adjust svg to view
        editButton.innerHTML = '<svg width="24" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="#0D0D0D"/><path d="M21.894 11.553C19.736 7.236 15.904 5 12 5c-3.903 0-7.736 2.236-9.894 6.553a1 1 0 0 0 0 .894C4.264 16.764 8.096 19 12 19c3.903 0 7.736-2.236 9.894-6.553a1 1 0 0 0 0-.894zM12 17c-2.969 0-6.002-1.62-7.87-5C5.998 8.62 9.03 7 12 7c2.969 0 6.002 1.62 7.87 5-1.868 3.38-4.901 5-7.87 5z" fill="#0D0D0D"/></svg>';
    } else {
        viewing = true;
        // Show the display area and hide the input area
        mdInput.style.display = "none";
        mdDisplay.style.display = "block";
        mdDisplay.innerHTML = mdInput.value.replace(/\n/g, "<br>");
        // Adjust svg to edit
        editButton.innerHTML = '<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"/><path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"/></svg>';
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
