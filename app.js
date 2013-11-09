  $(document).ready(function() {
  $('#tag').focus();
  $('#tag').keydown(function(e){
      if (e.keyCode == 13) {
        submit();
      }
    });
$('#loading').hide();
// $('.paginate').hide();
$('#container').hide().fadeIn(2000);

}); // End of document ready  

// Press Enter prompt
// if (tag.length > 3 ) {
//   	$('#press-enter').hide();
//         } 
//     else {
//      $('#press-enter').fadeIn();
//         };


function submit(){
// Generic setup
$('#container').animate({'padding-top':'50px'});
$('#tag').blur();
$('#loading').show();

// Remove previous search results
 $(".pics").remove();

// Storing user input
var tag = document.getElementById("tag").value;

// INSTAGRAM
var instagramKey = "259340442.1fb234f.bde60c19506746cfbc82b20953dd222d"
var fetchInstagram = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?access_token=" + instagramKey + "&count=10" + "&callback=?";

function getInstagram (){
working=true
$.ajax({
  dataType: "jsonp",
  url: fetchInstagram, 
  success: instagram 
}) // end of Ajax


} // end of getInstagram

getInstagram ()

function instagram (instagram) {
	for (i=0; i < instagram.data.length ; i++) {
	var instaImg = instagram.data[i].images.standard_resolution.url;
	var instaLink = instagram.data[i].link;
	var instagramImage = "<div class='pics'><a href=" + instaLink + " " + "target='_blank'><img src=" + instaImg + "></a></div>";
	$("#images").append(instagramImage).hide().delay('2000').fadeIn('slow');

} // end of for
 var next = instagram.pagination.next_max_tag_id
 console.log(next)
 working=false

function nearBottomOfPage() {
return $(window).scrollTop() > $(document).height() - $(window).height() - 200;
} 

  $(window).scroll(function() {
  if (working) {
      return;
    }     

 // if scroll count = 5  -- > // $(window).unbind('scroll');


var getMoreInstagram = function() {
var nextMaxId = next
var moreInstagramString = fetchInstagram + '&max_tag_id=' + nextMaxId;

 return moreInstagramString;
}

var newInstagramString = getMoreInstagram()
// console.log(newInstagramString);


if(nearBottomOfPage()) {
  working=true;
$.ajax({
  dataType: "jsonp",
  url: newInstagramString,
  success: function (instagram) {
	for (i=0; i < instagram.data.length ; i++) {
	var instaImg = instagram.data[i].images.standard_resolution.url;
	var instaLink = instagram.data[i].link;
	var instagramImage = "<div class='pics'><a href=" + instaLink + " " + "target='_blank'><img src=" + instaImg + "></a></div>";
	$("#images").append(instagramImage).delay('2000').fadeIn('slow');

} // end of for loop

 next = instagram.pagination.next_max_tag_id
 console.log(next)
 working=false;


} // End of second Instagram function



}); // end of Ajax
}
  
}); // end of window

} // End of Instagram function

console.log(fetchInstagram);

// FLICKR
var flickrKey = "f7a9edaaeec15c4bf0055f74d5105a6d"
var flickrPageNumber = 1

 
var buildFlickr = function() {
var flickrString = "http://api.flickr.com/services/rest/?api_key=" + flickrKey + "&format=json&jsoncallback=?&tags=" + tag + "&per_page=10&page=" + flickrPageNumber + "&method=flickr.photos.search";

return flickrString;
}

var fetchFlickr = buildFlickr()



function getFlickr (){
  working=true;
$.ajax({
  dataType: "jsonp",
  url: fetchFlickr, 
	success: flickr
}); // end of Ajax
} // end of getFlickr

getFlickr ()

function flickr (flickr) {
  //build the url of the Flickr photo
  	for (f=0; f < flickr.photos.photo.length ; f++) {
    var flickrImg = 'http://farm' + flickr.photos.photo[f].farm + '.static.flickr.com/' + flickr.photos.photo[f].server + '/' + flickr.photos.photo[f].id + '_' + flickr.photos.photo[f].secret + '_z.jpg'
    var flickrLinks = "http://www.flickr.com/photos/" + flickr.photos.photo[f].owner + "/" + flickr.photos.photo[f].id
    var flickrImage = "<div class='pics'><a href=" + flickrLinks + " " + "target='_blank'><img src=" + flickrImg + "></a></div>";
    $("#images").append(flickrImage).hide().delay('2000').fadeIn('slow');

}// end of for

	console.log(fetchFlickr)
working=false;
var pageNumber=1


function nearBottomOfPage() {
return $(window).scrollTop() > $(document).height() - $(window).height() - 100;
} 

  $(window).scroll(function() {
  if (working) {
      return;
    } 

  var nextFlickrPageNumber = (flickrPageNumber + pageNumber);
	var getMoreFlickr = "http://api.flickr.com/services/rest/?api_key=" + flickrKey + "&format=json&jsoncallback=?&tags=" + tag + "&per_page=10&page=" + nextFlickrPageNumber + "&method=flickr.photos.search";

 
 // function that returns a string --> log


if(nearBottomOfPage()) {
  working=true;
	$.ajax({
  	dataType: "jsonp",
 	url: getMoreFlickr, 
	success: function (flickr){
	for (f=0; f < flickr.photos.photo.length ; f++) {
    var flickrImg = 'http://farm' + flickr.photos.photo[f].farm + '.static.flickr.com/' + flickr.photos.photo[f].server + '/' + flickr.photos.photo[f].id + '_' + flickr.photos.photo[f].secret + '_z.jpg'
    var flickrLinks = "http://www.flickr.com/photos/" + flickr.photos.photo[f].owner + "/" + flickr.photos.photo[f].id
       var flickrImage = "<div class='pics'><a href=" + flickrLinks + " " + "target='_blank'><img src=" + flickrImg + "></a></div>";
    $("#images").append(flickrImage).delay('2000').fadeIn('slow');

} //end of for
pageNumber++
console.log (getMoreFlickr);
working=false;
} // end of second Flickr function
}); // end of Ajax
   }
   });
// }); // end of window

} // end of Flickr function

// // $('.paginate').show();

} // End of Submit function

// Strip spaces (hack)
function stripspaces(input)
{
  input.value = input.value.replace(/\s/gi,"");
  return true;
};


	

