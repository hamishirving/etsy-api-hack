$(document).ready(function(){var e,s,t;$("#etsy-search").bind("submit",function(){return api_key="2xfmuzc48ud675dksukeeuqi",terms=$("#etsy-terms").val(),etsyURL="https://openapi.etsy.com/v2/listings/active.js?keywords="+terms+"&includes=Images:1&api_key="+api_key,console.log("URL is "+etsyURL),$(".searching").remove(),$('<p class="searching"></p>').text("Searching for "+terms).insertAfter("#etsy-search"),$.ajax({url:etsyURL,dataType:"jsonp",success:function(a){if(a.ok)if($(".searching").remove(),a.count>0)for(var r=0;r<a.count;r++){var o=a.results[r],i=o.url;e=o.Images[0].url_fullxfull,s=o.num_favorers,t=o.views,$("#etsy-images").append("<div class='thumb'><img></div>"),$("#etsy-images").css("padding","3.2%"),$(".thumb img").attr("src",e),$(".thumb img").wrap("<a href='"+i+"'></a>"),$(".thumb").append("<p class='views'>"+t+"</p>"),$(".thumb").append("<p class='favourites'>"+s+"</p>"),console.log("Item "+r),console.log(e),console.log("Favourited "+s),console.log("Views "+t),console.log(i)}else $("<p>No results.</p>").appendTo("#etsy-images");else $(".searching").remove(),alert(a.error)}}),!1})});