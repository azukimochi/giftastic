var topics = ["Parfait", "Tempura", "Durian", "Noodles"];
var results = [];
var arrSavedItems = [];
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
        results = response.data; 
        for (var i = 0; i < results.length; i++) {
            var foodDiv = $("<div class='gifDiv'>");
            var rating = results[i].rating;
            var pRating = $("<p>").text("Rating: " + rating);
            var title = results[i].title;
            var pTitle = $("<p>").text("Title: " + title);
            var gifImage = $("<img>");
            var br = $("<br>");
            var br2 = $("<br>");
            var br3 = $("<br>");
            var saveBtn = $("<button>").text("Save");

            saveBtn.addClass("saveButton");
            saveBtn.attr("data-title", results[i].title);
            saveBtn.attr("data-rating", results[i].rating);
            saveBtn.attr("data-image", results[i].images.fixed_height_still.url);
            saveBtn.attr("data-image-still", results[i].images.fixed_height_still.url);
            saveBtn.attr("data-image-animate", results[i].images.fixed_height.url);

            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-state", "still")
            gifImage.attr("still-image", results[i].images.fixed_height_still.url);
            gifImage.attr("animated-image", results[i].images.fixed_height.url);
            gifImage.addClass("theImage");
            foodDiv.append(br2);
            foodDiv.append(pTitle);
            foodDiv.append(pRating);
            foodDiv.append(br3);
            foodDiv.append(gifImage);
            foodDiv.append(br);
            foodDiv.append(saveBtn);
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
//function for when you click on the save button 
function saveGif() {
    console.log("Hi");
    console.log($(this).attr("data-title"));
    console.log($(this).attr("data-rating"));
    console.log($(this).attr("data-image"));
    console.log($(this).attr("data-image-animate"));
    console.log($(this).attr("data-image-still"));
    console.log($(this).attr("data-state"));
    var vsaveTitle = $(this).attr("data-title");
    var vsaveRating = $(this).attr("data-rating");
    var vsaveImage = $(this).attr("data-image");
    var vsaveImageStill = $(this).attr("data-image-still");
    var vsaveImageAnimate = $(this).attr("data-image-animate");
    var savedItem = {
        "title": vsaveTitle,
        "rating": vsaveRating,
        "image": vsaveImage,
        "imageStill": vsaveImageStill,
        "imageAnimate": vsaveImageAnimate,
    }
    console.log(savedItem);
    arrSavedItems.push(savedItem);
    console.log("This is the array " + arrSavedItems);
    localStorage.setItem("saved-gifs", JSON.stringify(arrSavedItems));
    // showSavedGifs();
}

//function for showing the saved gifs when reloading the page because they're in the local storage 
function showSavedGifs() {
    // $("#gifs-view").empty();
    arrSavedItems = JSON.parse(localStorage.getItem("saved-gifs")) || [];
    var lastActivity = JSON.parse(localStorage.getItem("saved-gifs")) || [];
    for (i = 0; i < lastActivity.length; i++) {
        console.log(lastActivity[i].rating);
        var foodDiv = $("<div class='gifDiv'>"); 
        var pRating = $("<p>").text("Rating: " + lastActivity[i].rating);
        var pTitle = $("<p>").text("Title: " + lastActivity[i].title);
        var gifImage = $("<img>");
        var saveBtn = $("<button>").text("Save");
        var br = $("<br>");
        var br2 = $("<br>");
        var br3 = $("<br>");

        saveBtn.addClass("saveButton");
        saveBtn.attr("data-title", lastActivity[i].title);
        saveBtn.attr("data-rating", lastActivity[i].rating);
        saveBtn.attr("data-image", lastActivity[i].image);

        gifImage.attr("src", lastActivity[i].image);
        gifImage.attr("data-state", "still")
        gifImage.attr("still-image", lastActivity[i].imageStill);
        gifImage.attr("animated-image", lastActivity[i].imageAnimate);
        gifImage.addClass("theImage");
        foodDiv.append(br2);
        foodDiv.append(pTitle);
        foodDiv.append(pRating);
        foodDiv.append(br3);
        foodDiv.append(gifImage);
        foodDiv.append(br);
        foodDiv.append(saveBtn);
        $("#favourites").prepend(foodDiv);
    }
}

//start of function initiation
$(document).ready(function() {
    // localStorage.clear();
    renderButtons();
    
    $("#add-food").click(function() {
        event.preventDefault();
        var newFood = $("#food-input").val().trim();
        topics.push(newFood);
        renderButtons();
    });
    $(document).on("click", ".food-btn", displayGif); 
    $(document).on("click", ".theImage", changeState);
    $(document).on("click", ".saveButton", saveGif);
    showSavedGifs();

});