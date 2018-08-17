$(document).ready(function() {
  function renderTweets(response) {
    response.sort(function(a, b) {
      if (a.created_at > b.created_at) {
        return -1;
      } else if (a.created_at < b.created_at) {
        return 1;
      } else {
        return a.created_at - b.created_at;
      }
    });
    let result = response.sort();
    for (let i = 0; i < result.length; i++) {
      let $tweet = createTweetElement(result[i]);
      $(".tweets-container").append($tweet);
    }
  };


  // textarea validation
  $(".submit-button").click(function(e) {
    e.preventDefault();
    var message = $("#content").val();

    if (message.length === 0) {
      $(".error-p1").slideToggle("slow").css("display", "inline-block");
    } else if (message.length > 140) {
      $(".error-p2").slideToggle("slow").css("display", "inline-block");
    } else {
      postNewTweet();
    }
  });


  //get tweets from the page
  function postNewTweet() {
    $.ajax({
      type: "POST",
      url: "/tweets/",
      data: $(".form-content").serialize()
    }).done(() => {
      console.log("submit-button");
      $("article").remove();
      loadTweets();
    });
  };

  loadTweets();

  function loadTweets() {
    console.log("Button clicked, performing ajax call...");
    $.ajax({
      url: "/tweets/",
      method: "GET"
    }).then(response => {
      renderTweets(response);
    });
  };



  function escape(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  function createTweetElement(tweet) {
    let $avatars = tweet.user.avatars.small;
    let $name = tweet.user.name;
    let $handle = tweet.user.handle;
    let $text = tweet.content.text;
    var dateCreated = new Date(tweet.created_at);
    var currentDate = new Date();
    var dateDelta = parseInt(
      (Date.parse(currentDate) - Date.parse(dateCreated)) /
        (1000 * 60 * 60 * 24)
    );

    const $tweet = `<article>
      <header>
        <div class="card-header">
          <img src="${escape($avatars)}" alt="" class="head-portrait"/>
          <div class="card-content">
            <p class="card-title">${escape($name)}</p>
            <p class="right-corner">${escape($handle)}</p>
          </div>
        </div>
      </header>
      <p class="margin-p">${escape($text)}</p>
      <footer>
        <p class="margin-p">${escape(dateDelta)} days ago</p>
      </footer>
    </article>
    `;
    return $tweet;
  };


//Toggle new tweet
  $(".nav-button").click(function(){
    $(".new-tweet").slideToggle("slow",function(){
       $("#content").focus();
    });
  });
});
