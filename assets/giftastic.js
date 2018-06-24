var topics = ["Parfait", "Tempura", "Durian", "Noodles"];

//function for rendering buttons to appear on the screen
function renderButtons() {
    $("#buttons-area").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("food-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-area").append(a);
    }
}

//function for doing ajax call to retrieve data
function displayGif() {
    var food = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=FqZtT18F7Eoe84gbL1ZjXDHFiVA2M4Ay&q=" + food + "&limit=10&offset=0&rating=PG-13&lang=en";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data; 
        for (var i = 0; i < results.length; i++) {
            var foodDiv = $("<div class='gifDiv'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-state", "still")
            gifImage.attr("still-image", results[i].images.fixed_height_still.url);
            gifImage.attr("animated-image", results[i].images.fixed_height.url);
            gifImage.addClass("theImage");
            foodDiv.append(p);
            foodDiv.append(gifImage);
            $("#gifs-view").prepend(foodDiv);
        }
    });
}
//function for changing from still image to animated image upon clicking the image 
function changeState() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("animated-image"));
        $(this).attr("data-state", "animated");
    } else if (state === "animated") {
        $(this).attr("src", $(this).attr("still-image"));
        $(this).attr("data-state", "still");
    }
}

//start of function initiation
$(document).ready(function() {
    renderButtons();

    $("#add-food").click(function() {
        event.preventDefault();
        var newFood = $("#food-input").val().trim();
        topics.push(newFood);
        renderButtons();
    });



    $(document).on("click", ".food-btn", displayGif); 
    $(document).on("click", ".theImage", changeState);
});
