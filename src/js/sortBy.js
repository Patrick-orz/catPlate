async function init(){
    let ogSortBy = await plate.loadPlate("sortBy");
    // init if no local storage
    if(await ogSortBy == undefined){
        await plate.savePlate("sortBy", 0);
        ogSortBy = 0;
    }
    // console.log(await ogSortBy);
    // console.log($(".dropdown-item.sort-item").eq(ogSortBy));

    $(".dropdown-item.sort-item").removeClass("active");
    $(".dropdown-item.sort-item").eq(ogSortBy).addClass("active");

    $(".selected-sort-by").text($(".dropdown-item.sort-item.active").text());
}
init();

$(".dropdown-item.sort-item").click(async function(){
    const index = $(this).index(".dropdown-item.sort-item");
    // console.log(index);
    await plate.savePlate("sortBy", index);

    $(".selected-sort-by").text($(".dropdown-item.sort-item.active").text());

    // update plates list
    $("#js-communication").trigger("pending-plates-change");
})
