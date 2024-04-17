// Fetch element
const plateInput = document.getElementById("plate-input");
const editButton = document.getElementById("edit-button");

// Turns normalized innerText string into plate HTML format
function intoPlate(content) {
    content = content.split('\n');
    // // remove empty strings
    // content = content.filter(function(element) {
    //     // Return true if the element is not an empty string
    //     return element !== "";
    // });
    console.log(content);

    let contentHTML = [];
    // stylize list
    // source string has to follow following format to be turned into list
    // \t- 
    // number of tabs could be infinite
    for (let i = 0; i < content.length; i++) {
        console.log(content[i]);
        contentHTML[i] = "";
        let tabCount = 1;
        let at = 0;
        while (content[i][at] === '\t') {
            tabCount++;
            at++;
        }
        console.log(tabCount);
        console.log(content[i][at]);
        console.log(content[i][at + 1]);
        if (content[i][at] != '-' || content[i][at + 1] != ' ') {
            tabCount = 0;
        }

        // add nesting list html tag (front)
        for (let o = 1; o < tabCount; o++) {
            contentHTML[i] += "<ul>";
        }
        if (tabCount) {
            contentHTML[i] += "<li>";
        }

        // add line content
        contentHTML[i] += (tabCount ? content[i].substring(at + 1) : content[i].substring(0));

        // add nesting list html tag (back)
        if (tabCount) {
            contentHTML[i] += "</li>";
        }
        for (let o = 1; o < tabCount; o++) {
            contentHTML[i] += "</ul>";
        }

        // add <br> for linebreak only if this wasnt a list element
        if (!tabCount) {
            contentHTML[i] += "<br>";
        }
    }

    contentHTML = contentHTML.join("");

    return "<ul>" + contentHTML + "</ul>";
}

function normalize(content) {
    // collapse extra newline
    content = content.replace(/\n+\s*\n+/g, "\n");
    // turn 8 consecutive space into \t
    content = content.replace(/ {8}/g, '\t');
    return content;
}

// Whether plate is in viewing mode (or editing mode)
let viewing = true;

async function initialize() {
    // load saved plate
    plateInput.innerText = normalize(await plate.loadPlate());
    plateInput.innerHTML = intoPlate(plateInput.innerText);
}
initialize()


// toggle edit button
async function toggleMarkdownEdit() {
    if (viewing) { // view -> edit
        plateInput.innerText = normalize(await plate.loadPlate());
        viewing = false;

        // Enable editing border
        plateInput.style.border = "2px solid rgb(218,154,53)";
        plateInput.style.borderRadius = "5px";

        // Show the input area
        plateInput.contentEditable = "true";
        // Adjust svg to view
        editButton.innerHTML = '<svg width="24" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="#0D0D0D"/><path d="M21.894 11.553C19.736 7.236 15.904 5 12 5c-3.903 0-7.736 2.236-9.894 6.553a1 1 0 0 0 0 .894C4.264 16.764 8.096 19 12 19c3.903 0 7.736-2.236 9.894-6.553a1 1 0 0 0 0-.894zM12 17c-2.969 0-6.002-1.62-7.87-5C5.998 8.62 9.03 7 12 7c2.969 0 6.002 1.62 7.87 5-1.868 3.38-4.901 5-7.87 5z" fill="#0D0D0D"/></svg>';
    } else { // edit -> view
        console.log("Save");
        plateInput.innerText = normalize(plateInput.innerText);
        // Call save
        plate.savePlate(plateInput.innerText);
        viewing = true;

        plateInput.innerHTML = intoPlate(plateInput.innerText);

        // Disable editing border
        plateInput.style.border = "None";

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
