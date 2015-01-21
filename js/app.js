$(document).ready(function(){
    console.log('Document ready');

    $('#etsy-search').bind('submit', function() {
        api_key = "2xfmuzc48ud675dksukeeuqi";
        // Get serach terms entered in input
        terms = $('#etsy-terms').val();
        // Etsy URL with terms and api key appended
        etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords="+
            terms+"&limit=12&includes=Images:1&api_key="+api_key;
        console.log("URL is " + etsyURL);
        // Clear any images already on the page
        $('#etsy-images').empty();
        // Show 'searching for ..' text under input field
        $('<p></p>').text('Searching for '+terms).appendTo('#etsy-images');

        getImages(etsyURL);
    })

    var getImages = function(etsyURL) {
        console.log(etsyURL);
        $.ajax({
            url: etsyURL,
            dataType: 'jsonp',
            success: function(data) {
                if (data.ok) {
                    $('#etsy-images').empty();
                    if (data.count > 0) {
                        $.each(data.results, function(i,item) {
                            $("<img/>").attr("src", item.Images[0].url_75x75).appendTo("#etsy-images").wrap(
                                "<a href='" + item.url + "'></a>"
                            );
                            if (i%4 == 3) {
                                $('<br/>').appendTo('#etsy-images');
                            }
                        });
                    } else {
                        $('<p>No results.</p>').appendTo('#etsy-images');
                    }
                } else {
                    $('#etsy-images').empty();
                    alert(data.error);
                }
            }
        });

        return false;
    }

});