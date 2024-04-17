// Fetch elements
const plateInput = document.getElementById("plate-input");
const editButton = document.getElementById("edit-button");

// Whether plate is in viewing mode (or editing mode)
let viewing = true;

async function initialize() {
    // load saved plate
    plateInput.innerHTML = await plate.loadPlate()
    plateInput.innHTML = plateInput.innerHTML.replace(/\n/g, "<br>");
}
initialize()

// toggle edit button
function toggleMarkdownEdit() {
    if (viewing) { // view -> edit
        viewing = false;

        // Enable editing border
        plateInput.style.border= "2px solid rgb(218,154,53)";
        plateInput.style.borderRadius = "5px";

        // Show the input area
        plateInput.contentEditable = "true";
        // Adjust svg to view
        editButton.innerHTML = '<svg width="24" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="#0D0D0D"/><path d="M21.894 11.553C19.736 7.236 15.904 5 12 5c-3.903 0-7.736 2.236-9.894 6.553a1 1 0 0 0 0 .894C4.264 16.764 8.096 19 12 19c3.903 0 7.736-2.236 9.894-6.553a1 1 0 0 0 0-.894zM12 17c-2.969 0-6.002-1.62-7.87-5C5.998 8.62 9.03 7 12 7c2.969 0 6.002 1.62 7.87 5-1.868 3.38-4.901 5-7.87 5z" fill="#0D0D0D"/></svg>';
    } else { // edit -> view
        console.log("Save");
        // Call save
        plate.savePlate(plateInput.innerHTML);

        viewing = true;

        // Disable editing border
        plateInput.style.border= "None";

        // Show the display area and hide the input area
        plateInput.contentEditable = "false";
        // Adjust svg to edit
        editButton.innerHTML = '<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"/><path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"/></svg>';
    }
}
editButton.addEventListener("click", toggleMarkdownEdit);

// allow tabs in editor
plateInput.addEventListener('keydown', function(e) {
    if (e.key == "Tab") {
        e.preventDefault();
        // Insert a tab character
        document.execCommand('insertHTML', false, '&#009');
    }
});
