$(function(){
  $("#HEADER").load("/header.html");
  $("#ALERTS").load("/alerts.html");
  $(".jsrequired").css("background-color", "white");
  console.log("%cTo see source code, go to https://www.github.com/tengwartranscriber/tengwartranscriber.github.io to see it. Incidentally, the code that just ran was $('#HEADER').load('/header.html'); $('.jsrequired').css('background-color', 'white');", "background: black; color: white; font-size: 20px");
  $(".secondary-header").click(function(){
    $('html, body').animate({ scrollTop: 0 }, 'fast');
  });
  window.applicationCache.addEventListener("error", function(e) {
    alert("You seem to be offline.\nAny pages on this site you have previously visited from this browser should still load.\nHowever, depending on your browser, they may render incorrectly.");
  });
});

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    console.log("Url parameter="+decodeURIComponent(results[1].replace(/\+/g, ' ')));
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function setCookie(cname,cvalue,exdays) {
    alert("Cookie:"+ cname + " Set to:" + cvalue);
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            alert("Cookie:"+ cname + " read as:" + c.substring(name.length, c.length));
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
