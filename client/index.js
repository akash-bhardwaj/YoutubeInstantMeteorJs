Template.loadPlayer.rendered = function(){
	var VIDEO_ID = "juRUOGv1T2k";
	var params = { allowScriptAccess: "always" };
	var atts = { id: "myytplayer" };
	swfobject.embedSWF("http://www.youtube.com/v/" + VIDEO_ID + "?enablejsapi=1&playerapiid=ytplayer&version=3&rel=0&autoplay=0&autohide=1&egm=0&loop=0&fs=1&hd=0&showsearch=0&showinfo=0&iv_load_policy=3&cc_load_policy=1",
	                 "ytapiplayer", "781", "422", "8", null, null, params, atts);

}
	
onYouTubePlayerReady = function(playerId) {
	ytplayer = document.getElementById("myytplayer");
	ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
}

Template.searchBox.events({
	'keyup' : function(e,t){
		doSearch();
	}
});

doSearch = function(){
	var toSearch = $("#searchbox");
		toSearch.autocomplete({
	    source: function(request, response) {
	      $.getJSON("http://suggestqueries.google.com/complete/search?callback=?",
	          {
	            "hl":"en", 
	            "ds":"yt",
	            "jsonp":"suggestCallBack", 
	            "q":request.term, 
	            "client":"youtube"
	          }
	      );

	      suggestCallBack = function (data) {
	        var suggestions = [];
	        $.each(data[1], function(key, val) {
	            suggestions.push({"value":val[0]});
	        });
	        suggestions.length = 5;
	        response(suggestions);
	      };

	      this.liveRegion = $( "<span>", {
	        role: "status",
	              "aria-live": "polite"
	      }).addClass("ui-helper-hidden-accessible");
	    }
  	});
  	var yt_url= 'http://gdata.youtube.com/feeds/api/videos?q='+encodeURIComponent(toSearch.val())+'&format=5&max-results=1&v=2&alt=jsonc';
  	$.ajax({
	    type: "GET",
	    url: yt_url,
	    dataType:"jsonp",
	    success: function(response){
	      if(response.data.items){
	        videos = response.data.items;
	        var playList = [];
	        playList.push(videos);
	        $.each(videos, function(i, data){
	          var video_id = data.id;
	          var video_title = data.title;
	          if(ytplayer){
	            ytplayer.loadVideoById(video_id);
	          }
	          document.getElementById("video-title").innerHTML = video_title;
	        });
	      }
	    }
	  }); 
}