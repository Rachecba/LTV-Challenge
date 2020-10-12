$(document).ready(function () {
  $(".go-btn").click(function () {
    var email = $("#email-desktop").val() || $("#email-mobile").val();

    var settings = {
      cache: false,
      dataType: "jsonp",
      async: true,
      crossOrigin: true,
      crossDomain: true, 
      url:
        "https://ltv-data-api.herokuapp.com/api/v1/records.json?email=" + email,
      method: "GET",
    };

    $.ajax(settings)
      .done(function (response) {
        if (response === "[]") {
          alert("No email was found. Please try again.");
          $(".email-input").focus();
          $(".label").text("Please add a valid email address");
          $(".label").css({
            color: "#DC0015",
            "letter-spacing": "0",
            "font-weight": "lighter !important",
            display: "block",
          });

          $(".email-input").attr(
            "style",
            "border: 2px solid #dc0015 !important"
          );
        } else {
          $(".label").text("EMAIL");
          $(".label").css({
            color: "#9B9B9B",
            "letter-spacing": "2px",
            "font-weight": "bold",
            "line-height": "18px",
          });

          $(".email-input").attr(
            "style",
            "border: 2px solid #F6BC25 !important"
          );

          $(".email-input-results").focus();

          var parsed_data = JSON.parse(response);

          // Hide index elements and display results elements
          $(".results").attr("style", "display: block !important");
          $(".index").css("display", "none");

          //Complete card information with the email.
          $(".name")
            .find("h1")
            .text(parsed_data.first_name + " " + parsed_data.last_name);
          $(".name").find("p").text(parsed_data.description);

          $(".address").find("p").text(parsed_data.address);
          $(".email").find("p").text(parsed_data.email);

          var phone_numbers_array = parsed_data.phone_numbers;

          for (var i = 0; i < phone_numbers_array.length; i++) {
            var p = $("<p></p>").text(phone_numbers_array[i]);
            $(".phone").append(p);
          }

          var relatives_array = parsed_data.relatives;
          console.log(relatives_array);

          for (var i = 0; i < relatives_array.length; i++) {
            var p = $("<p></p>").text(relatives_array[i]);
            $(".relatives").append(p);
          }
        }
      })
      .fail(function () {
        console.log("error");
      });
  });

  $(".go-btn-results").click(function () {
    var email = $("#email-results-desktop").val() || $("#email-results-mobile").val();

    var settings = {
      cache: false,
      dataType: "jsonp",
      async: true,
      crossDomain: true,
      crossOrigin: true,
      url:
        "https://ltv-data-api.herokuapp.com/api/v1/records.json?email=" + email,
      method: "GET",
    };

    $.ajax(settings)
      .done(function (response) {
        if (response === "[]") {
          alert("No email was found. Please try again.");
          $(".email-input-results").focus();
          $(".label").text("Please add a valid email address");
          $(".label").css({
            color: "#DC0015",
            "letter-spacing": "0",
            "font-weight": "lighter !important",
            display: "block",
          });

          $(".email-input-results").attr(
            "style",
            "border: 2px solid #dc0015 !important"
          );
        } else {
          $(".label").text("EMAIL");
          $(".label").css({
            color: "#9B9B9B",
            "letter-spacing": "2px",
            "font-weight": "bold",
            "line-height": "18px",
          });

          $(".email-input-results").attr(
            "style",
            "border: 2px solid #F6BC25 !important"
          );

          var parsed_data = JSON.parse(response);

          // Hide index elements and display results elements
          $(".results").attr("style", "display: block !important");
          $(".index").css("display", "none");

          //Complete card information with the email.
          $(".name")
            .find("h1")
            .text(parsed_data.first_name + " " + parsed_data.last_name);
          $(".name").find("p").text(parsed_data.description);

          $(".address").find("p").text(parsed_data.address);
          $(".email").find("p").text(parsed_data.email);

          //delete current info from div
          var div_relatives = $(".relatives p");

          for (var i = 0; i < div_relatives.length; i++) {
            div_relatives.eq(i).remove();
          }

          //add new elements
          var relatives_array = parsed_data.relatives;

          for (var j = 0; j < relatives_array.length; j++) {
            var p = $("<p></p>").text(relatives_array[j]);
            $(".relatives").append(p);
          }

          //delete current info from div
          var div_phone_numbers = $(".phone p");

          for (var i = 0; i < div_phone_numbers.length; i++) {
            div_phone_numbers.eq(i).remove();
          }

          //add new elements
          var phone_numbers_array = parsed_data.phone_numbers;

          for (var i = 0; i < phone_numbers_array.length; i++) {
            var p = $("<p></p>").text(phone_numbers_array[i]);
            $(".phone").append(p);
          }
        }
      })
      .fail(function () {
        console.log("error");
      });
  });

  //INPUT

  $(".email-input").focusout(function () {
    var text = $("#email-desktop").val() || $("#email-mobile").val();

    if (text) {
      $(".label").css("display", "none");
    } else {
      $(".label").css("display", "block");
    }
  });

  $(".email-input").focus(function () {
    $(".label").css("display", "block");
  });

  $(".email-input-results").focusout(function () {
    var text = $("#email-results-desktop").val() || $("#email-results-mobile").val();

    if (text) {
      $(".label").css("display", "none");
    } else {
      $(".label").css("display", "block");
    }
  });

  $(".email-input-results").focus(function () {
    $(".label").css("display", "block");
  });

});
