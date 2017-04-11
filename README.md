# Check out the published website at [https://tengwartranscriber.github.io](https://tengwartranscriber.github.io)
## Interesting HTML and Javascript (and some CSS):
### The header
The header is the same on all the pages, so that if the header has to be changed you don't have to go to all 15 files to change it. When the page loads, the content from `header.html` is loaded into the `HEADER` div:
```html
<!--at the top of <body> in all the files!-->
<script src="/onload.js"></script>
<div id="HEADER"></div>
```
```js
//in onload.js
$("#HEADER").load("/header.html");
```
### Javascript disabled
If Javascript is disabled, many of the features will not work. The website warns you about it. Below the `<div id="HEADER">` element is a noscript element with a simplified menu containing only the pages that work without Javascript and a big red warning:
```html
<noscript>
  <a href="https://tengwartranscriber.github.io/abouttengwar.html" class="btn">About Tengwar</a>
  <a href="https://tengwartranscriber.github.io/aboutdwarvish.html" class="btn">About Dwarvish Runes</a>
  <a href="https://tengwartranscriber.github.io/welshpronunciation.html" class="btn">Welsh Pronunciation</a>
  <a href="/feedback.html" class="btn">Feedback</a>
  <a href="/tengwarfeanorregular.ttf" id="ElvishButton" class="btn" >Tengwar Font Download</a>
  <a href="/dwarvishregular.ttf" id="DwarvishButton" class="btn">Dwarvish Font Download</a>
  <a href="https://github.com/TengwarTranscriber/TengwarTranscriber.github.io/" class="btn">View Source</a>
  <a href="https://github.com/TengwarTranscriber/TengwarTranscriber.github.io/zipball/master" class="btn">Download Source</a></div>
  <div style="background-color:#ff0000;color:#ffffff;text-align:center;">
  <h1>Sorry</h1>
  <h2>Your browser does not have Javascript enabled. Many of the functions on this website (highlighted in red) require Javascript to function. Please enable Javascript for full functionality</h2>
</noscript>
```
Features that require Javascript are highlighted in red. In the stylesheet, elements with class `jsrequired` have their background color set to red; if Javascript is disabled, it stays that way:
```css
.jsrequired { 
  background-color: #ff0000;
}
```
But in `onload.js`, the background-color for `jsrequired` is set to white, so if Javascript is enabled the elements end up normally:
```js
$(".jsrequired").css("background-color", "white");
```
### URL Parameters
If you give the elvish or dwarvish transcribers the URL parameter `text=hello world`, the text "hello world" will load in the output field, a blue alert appears above the output field saying `hello world transcribes to:`, and the webpage scrolls down to show only the output. The code looks like this:
```html
<!--in index.html and dwarvish.html above the output field!-->
<div class="alert" id="alert" style="display:none;font-family:Times New Roman;">
  <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
  <strong id="alerttext" style="font-family:Segoe UI;">Here's you transription:</strong>
</div><!--/alert!-->
<script>
var Input = document.getElementById('Input');
var Output = document.getElementById('Output');
var alert = document.getElementById("alert");
var alerttext = document.getElementById("alerttext");

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

window.onload = function() {
  if( getUrlParameter("text") ){//if the url parameter "text" is not null
    Input.value = getUrlParameter("text")//set the input field text to the value of the url parameter
    Output.value = convertToTengwar(Input.value)//set the output field text to the tengwar equivalent
    alert.style.display='block';//show the alert
    alerttext.innerHTML = '"'+getUrlParameter("text")+'"'+" transcribes to:"//set the alert text
    alert.scrollIntoView();//scroll down
  }
}
</script>
```
### Save transcription as image
There are links below the output fields in `dwarvish.html` and `index.html` to save the transcription as image. They work using a javascript library called [html2canvas](https://html2canvas.hertzen.com/). When the link is clicked, html2canvas converts the text field to a canvas, the canvas is converted into a data url, and the data url is opened in a new window:
```html
<!--in index.html and dwarvish.html below the output field!-->
<script type="text/javascript" src="html2canvas.js"></script>
<div><a style="cursor:pointer;" onclick='html2canvas(document.getElementById("Output"), {onrendered: 
  function(canvas) {
    window.open(canvas.toDataURL("image/png"), "_blank");
  }
});'>Download transcription as image</a>. If your browser blocks popups this might not work.</div>
```
### Save transcription as RTF
There are also links below the output fields in `dwarvish.html` and `index.html` to save the transcription as a rich text file. When the links are clicked, Javascript functions create a new invisible `<a>` element at the bottom of the page that links to a data url and has a download attribute, then clicks that element and deletes it:
```html
<!--in index.html and dwarvish.html below the output field!-->
<div><a style="cursor:pointer;" onclick="saveOutputAsText();">Download transcription as rich text</a>. You must install the font file from <a href="/more.html?font=elvish" target="_blank">here</a> for the file to display correctly</div>
```
```js
var Output = document.getElementById('Output');
function saveOutputAsText() {//function that gets run when the Save As Rich Text link is clicked
  download("transcription.rtf", convertHtmlToRtf(Output.value))//download the contents of the output field as transcription.rtf
}
      
function convertHtmlToRtf(html) {//convert text to rtf
  if (!(typeof html === "string" && html)) {//if the value isn't a string or is empty
    return null;//return null and exit
  }
  var richText = html;
  richText ="{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Tengwar Feanor;}}\n" + richText +"\n}";//format the text, setting the font to Tengwar Feanor
  return richText;//return formatted text
}
      
function download(filename, text) {//function to download a text file
  var element = document.createElement('a');//create a new <a> element
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));//set the element link to a dataurl containing the text
  element.setAttribute('download', filename);//set the download attribute
  element.style.display = 'none';//make the element invisible
  document.body.appendChild(element);//add the element to the body
  element.click();//click the element (starting the download)
  document.body.removeChild(element);//hide the download
}
```
# Credits
## Fonts were created with [Birdfont](https://birdfont.org/), an awesome free font editor by Johan Mattsson
## Glyphs for the Tengwar Feanor font were originally from the [Tengwar Annatar](http://www.dafont.com/tengwar-annatar.font) font by Johan Winge
## The Tengwar mode used is based on the one in [this great android app](https://play.google.com/store/apps/details?id=com.mithlond.tengwar.android)
## Transcription image download using the [html2canvas](https://html2canvas.hertzen.com/) javascript library by [Niklas Von Hertzen](http://hertzen.com/)
## Site hosted on [Github Pages](https://pages.github.com/)
## Site theme is [Cayman](https://github.com/jasonlong/cayman-theme) theme by [Jason Long](https://twitter.com/jasonlong)
## Much code instruction obtained from [Stack Overflow](http://stackoverflow.com/) and [w3schools](https://www.w3schools.com/)
## Feedback form by [Formspree](https://formspree.io/); you should really check it out
## Thanks to J.R.R. Tolkien for creating Middle-Earth and sharing it with us through his books, which have given me many hours of enjoyment. There will never be a greater fictional universe.
