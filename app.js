  $(document).ready(function() {
  $('#tag').focus();
  $('#tag').keydown(function(e){
      if (e.keyCode == 13) {
        submit();
      }
    });
$('#loading').hide();
$('.paginate').hide();
$('#container').hide().fadeIn(2000);

 
}); // End of document ready  




// if (tag.length > 3 ) {
//   	$('#press-enter').hide();
//         } 
//     else {
//      $('#press-enter').fadeIn();
//         };


// 'http://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=f7a9edaaeec15c4bf0055f74d5105a6d&format=json&jsoncallback=?'

	




var img = '';
i=0;





function submit(){

$('#container').animate({'padding-top': '50px'});
$('#tag').blur();
$('#loading').show();
// Remove previous search results

 // $("#images img").remove();



var tag = document.getElementById("tag").value;
var instagramKey = "259340442.1fb234f.bde60c19506746cfbc82b20953dd222d"
var fetchInstagram = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?access_token=" + instagramKey + "&callback=?";


function getInstagram (){
$.ajax({

  dataType: "jsonp",
  url: fetchInstagram, 
  success: function(instagram) {
	for (i=0; i < 10 ; i++) {
	var instaImg = instagram.data[i].images.standard_resolution.url;
	var instaLink = instagram.data[i].link;
	$("#images").append("<a href=" + instaLink + " " + "target='_blank'><img src=" + instaImg + "></a>").hide().delay('2000').fadeIn('slow');

	}
	console.log(fetchInstagram);
	

	$(".paginate").click(function(event) {
		var nextMaxId = instagram.pagination.next_max_id
		var getMoreInstagram = fetchInstagram + '&max_id' + '=' + nextMaxId
		
			

$.ajax({

  dataType: "jsonp",
  url: getMoreInstagram, 
  success: function(instagram) {
	for (i=11; i < 20 ; i++) {
	var instaImg = instagram.data[i].images.standard_resolution.url;
	var instaLink = instagram.data[i].link;
	$("#images").append("<a href=" + instaLink + " " + "target='_blank'><img src=" + instaImg + "></a>");
	console.log(getMoreInstagram);
	}
	}
	
	});

	});

	
	// $("#tag").val('');
 
 // return function(max_id){
 //    if(typeof max_id === 'string' && max_id.trim() !== '') {
 //      url += "&max_id=" + max_id;
 //    }
 //    return url;

 //  };

}


})
}
getInstagram ()


var flickrKey = "f7a9edaaeec15c4bf0055f74d5105a6d"
var fetchFlickr = "http://api.flickr.com/services/rest/?api_key=" + flickrKey + "&format=json&jsoncallback=?&tags=" + tag + "&per_page=10&page=1&method=flickr.photos.search"

$.ajax({
  dataType: "jsonp",
  url: fetchFlickr, 
	success: function(flickr) {
	console.log(flickr.photos.photo[0])

	console.log(flickr.photos.photo.length)

  //build the url of the Flickr photo

  	for (f=0; f < flickr.photos.photo.length ; f++) {
    var flickrImg = 'http://farm' + flickr.photos.photo[f].farm + '.static.flickr.com/' + flickr.photos.photo[f].server + '/' + flickr.photos.photo[f].id + '_' + flickr.photos.photo[f].secret + '_z.jpg'
    console.log(flickrImg);
    var flickrLinks = "http://www.flickr.com/photos/" + flickr.photos.photo[f].owner + "/" + flickr.photos.photo[f].id
    $("#images").append("<a href=" + flickrLinks + " " + "target='_blank'><img src=" + flickrImg + "></a>").hide().delay('2000').fadeIn('slow');

}
}



});

$('.paginate').show();

}

// Strip spaces on submit (hack)
function stripspaces(input)
{
  input.value = input.value.replace(/\s/gi,"");
  return true;
}
	


