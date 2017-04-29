$(function(){
      $("#HEADER").load("/header.html"); 
      $(".jsrequired").css("background-color", "white");
      console.error("I never took the time to fix the two errors involving 'unslider.css', but I did take the time to write code that writes error messages explaining the error messages that I didn't take the time to fix.");
      console.error("Now I took the time to fix the errors but I didn't take the time to remove the code that writes the error messages explaining the error messages that I previously didn't take the time to fix; however I did take the time to write an error message explaining the error message explaining the error message that wasn't fixed when I wrote the first error message but was fixed by the time I wrote the second error message.");
      console.log("%cWhat are you doing looking at the console? My code is no secret. Go to https://www.github.com/tengwartranscriber/tengwartranscriber.github.io to see it. Incidentally, the code that just ran was $('#HEADER').load('/header.html'); $('.jsrequired').css('background-color', 'white');", "background: black; color: white; font-size: 20px");
      $(".secondary-header").click(function(){
        $('html, body').animate({ scrollTop: 0 }, 'fast');
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
