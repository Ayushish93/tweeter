/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$('document').ready(function () {
  

  let $tweetdata = $('#tweet-container'); // selecting tweet-container to append new tweets
  const renderTweets = function (data) {
    // loops through tweets
    $tweetdata.empty();
    data.forEach((user) => {
      // calls createTweetElement for each tweet
      return $tweetdata.append(createTweetElement(user));
    });

  }
  

  // function to secure user input through escaping
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  
  // function to return new submitted tweet as html
  const createTweetElement = function (data) {

    return `
  <article class="tweeter-new-post">
    <header>
      <div class="tweet-contact-info">
        <span> <img src = ${data['user'].avatars}> </span>
        <span class="tweet-contact-name"> ${data['user'].name} </span>
      </div>
      <div class="tweet-id"> ${data['user'].handle} </div>
    </header>
    <article> 
      <p class="tweetdata">${escape( data['content'].text)} </p>
    </article>
    <footer>
      <div>
        <span> 10 Day ago </span>
      </div>
      <div class="footer-icons">
        <span> <i class="fa fa-flag" aria-hidden="true"></i> </span>
        <span> <i class="fa fa-heart" aria-hidden="true"></i> </span>
        <span> <i class="fa fa-retweet" aria-hidden="true"></i> </span>
      </div>
    </footer>
  </article>`
  }
  
  

 


  // ajax function to post tweet 
  $(function () {
    const $submitform = $('.submit-form');
    $submitform.on('submit', function (event) {

      event.preventDefault();
      let str = $(".submit-form").serialize();
      let counter = $('.counter'); // get counter value
      let count = Number(counter.val()); // changing it to Number 
      $('.isa_error span').text(""); // deleting errpor text to apend the new error
      if (count === 140) {
        $('.isa_error span').append("Too short, please respect our arbitrary limit of 1 - 140 characters");
        $('.isa_error').slideDown('fast');
      }
      else if (count < 0) {
        $('.isa_error span').append("Too long, please respect our arbitrary limit of 1 - 140 characters");
        $('.isa_error').slideDown('fast');
      }
      else {
        
        $.ajax({
          type: "POST",
          url: "/tweets",
          data: str,
          success: 'success',
        })
          .then(response => {
            $('#tweet-text').val(''); // erasing text from textarea
            $('.counter').val(140); // setting counter back to 140
            return loadTweets();   // loading new tweets 
            
          })
          .catch(err => {
            console.log("Error => ", err);
          });
      }

    });
    
    
  });
  
  
  

  // ajax function to get tweet
  const loadTweets = function () {
    $(function () {
      console.log('Performing ajax call...');
      $.ajax('http://localhost:8080/tweets', { method: 'GET' })
        .then(function (resultobj) {
          renderTweets(resultobj.reverse());   // calling rendertweet fun with array obj
        });
    });
  };


  $('.isa_error').hide(); // hiding error msg
  loadTweets();
  
  

});
