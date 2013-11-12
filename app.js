$(document).ready(function() {
  $('#tag').focus();
  $('#tag').keydown(function(e){
      if (e.keyCode == 13) {
        submit();
      }
    });

  $('#loading').hide();
  $('#container').hide().fadeIn(2000);
  $('#pressenter').hide();

// Press Enter prompt
  var tagsearch = "";
  $("[name='tagSearch']").keyup(function(){
    tagSearch = $(this).val();
  });
  $("[name='tagsearch']").keyup(function(){
    tagsearch = $("[name='tagsearch']").val();
    if($(this).val().length > 2) {
      $('#pressenter').fadeIn('slow');
    }
    else {
    $('#pressenter').fadeOut('slow');
    }
  });
}); // End of document ready  

var next = '';
var fetchInstagram = '';
working = true;

function submit(){
// Generic setup
$('#container').animate({'padding-top':'50px'});
$('#tag').blur();
$('#loading').show();

// Remove previous search results
 $(".pics").remove();

// Storing user input
tag = document.getElementById("tag").value;
console.log(tag)
getInstagram ();
getFlickr ()
} // End of Submit function

// INSTAGRAM
var instagramKey = "259340442.1fb234f.bde60c19506746cfbc82b20953dd222d"
function getInstagram (){
var fetchInstagram = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?access_token=" + instagramKey + "&count=10" + "&callback=?";

working=true
$.ajax({
  dataType: "jsonp",
  url: fetchInstagram, 
  success: instagram 
  }) // end of Ajax

 console.log(fetchInstagram)
} // end of getInstagram

function instagram (instagram) {
	for (i=0; i < instagram.data.length ; i++) {
	var instaImg = instagram.data[i].images.standard_resolution.url;
	var instaLink = instagram.data[i].link;
	var instagramImage = "<div class='pics'><a href=" + instaLink + " " + "target='_blank'><img src=" + instaImg + "></a></div>";
	$("#images").append(instagramImage).hide().delay('2000').fadeIn('slow');
} // end of for
 
 next = instagram.pagination.next_max_tag_id
 console.log(next)
 working=false
} // End of Instagram function

function instagramPagination(){
  var fetchInstagram = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?access_token=" + instagramKey + "&count=10" + "&callback=?";
  var getMoreInstagram = function() {
    var nextMaxId = next;
    var moreInstagramString = fetchInstagram + '&max_tag_id=' + nextMaxId;
    return moreInstagramString;
  }

if(nearBottomOfPage()) {
  var newInstagramString = getMoreInstagram()
  console.log(newInstagramString); 
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
    } // end of second Instagram function
  }); // end of Ajax
} // end of nearBottomOfPage
} // end of instagramPagination

// FLICKR
var flickrKey = "f7a9edaaeec15c4bf0055f74d5105a6d"
var flickrPageNumber = 1
function getFlickr (){
  var buildFlickr = function() {
  var flickrString = "http://api.flickr.com/services/rest/?api_key=" + flickrKey + "&format=json&jsoncallback=?&tags=" + tag + "&per_page=10&page=" + flickrPageNumber + "&method=flickr.photos.search";
  return flickrString;
  }
  var fetchFlickr = buildFlickr()
  working=true;
  $.ajax({
  dataType: "jsonp",
  url: fetchFlickr, 
	success: flickr
  }); // end of Ajax
console.log(fetchFlickr)
} // end of getFlickr

function flickr (flickr) {
  //build the url of the Flickr photo
  	for (f=0; f < flickr.photos.photo.length ; f++) {
    var flickrImg = 'http://farm' + flickr.photos.photo[f].farm + '.static.flickr.com/' + flickr.photos.photo[f].server + '/' + flickr.photos.photo[f].id + '_' + flickr.photos.photo[f].secret + '_z.jpg'
    var flickrLinks = "http://www.flickr.com/photos/" + flickr.photos.photo[f].owner + "/" + flickr.photos.photo[f].id
    var flickrImage = "<div class='pics'><a href=" + flickrLinks + " " + "target='_blank'><img src=" + flickrImg + "></a></div>";
    $("#images").append(flickrImage).hide().delay('2000').fadeIn('slow');
  }// end of for
  working=false;
  pageNumber=1
} // end of Flickr function

function flickrPagination(){
  var nextFlickrPageNumber = (flickrPageNumber + pageNumber);
  var getMoreFlickr = "http://api.flickr.com/services/rest/?api_key=" + flickrKey + "&format=json&jsoncallback=?&tags=" + tag + "&per_page=10&page=" + nextFlickrPageNumber + "&method=flickr.photos.search";

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
}

function nearBottomOfPage() {
  return $(window).scrollTop() > $(document).height() - $(window).height() - 200;
} 
$(window).scroll(function() {
  if (working) {
  return;
  }
  else instagramPagination() & flickrPagination()
}); // end of window

// Strip spaces (hack)
function stripspaces(input){
  input.value = input.value.replace(/\s/gi,"");
  return true;
};


	

