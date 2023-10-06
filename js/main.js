var urlParams = new URLSearchParams(window.location.search);
let quick_load = urlParams.get('rejected');

$( document ).ready(function() {
  var default_delay = 1500.0;
  var body_delay = 3000.0;
  var page_fade_delay = 600.0;
  var pub_fade_delay = 1000.0;
  var teaching_delay = 1500.0;
  if (quick_load) {
    body_delay = 0.0;
    default_delay = 0;
    page_fade_delay = 0;
    pub_fade_delay = 0;
    teaching_delay = 0;
  }
  var cumulative_delay = default_delay;

  // Fade each element in div id=elem, adding `delaytime` after each element
  function fadeBody(body_elem, delaytime, reset_delay) {
    if (reset_delay) {
      cumulative_delay = 0;
    }
    $.each($(body_elem).find(".fade"), function(idx, elem) {
      $(this).delay(cumulative_delay).fadeTo(delaytime, 1.0, "linear");
      cumulative_delay += delaytime * .25;
      // cumulative_delay += (delaytime == body_delay) ? d: d;
    });
  }

  function initial_load() {
    // Load the header
    cumulative_delay = default_delay / 2;
    $.each($("#outerContainer").find(".fade"), function(idx, elem) {
      // After culumative_delay, fade in over default_delay
      $(this).delay(cumulative_delay).fadeTo(default_delay / 2, 1.0, "swing");
      cumulative_delay += default_delay / 2;
    });
    // Load the about text
    $("#body_about").load("about.html", function() { fadeBody("#body_about", body_delay, false);})
    $("#about").addClass('underline');
  }

  function loadAbout() {
    $("#body_about").load("about.html", function() {
      $("#body_pubs").empty();
      $("#body_teaching").empty();
      $("#research").removeClass('underline');
      $("#teaching").removeClass('underline');
      $("#body").fadeTo(0.0, 1.0, "linear");
      fadeBody("#body_about", body_delay, true);
      $("#about").addClass('underline');
    });
  }

  function loadTeaching() {
    $("#body_teaching").load("teaching.html", function() {
      $("#body_about").empty();
      $("#body_pubs").empty();
      $("#research").removeClass('underline');
      $("#about").removeClass('underline');
      $("#body").fadeTo(0.0, 1.0, "linear");
      fadeBody("#body_teaching", teaching_delay, true);
      $("#teaching").addClass('underline');
    });
  }

  function loadPublications() {
      // Fade out existing html
      $("#body").fadeTo(page_fade_delay, 0.0, "linear", function() {
      $.getJSON("data/papers.json", function(data) {
        for (paper of data.papers) {
          var title = `<p class="pubtitle"><b><a href=${paper.paper}>${paper.title}</a></b></p>`;
          var author = `<p>${paper.author} (${paper.year})</p>`;
          var venue = `<p>${paper.venue}</p>`;
          var links = "";
          var link_entries = Object.entries(paper.links);
          var num_entries = link_entries.length
          for (let i = 0; i < num_entries; i++) {
            [link, dest] = link_entries[i];
            links += `<a href=${dest}>${link}</a>`
            if (i < num_entries - 1) { links += " · ";}
          }
          links = `<p>${links}</p>`
          $("#body_pubs").append(
            $("<div/>", {class : "pub fade"}).append(title, author, venue, links)
          )
        }
        $("#body_about").empty();
        $("#body_teaching").empty();
        $("#about").removeClass('underline');
        $("#teaching").removeClass('underline');
        $("#body").fadeTo(0.0, 1.0, "linear");
        fadeBody("#body_pubs", pub_fade_delay, true);
        $("#research").addClass('underline');
      });
    })
  }

  initial_load()

  // Route between pages
  $("#about").click(function() {
    $("#body").fadeTo(page_fade_delay, 0.0, "linear", function() { loadAbout();})
  });
  $("#research").click(function() { loadPublications(); });
  $("#teaching").click(function() {
    $("#body").fadeTo(page_fade_delay, 0.0, "linear", function() { loadTeaching();})
  });
});
