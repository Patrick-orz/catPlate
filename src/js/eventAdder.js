// Priority dropdown filter
function updatePriority() {
    const filterInput = $(".filter-input");
    var filter = filterInput.val().toUpperCase();
    var items = document.querySelectorAll('.dropdown-list');
    console.log(filter);
    items.forEach(function(item) {
        var text = item.textContent.toUpperCase().trim();
        if (text.includes(filter)) {
            console.log(text);
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}
$(".filter-input").on('input', updatePriority);

// Init priority
$(".priority-input").val($(".dropdown-item.active").text().trim());
// Priority dropdown select
$(".dropdown-item").click(function (e) {
    // update active & display
    $(".dropdown-item").removeClass("active");
    $(this).addClass("active");

    // update text
    $(".priority-input").val($(".dropdown-item.active").text().trim());
});

// Add button
// Submit todo
$(".add-input").click(async() => {
    // Grab due date
    let date = new Date($(".due-input").val());
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getFullYear();
    // Grab priority
    let priority = $(".priority-input").val();
    // Grab description
    let description = $(".description-input").val().trim();

    // console.log(date);
    // console.log(day,month,year);
    // console.log(priority);
    // console.log(description);

    // Generate json to store
    let event =
    {
        description: description.length ===0?"~":description, 
        priority: (priority.includes("High")?3:(priority.includes("Medium")?2:(priority.includes("Low")?1:0))), 
        due: isNaN(date)?"~":year+"-"+month+"-"+day, 
    };

    // console.log(event);

    // Concat new event with old
    let storedEvents = await plate.loadPlate("events");
    if (storedEvents === undefined) {
        storedEvents = [];
    }
    storedEvents.push(event);
    // console.log(storedEvents);

    // Store locally
    plate.savePlate("events", storedEvents);

    // Reset input
    $(".description-input").val('');

    $(".due-input").val('');

    $(".dropdown-item").removeClass('active');
    $(".dropdown-item-default").addClass('active');
    $(".priority-input").val($(".dropdown-item.active").text().trim());
    $(".filter-input").val('');
    updatePriority();
})
