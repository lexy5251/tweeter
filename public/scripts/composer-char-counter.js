$(document).ready(function() {
    $("textarea").keyup(function() {
      var input = this.value;
      var remaining = 140 - input.length;
      $(".counter").text(remaining);
      if (remaining <= 0) {
        $(".counter").css("color","red");

      } else {
        $(".counter").css("color","black");
      }
    });
});
