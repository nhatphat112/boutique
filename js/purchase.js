$(document).ready(function () {
  $('#selectedRating').text(1);
  $("#selectedRating").val(1)
  $('.rating-star').click(function () {
    $(this).addClass('active');
    $(this).prevAll('.rating-star').addClass('active');
    $(this).nextAll('.rating-star').removeClass('active');
    var selectedRating = $(this).index() + 1;
    $('#selectedRating').text(selectedRating);
    $('#selectedRating').val(selectedRating);
  });
  $("#btn-submit").click(function () {
    var text = $("#reviewText").val()
    var star = $("#selectedRating").val()
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/purchase/rate",
      data: {
        content: text,
        starNumber: parseInt(star)
      }
    })
      .done(function () {
        $('#reviewForm').toggle()
        $("#reviewText").val("")
        $(".rating-star").removeClass('active');
        $('#selectedRating').text(0);
        $("#selectedRating").val(0)
        alert("Review succesful")

      });
  })
});