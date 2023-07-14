$(document).ready(function() {
  $('.rating-star').click(function() {
    $(this).addClass('active');
    $(this).prevAll('.rating-star').addClass('active');
    $(this).nextAll('.rating-star').removeClass('active');

    var selectedRating = $(this).index() + 1;
    $('#selectedRating').text(selectedRating);
  });
});