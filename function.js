'use strict';

document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({"active": true, "windowId": chrome.windows.WINDOW_ID_CURRENT},
    function(tabs){
        var url = tabs[0].url;
        var testUrl = "reddit.com";
        var el = document.createElement("a");
        el.href = url;
        var subreddit = url.split("/");
      if (url.indexOf(testUrl) !== -1 && subreddit[3] === 'r') {
            document.getElementById("subreddit").innerHTML=(subreddit[4]);
            document.getElementById("redditurl").innerHTML=("working...");
            reddit(subreddit[4]);
        } else {
           document.getElementById("redditurl").innerHTML=("This is not a subreddit");
        }     
    }
);
});

function reddit(subreddit){
   const R = new window.snoowrap({
  userAgent: '',
  clientId: '',
  clientSecret: '',
  username: '',
  password: ''});
  
  function doThingsWithTitles(titles) {
    const sentiment = new window.Sentimood();
    
    var i = 0;
    var analyze = [];
    for (; i < titles.length; i++) { 
        analyze.push(sentiment.analyze(titles[i]).score);
        
    }
    const average = arr => arr.reduce((sume, el) => sume + el, 0) / arr.length;
    var total_sentiment = average(analyze);
    document.getElementById("redditurl").innerHTML=(total_sentiment);
    
    if (total_sentiment <= -0.5){
    document.getElementById("colour_box").style.backgroundColor = 'red';
    }else if (total_sentiment > -0.5 && total_sentiment < -0.1) {
    document.getElementById("colour_box").style.backgroundColor = 'orange';    
    }else if (total_sentiment > -0.1 && total_sentiment < 0.1) {
    document.getElementById("colour_box").style.backgroundColor = 'grey';    
    }else if (total_sentiment > 0.1 && total_sentiment < 0.5) {
    document.getElementById("colour_box").style.backgroundColor = 'PaleGreen';    
    }else if (total_sentiment >= 0.5) {
    document.getElementById("colour_box").style.backgroundColor = 'green';    
    }
    };
  
  R.getHot(subreddit).map(post => post.title).then(doThingsWithTitles);
    };