$(document).ready(function() {
    $('#check-all').click(function() {
        console.log("hello")
        $('.check-item').prop('checked', this.checked);
    });
});