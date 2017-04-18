$(function(){
      $("#HEADER").load("/header.html"); 
      $(".jsrequired").css("background-color", "white");
      console.log("%cWhat are you doing looking at the console? My code is no secret. Go to https://www.github.com/tengwartranscriber/tengwartranscriber.github.io to see it. Incidentally, the code that just ran was $('#HEADER').load('/header.html'); $('.jsrequired').css('background-color', 'white');", "background: black; color: white; font-size: 20px");
});

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    console.log("Url parameter="+decodeURIComponent(results[1].replace(/\+/g, ' ')));
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
