  $(document).ready(function() {
  $('#tag').focus();
  $('#tag').keydown(function(e){
      if (e.keyCode == 13) {
        submit();
      }
    });

}); // End of document ready  


// 'http://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=f7a9edaaeec15c4bf0055f74d5105a6d&format=json&jsoncallback=?'

	




var img = '';
i=0;





function submit(){
  var tag = document.getElementById("tag").value;

var fetchInstagram = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?access_token=259340442.1fb234f.bde60c19506746cfbc82b20953dd222d&callback=?";

$.ajax({
  dataType: "jsonp",
  url: fetchInstagram, 
  success: function(instagram) {
	for (i=0; i < instagram.data.length ; i++) {
	var instaImg = instagram.data[i].images.standard_resolution.url;
	$("#images").append('<img src=' + instaImg + '>')
	}

	console.log(instagram.data.length)
	// $("#tag").val('');
}


})

function moreImages() {
 {
		$("#images").append('<img src=' + img + '>')
	}
    }


$.getJSON('http://api.flickr.com/services/rest/?api_key=f7a9edaaeec15c4bf0055f74d5105a6d&format=json&jsoncallback=?&text=' + tag + '&per_page=20&page=1&method=flickr.photos.search', function(flickr) {
	console.log(flickr.photos.photo[0])

	console.log(flickr.photos.photo.length)

  //build the url of the Flickr photo

  	for (f=0; f < flickr.photos.photo.length ; f++) {
    var flickrImg = 'http://farm' + flickr.photos.photo[f].farm + '.static.flickr.com/' + flickr.photos.photo[f].server + '/' + flickr.photos.photo[f].id + '_' + flickr.photos.photo[f].secret + '_z.jpg'
    console.log(flickrImg);
    $("#images").append('<img src=' + flickrImg + '>')

}
});



}

	


