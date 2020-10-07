/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$('document').ready(function () {


  let $tweetdata = $('#tweet-container');
  const renderTweets = function (data) {
    // loops through tweets
    data.forEach((user) => {
      // calls createTweetElement for each tweet
      return $tweetdata.append(createTweetElement(user));
    });

  }

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
    <article > 
      <p class="tweetdata">${data['content'].text} </p>
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



  //renderTweets(data);


  // ajax function to post tweet 
  $(function () {
    const $submitform = $('.submit-form');
    $submitform.on('submit', function (event) {

      event.preventDefault();
      var str = $(".submit-form").serialize();
      let counter = $('.counter'); // get counter value
      let count = Number(counter.val()); // changing it to Number 

      if (count === 140) {
        alert("You can not submit empty tweet");
      }
      else if (count < 0) {
        alert("You are exceeding the limit, max limit is 140");
      }
      else {
        $.ajax({
          type: "POST",
          url: "/tweets",
          data: str,
          success: 'success',
        })
          .then(response => {
            console.log("this is response ", response);

            location.reload();   // reloading new tweets
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
          console.log('Success: ', resultobj);
          renderTweets(resultobj.reverse());   // calling rendertweet fun with array obj
        });
    });
  };

  loadTweets();

  

});
