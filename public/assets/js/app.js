// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".signup-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newJammer = {
      name: $("#name")
        .val()
        .trim(),
      age: $("#age")
        .val()
        .trim(),
      city: $("#city")
        .val()
        .trim(),
      state: $("#state")
        .val()
        .trim(),
      zipcode: $("#zip")
        .val()
        .trim()
    };

    console.log(newJammer);
    // Send the POST request.
    $.ajax("/api/jammers", {
      type: "POST",
      data: newJammer
    }).then(function() {
      console.log("created new user");
      // Reload the page to get the updated list
      location.assign("/questions");
    });
  });
});
