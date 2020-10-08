// Add keyup listener on textarea and updating counter value with the length of textarea
$('document').ready(function(){
  let count = 0;
  $("#tweet-text").keyup(function(data) {
    let comment = $("#tweet-text").val();
    count = 140 - comment.length;
    $(".counter").val(count);
    if (count < 0) {
      $(".counter").addClass("red");
    }
    else {
      $(".counter").removeClass("red ");
      $('.isa_error').slideUp('fast');
      
    }
    
  });
});
