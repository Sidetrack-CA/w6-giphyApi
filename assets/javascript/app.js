//  Create array for buttons with static information
var buttonArray = ["piper airplane", "beechcraft", "hawker jet", "boeing"];

//  Loops through the array to create buttons and assign each button a class and attribute
for (let butCount = 0; butCount < buttonArray.length; butCount++) {
    var newButton = $("<button>");
    newButton.text(buttonArray[butCount]);
    newButton.addClass("buttons");
    newButton.attr("data", buttonArray[butCount]);
    $("#buttonArea").append(newButton);
}

//  setup the click function to create the url for searching
//  My Gi[phy API Key V389RryWFdARXEZlhLdh9sm2hIPI8CEN
$(document).on("click", ".buttons", function () {
    var find = $(this).attr("data");
    console.log("Data-Name: " + find);
    var apiurl = "https://api.giphy.com/v1/gifs/search?api_key=V389RryWFdARXEZlhLdh9sm2hIPI8CEN&q=" + find + "&limit=10&lang=en&rating=R";

    // create the AJAX call to search the api for the images that have data-name attribute
    $.ajax({
        url: apiurl,
        method: "GET"
    }).then(function (gifReturn) {
        console.log("Gif Return: " + gifReturn);
        // create a loop to add attributes to the images for use during the animate function
        for (let imgCount = 0; imgCount < gifReturn.data.length; imgCount++) {
            console.log("Image Count: " + imgCount);

            // setup new div and image html tags using jquery
            var imgDiv = $("<div>");
            var imgSrc = $("<img>");


            // setup attributes to add to iamges
            imgSrc.addClass("giphy");
            imgSrc.attr("src", gifReturn.data[imgCount].images.fixed_height_still.url);
            imgSrc.attr("data-notMoving", gifReturn.data[imgCount].images.fixed_height_still.url);
            imgSrc.attr("data-moving", gifReturn.data[imgCount].images.fixed_height.url);
            imgSrc.attr("data-movingState", "notMoving");
            imgSrc.attr("rated", gifReturn.data[imgCount].rating);
            imgSrc.attr("data-movingState", "notMoving");
            var rated = gifReturn.data[imgCount].rating;
            console.log("Rated: " + rated);
            var p = $("<p>").text("Rating: " + rated)
            imgDiv.append(imgSrc);
            $("#gifs").append(imgSrc);
            console.log(imgSrc);
        }
    })


});
//  setup the animation for when the user clicks on a gif
$(document).on("click", ".giphy", function () {
    var moving = $(this).attr("data-movingState");
    console.log("Moving-State: " + moving);
    if (moving === "notMoving") {
        $(this).attr("src", $(this).attr("data-moving"));
        $(this).attr("data-movingState", "moving");
    } else {
        $(this).attr("src", $(this).attr("data-notMoving"));
        $(this).attr("data-state", "notMoving");
    }
});

// Add a input field and a submit button to add item to the array
$(document).on("click", "#submitButton", function (event) {
    event.preventDefault();
    buttonArray.push($("#giphySearch").val());
    $("#buttonArea").empty();
    // Copy the for loop from the top to re-draw all of the buttons including the one that is new
    for (let butCount = 0; butCount < buttonArray.length; butCount++) {
        var newButton = $("<button>");
        newButton.text(buttonArray[butCount]);
        newButton.addClass("buttons");
        newButton.attr("data", buttonArray[butCount]);
        $("#buttonArea").append(newButton);
    }
});