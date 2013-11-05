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

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
       console.log("near bottom!");
       // $(window).unbind('scroll');

	var nextMaxId = instagram.pagination.next_max_tag_id;
	var getMoreInstagram = fetchInstagram + '&max_tag_id' + '=' + nextMaxId;

$.ajax({
  dataType: "jsonp",
  url: getMoreInstagram,
  success: function (instagram) {
	for (i=0; i < instagram.data.length ; i++) {
	var instaImg = instagram.data[i].images.standard_resolution.url;
	var instaLink = instagram.data[i].link;
	var instagramImage = "<div class='pics'><a href=" + instaLink + " " + "target='_blank'><img src=" + instaImg + "></a></div>";
	$("#images").append(instagramImage).delay('2000').fadeIn('slow');

} // end of for loop
} // End of second Instagram function
}); // end of Ajax
	console.log(getMoreInstagram);
  }
}); // end of window

} // End of Instagram function

console.log(fetchInstagram);

// FLICKR
var flickrKey = "f7a9edaaeec15c4bf0055f74d5105a6d"
var flickrPageNumber = 1
var fetchFlickr = "http://api.flickr.com/services/rest/?api_key=" + flickrKey + "&format=json&jsoncallback=?&tags=" + tag + "&per_page=10&page=" + flickrPageNumber + "&method=flickr.photos.search"

function getFlickr (){
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

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
       console.log("near bottom!");
       // $(window).unbind('scroll');
    var nextFlickrPageNumber = (flickrPageNumber + 1)
	var getMoreFlickr = "http://api.flickr.com/services/rest/?api_key=" + flickrKey + "&format=json&jsoncallback=?&tags=" + tag + "&per_page=10&page=" + nextFlickrPageNumber + "&method=flickr.photos.search"

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

console.log (getMoreFlickr);
} // end of second Flickr function
}); // end of Ajax
   }
}); // end of window

} // end of Flickr function

// $('.paginate').show();

} // End of Submit function

// Strip spaces (hack)
function stripspaces(input)
{
  input.value = input.value.replace(/\s/gi,"");
  return true;
};


	

