$(document).ready(function() {
  // Animate new quote button
  $("#new-quote").on({
    mouseover: function() {
      $("#spin").addClass("fa-spin");
    },
    mouseout: function() {
      $("#spin").removeClass("fa-spin");
    }
  });
  
  // Tooltip
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
  
  // Call new quote
  $("#new-quote").on("click", function() {
    callQuote();
  });
  
  // Using NET Bible Web Service API to generate quotes
  function callQuote() {
    // API
    var url = "https://labs.bible.org/api/?passage=random&type=json&callback=?";
    // "containers" variables
    var quote = "";
    var path = "";

    // AJAX Call
    $.getJSON(url, function(data) {
      // Getting verses text content.
      quote = data[0].text;
      // Getting Book, Chapter and verses references.
      path = "- " + data[0].bookname + " " + data[0].chapter + " : " + data[0].verse;
      // Using .slice to remove incovenient tags at the end of the quote
      quote = quote.slice(0, quote.length -87);
      // Remove unicode character among the verses.
      quote = quote.replace(/\W+\d+/giu, "");

      // Inject data from api to html
      $("#quote").text(quote);
      $("#path").text(path);
      
      // Tweet Quote
      $("#tweet").on("click", function() {
        var url = "https://twitter.com/intent/tweet?&text=";
        window.open(url + encodeURIComponent(quote + " " + path));
      });
      
    });
  }
  
});