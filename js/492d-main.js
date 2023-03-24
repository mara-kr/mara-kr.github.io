$( document ).ready(function() {
  // Fades in an element after a specified delay
  function showAfter(delay, el) {
    el.classList.add("hide");
    setTimeout(function() { el.classList.remove("hide") }, delay);
  }

  var default_delay = 50.0;
  // var default_delay = 1000.0;
  // var page_fade_delay = 200.0;
  var delay = default_delay;

  function fadeElem(elem) {
    if (elem.closest("#body").length) {
      elem.delay(delay).fadeTo(delay, 1.0, "swing");
    } else {
      elem.delay(delay).fadeTo(default_delay, 1.0, "linear"); // Fade to 1.0 opacity over delay
    }
    delay += default_delay;
  }

  function fadeBody() {
    delay = default_delay;
    $.each($("#body").find(".fade"), function(idx, elem) {
      fadeElem($(this));
    });
  }

  $("#body").load("overview.html", function() {
		  $.each($( ".fade"), function(idx, elem) { fadeElem($(this)); })
		  delay = default_delay;
		  })

  // Route between pages
  $("#overview").click(function() {
    $("#body").fadeTo(page_fade_delay, 0.0, "linear", function() {
      $("#body").load("overview.html", function() {
        $("#body").fadeTo(0.0, 1.0, "linear"); // Opacity -> 1
        fadeBody();
      });
    })
  });
  $("#schedule").click(function() { ; }); // TODO: Load schedule
  $("#syllabus").click(function() { ; }); // TODO: Load syllabus
});
