// textArea
const textInput = document.getElementById('textInput');

// load saved plate
async function initialize() {
    textInput.value = await plate.loadPlate();
}
initialize()

// Listen for save command: CTRL+S (win) or META+S (mac)
document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        console.log("Save");
        // Call save
        plate.savePlate(textInput.value);
    }
});
