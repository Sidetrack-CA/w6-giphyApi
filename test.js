var topics = ["sad", "happy", "elated", "furious", "contemplative", "fear", "surprise", "anticipation"];

for (let i=0; i <topics.length; i++) {
    var newButton = $("<button>");
    newButton.attr("data", topics[i]);
    newButton.text(topics[i]);
    newButton.addClass("buttons");
    $("#top").append(newButton);
}


// need to shift this to $(document).on("click")
$(document).on("click", ".buttons", function() {
var search = $(this).attr("data");
console.log ("Search term: " + search);
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=F345DRBeGR2E1eYPgCCxF0r7QIBD4bpk&q=" + search + "&limit=10&offset=0&rating=R&lang=en";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);

  for (let i=0; i < response.data.length; i++) {
    var newSpan = $("<span>");
    var newImage = $("<img>");
    newImage.attr("src", response.data[i].images.fixed_height_still.url);
    newImage.attr("rating", response.data[i].rating);
    newImage.attr("data-still", response.data[i].images.fixed_height_still.url)
    newImage.attr("data-animate", response.data[i].images.fixed_height.url)
    newImage.attr("data-state", "still");
    newImage.addClass("gif");
    newImage.attr("id", "id"+i);
    var newRating = $("<p>");
    newRating.text("Rating: " + response.data[i].rating);
    newSpan.append(newImage, newRating);
    $("#images").append(newSpan);
  }
})

});


$(document).on("click", ".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    console.log(state);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});

$(document).on("click", "#emotion-submit", function(event) {
  event.preventDefault();
  topics.push($("#emotion-add").val());
  console.log(topics);
  $("#top").empty();
  for (let i=0; i <topics.length; i++) {
    var newButton = $("<button>");
    newButton.attr("data", topics[i]);
    newButton.text(topics[i]);
    newButton.addClass("buttons");
    $("#top").append(newButton);
}
});