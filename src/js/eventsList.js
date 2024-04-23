{/* <div class="row d-flex"> */}
{/*     <div class="col-7 d-flex justify-content-center align-items-center"> */}
{/*     </div> */}
{/*     <div class="col-2 d-flex justify-content-center align-items-center"> */}
{/*         <span class=""> */}
{/*         </span> */}
{/*     </div> */}
{/*     <div class="col-2 d-flex justify-content-center align-items-center"> */}
{/*         <span class=""> */}
{/*         </span> */}
{/*     </div> */}
{/*     <div class="col-1 d-flex justify-content-center align-items-center"> */}
{/*         <i class="fa-solid fa-trash-can text-danger"></i> */}
{/*     </div> */}
{/* </div> */}

async function updatePlate() {
    // init
    let events = await plate.loadPlate("events");
    const container = $("#events-container");
    container.html('');

    for(let i=0;i<await events.length;i++){
        // parse stored JSON
        let description = events[i]["description"];
        let due = events[i]["due"];
        let priority = events[i]["priority"];

        const highlights = ["black-highlight", "success-highlight", "warning-highlight", "danger-highlight"];
        const priorities = ["None", "Low Priority", "Medium Priority", "High Priority"];

        // construct event into html
        let event =
            '<div class="row d-flex">' +
                '<div class="col-7 d-flex justify-content-center align-items-center">' +
                description +
                '</div>' +
                '<div class="col-2 d-flex justify-content-center align-items-center">' +
                '<span class="' + highlights[priority] + '">' +
                priorities[priority] +
                '</span>' +
                '</div>' +
                '<div class="col-2 d-flex justify-content-center align-items-center">' +
                '<span class="black-highlight">' +
                'DUE: ' + due +
                '</span>' +
                '</div>' +
                '<div class="col-1 d-flex justify-content-center align-items-center">' +
                '<i class="fa-solid fa-trash-can text-danger"></i>' +
                '</div>' +
                '</div>' +
                '<hr>';

        // push into view
        container.append(event);
    }

    // Note to self: stay consistent with JQuery and vanilla JS!
}
updatePlate();

// call update on pending change
const communicationSpan = $("#js-communication");
communicationSpan.on("pending-plates-change", updatePlate);
