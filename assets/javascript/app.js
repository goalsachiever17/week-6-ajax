 
var topics = ["orange", "apple", "watermelon", "grape", "strawberry", "lemon", "cherimoya", "soursop", "honeydew", "redcurrant", "salmonberry"];


 var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=nUD9mQGtFcgGVZfKqH2djlC2ZpGjlo2g&q=&limit=10&offset=0&rating=G&lang=en"; 
      



      $(document).ready (function() {

        displayButtons();
  });

     // renders buttons into the page
function displayButtons() {


 //clear out buttons list to avoid duplicates
    $("#buttons").empty();

// loop through the array and generates buttons dynamically
      for (var i = 0; i < topics.length; i++) {
        var c = $("<button>");

  //Add classes and attributes to each button 
          c.addClass("fruits-button");
          
          c.attr("data-name", topics[i]);

          //add text to the buttons
          c.text(topics[i]);
          //generate buttons in the appropriate div using html  
          $("#buttons").append(c);
       }
}

//Adds a dynamic button function when new fruit are submitted

$("#addMoreFruit").on("click",function(){

    var newfruit = $("#fruit-input").val().trim();   //Saves the user's input into a variable
       if (newfruit != ""){

        topics.push(newfruit); //Adds the user's new fruit name into the array topics
        displayButtons();
    } 
    $("#fruit-input").val(" ");
    return false;
});

function displayImages(){
    $("#gif-images").empty();

 var name = $(this).attr("data-name");  //Saves the fruit button user selects into a variable for ajax use

   $.ajax({
      url: (queryURL + name),
      method: 'GET'
    }).done(function(response) {
      console.log(response);
    
 // Storing an array of results in the results variable
          var results = response.data;
 for (i = 0; i < 10; i++){


 var still = response.data[i].images.downsized_still.url;

        var animate = response.data[i].images.downsized.url;

        var rating = response.data[i].rating;

   //Create a variable to hold an img tag
          var image= $("<img>");

    image = $("<img height=200px width=200px>");  
   image.addClass("image-results");
   image.attr("data-state", "still");
   image.attr("data-still", still);
   image.attr("data-animate", animate);
   image.attr("src", still);
    $("#gif-images").append(image);
    $("#gif-images").append(rating);
    console.log(response);
    console.log(response.data[i].rating);
    console.log(rating);
}
});
}

function playOrPause(){
    var state = $(this).attr("data-state");
    if (state==="still") {
        $(this).attr("src",$(this).attr("data-animate"));
        $(this).attr("data-state","animate");

    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state","still");
    }    
}

$(document).on("click",".fruits-button",displayImages);
$(document).on("click",".image-results",playOrPause);
 




    
