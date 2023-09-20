var urlParams = new URLSearchParams(window.location.search);
let quick_load = urlParams.get('rejected');

$( document ).ready(function() {
  var default_delay = 1500.0;
  var delay_spacing = 2000.0;
  var body_delay = 3000.0;
  var page_fade_delay = 600.0;
  var pub_fade_dealy = 600.0;
  if (quick_load) {
    delay_spacing = 0.0;
    body_delay = 0.0;
    default_delay = 0;
    page_fade_delay = 0;
    pub_fade_dealy = 0;
  }
  var cumulative_delay = default_delay;

  // Fade each element in div id=elem, adding `delaytime` after each element
  function fadeBody(body_elem, delaytime, reset_delay) {
    if (reset_delay) {
      cumulative_delay = 0;
    }
    $.each($(body_elem).find(".fade"), function(idx, elem) {
      $(this).delay(cumulative_delay).fadeTo(delaytime, 1.0, "linear");
      cumulative_delay += delay_spacing;
    });
  }

  function initial_load() {
    // Load the header
    cumulative_delay = default_delay;
    $.each($("#fadecontainer").find(".fade"), function(idx, elem) {
      // After culumative_delay, fade in over default_delay
      $(this).delay(cumulative_delay).fadeTo(default_delay, 1.0, "swing");
      cumulative_delay += default_delay;
    });
    // Load the about text
    $("#body_about").load("about.html", function() { fadeBody("#body_about", body_delay, false);})
  }

  function loadAbout() {
    $("#body_about").load("about.html", function() {
      $("#body_pubs").empty();
      $("#body_teaching").empty();
      $("#body").fadeTo(0.0, 1.0, "linear");
      fadeBody("#body_about", body_delay, true);
    });
  }

  function loadTeaching() {
    $("#body_teaching").load("teaching.html", function() {
      $("#body_pubs").empty();
      $("#body_about").empty();
      $("#body").fadeTo(0.0, 1.0, "linear");
      fadeBody("#body_teaching", body_delay, true);
    });
  }

  function loadPublications() {
      // Fade out existing html
      $("#body").fadeTo(page_fade_delay, 0.0, "linear", function() {
      $.getJSON("data/papers.json", function(data) {
        for (paper of data.papers) {
          var title = `<p class="pubtitle"><b><a href=${paper.paper}>${paper.title}</a></b></p>`;
          var author = `${paper.author} (${paper.year})`;
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
        $("#body").fadeTo(0.0, 1.0, "linear");
        fadeBody("#body_pubs", pub_fade_dealy, true);
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
