{/* <div class="row d-flex"> */}
{/*     <div class="col-7 d-flex justify-content-center align-items-center"> */}
{/*     </div> */}
{/*     <div class="col-2 d-flex justify-content-center align-items-center"> */}
{/*         <span class="black-highight"> */}
{/*         </span> */}
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

async function handleRemoval(){
    // deletion confirmed
    $(".confirmDelete-input").click(async function(){
        let events = await plate.loadPlate("events");
        // console.log($(this).index('.confirmDelete-input'));
        events.splice($(this).index('.confirmDelete-input'), 1);
        console.log(events);

        plate.savePlate("events", events);
        // Tell other js file that there's pending plates change
        $("#js-communication").trigger("pending-plates-change");

    })
}
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
                    '<div class="col-1 d-flex justify-content-center align-items-center removal-container">' +
                        '<button type="button" class="btn deleteEvent-input" data-bs-toggle="modal" data-bs-target="#' + 'eventDeletionConfirmation' + i +'">' +
                            '<i class="fa-solid fa-trash-can text-danger"></i>' +
                        '</button>' +

// confirmation modal
'<div class="modal fade" id="' + 'eventDeletionConfirmation' + i + '"" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="' + 'eventDeletionConfirmation' + i + 'Label' + '" aria-hidden="true">' +
'  <div class="modal-dialog modal-dialog-centered">' +
'    <div class="modal-content">' +
'      <div class="modal-header">' +
'        <h5 class="modal-title" id="' + 'eventDeletionConfirmation' + i +'Label' + '">Are you sure about deleting this event?</h5>' +
'        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
'      </div>' +
'      <div class="modal-body">' +
'It would be lost forever!' +
'      </div>' +
'      <div class="modal-footer">' +
'        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>' +
'        <button type="button" class="btn btn-danger confirmDelete-input" data-bs-dismiss="modal">Delete</button>' +
'      </div>' +
'    </div>' +
'  </div>' +
'</div>' +

                    '</div>' +
                '</div>' +
                '<hr>';

        // push into view
        container.append(event);
    }
    handleRemoval();

    // Note to self: stay consistent with JQuery and vanilla JS!
}
updatePlate();

// call update on pending change
const communicationSpan = $("#js-communication");
communicationSpan.on("pending-plates-change", updatePlate);
