/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$('document').ready(function(){



// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

let $tweetdata = $('#tweet-container');
const renderTweets = function(data) {
  // loops through tweets
  data.forEach((user) => {
  // calls createTweetElement for each tweet
    return $tweetdata.append(createTweetElement(user));
  });
  
} 

const createTweetElement = function(data) {
 
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


  
renderTweets(data);


// ajax post request
$(function() {
  const $submitform = $('.submit-form');
  $submitform.on('submit', function (event) {

    event.preventDefault();
    var str = $( ".submit-form" ).serialize();
   
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: str,
      success: 'success',
      
      
    })
    .then(response => {
      console.log(response);
    })
  });
});

});
