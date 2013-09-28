$(function() {

  var countries = [];
  var as = [];


  // Checkboxes
  $(".country-checkbox").change(function() {
    var temp = $(".country-checkbox").filter(":checked");
    countries = [];
    $.each(temp, function(index, country) {
      countries.push($(country).attr("id"));
    });
    console.log(countries);
  });

  $(".as-checkbox").change(function() {
    var temp = $(".as-checkbox").filter(":checked");
    as = [];
    $.each(temp, function(index, as_name) {
      as.push($(as_name).attr("id"));
    });
    console.log(as);
  });


// JSON download
  $("#json-download-button").click(function() {
    var url = buildUrl("json");
    window.location.href = url;
  });

  // Update button
  $("#update-button").click(function() {
    var url = buildUrl("json");
    var r = [], j = -1;

    $('#myModal').modal('show');
    $.getJSON(url, function(d) {
      $.each(d["ips"], function(index, element) {
        r[++j] = '<tr><td>';
        r[++j] = element.ip;
        r[++j] = '</td><td>';
        r[++j] = element.country_code;
        r[++j] = '</td><td>';
        r[++j] = element.as_name;
        r[++j] = '</td><td>';
        r[++j] = element.as_code;
        r[++j] = '</td></tr>';
      });
      $("#ips-table").html(r.join(''));
      $('#myModal').modal('hide');
    });
  });

  // Helpers
  function buildUrl(mime) {
    var url = "/ips?" + mime + buildCountriesGETString();
    return url;
  }

  // Build countries GET string
  function buildCountriesGETString() {
    var string = "";
    $.each(countries, function(index, country) {
      string += "&countries=" + country;
    });
    console.log(string);
    return string;
  }

});