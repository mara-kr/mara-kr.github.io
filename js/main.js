$( document ).ready(function() {
  // Fades in an element after a specified delay
  function showAfter(delay, el) {
    el.classList.add("hide");
    setTimeout(function() { el.classList.remove("hide") }, delay);
  }

  // var default_delay = 50.0;
  var default_delay = 1000.0;
  var page_fade_delay = 600.0;
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

  function loadPublications() {
    $("#body").fadeTo(page_fade_delay, 0.0, "linear", function() {
      $("#body").html("");
      $.getJSON("data/papers.json", function(data) {
        $("#body").fadeTo(0.0, 1.0, "linear");
        for (paper of data.papers) {
          var title = `<h3><a href=${paper.paper}>${paper.title}</a></h3>`;
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
          $("#body").append(
          $("<div/>", {class : "pub fade"}).append(title, author, venue, links)
            ).append(function() { fadeBody();})
        }
      })
    });
  }

  $("#body").load("about.html", function() {
		  $.each($( ".fade"), function(idx, elem) { fadeElem($(this)); })
		  delay = default_delay;
		  })

  // Route between pages
  $("#about").click(function() {
    $("#body").fadeTo(page_fade_delay, 0.0, "linear", function() {
      $("#body").load("about.html", function() {
        $("#body").fadeTo(0.0, 1.0, "linear"); // Opacity -> 1
        fadeBody();
      });
    })
  });
  $("#research").click(function() { loadPublications(); });
});
