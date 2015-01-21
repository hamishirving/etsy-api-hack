$(document).ready(function(){

var image;
var title;
var favourites;
var views;

    $('#etsy-search').bind('submit', function() {
        api_key = "2xfmuzc48ud675dksukeeuqi";
        terms = $('#etsy-terms').val();
        etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords="+
            terms+"&includes=Images:1&api_key="+api_key;
        console.log("URL is " + etsyURL);
        $('.searching').remove();
        $('<p class="searching"></p>').text('Searching for '+terms).insertAfter ('#etsy-search');

        $.ajax({
            url: etsyURL,
            dataType: 'jsonp',
            success: 

            function(data) {
                if (data.ok) {
                    $('.searching').remove();
                    if (data.count > 0) {

                        for (var i = 0; i < data.count; i++) {
                            var item = data.results[i];
                            var link = item.url;
                            // Set required info for each item
                            image = item.Images[0].url_fullxfull;
                            // title = item.title;
                            favourites = item.num_favorers;
                            views = item.views;

                            // Add content to page
                            $('#etsy-images').append("<div class='thumb'><img></div>");
                            $('#etsy-images').css('padding', '3.2%');
                            $('.thumb img').attr("src", image);
                            $('.thumb img').wrap("<a href='" +link+ "'></a>");
                            $('.thumb').append("<p class='views'>" +views+ "</p>");
                            $('.thumb').append("<p class='favourites'>" +favourites+ "</p>");                         

                            console.log("Item " + i);
                            console.log(image);
                            console.log("Favourited " + favourites);
                            console.log("Views " + views);
                            console.log(link);
                        }
                    } else {
                        $('<p>No results.</p>').appendTo('#etsy-images');
                    }
                } else {
                    $('.searching').remove();
                    alert(data.error);
                }
            }
        });

        return false;
    })
});