Template.loadPlayer.rendered = function(){
	var VIDEO_ID = "juRUOGv1T2k";
	var params = { allowScriptAccess: "always" };
	var atts = { id: "myytplayer" };
	swfobject.embedSWF("http://www.youtube.com/v/" + VIDEO_ID + "?enablejsapi=1&playerapiid=ytplayer&version=3&rel=0&autoplay=0&autohide=1&egm=0&loop=0&fs=1&hd=0&showsearch=0&showinfo=0&iv_load_policy=3&cc_load_policy=1",
	                 "ytapiplayer", "781", "422", "8", null, null, params, atts);

}
	
function onYouTubePlayerReady(playerId) {
	ytplayer = document.getElementById("myytplayer");
	ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
}

