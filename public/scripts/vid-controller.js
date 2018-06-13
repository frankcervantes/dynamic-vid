// FLIE NAME HERE
var AllFiles = ['segment-loop']

window.onload = function() {
	init();
};

function init(){
	var fn = function getData(file){ 
		var FILENAME = file;
		var JSON_FILE = "json/"+ FILENAME +".json";
		return new Promise(resolve => resolve( $.getJSON(JSON_FILE)));
	};
	var actions = AllFiles.map(fn);
	var results = Promise.all(actions);

	results.then(data => {
	
		var video = document.getElementById("video-panel");
   
         // Initial values
		var vidIndex = 0;
        
		var _videos = data['0']['videos'];
        var _videoSentenceData = _videos[vidIndex]["sentences"][0]["segments"][0];

        var totalVideos = _videos.length;
        
        var vidStartTime = _videoSentenceData["start_time"];
        var vidEndTime = _videoSentenceData["end_time"];

        var timeToStop = vidEndTime
        
        video.src = "video-footage/" + _videos[0]["video_name"];
        video.currentTime = vidStartTime;
       
		

        $(".segment-cont").html(_videoSentenceData["grams"].join(" "))
		
		
		video.addEventListener("timeupdate", function () {
			if (this.currentTime >= timeToStop) {   
                vidIndex++;
                if(vidIndex < totalVideos){
                    var currentSegmentData = _videos[vidIndex]["sentences"]["0"]["segments"]["0"];
                    video.src = "video-footage/" + _videos[vidIndex]["video_name"];
                    video.currentTime = currentSegmentData["start_time"];
                    timeToStop = currentSegmentData["end_time"];
                    $(".segment-cont").html(currentSegmentData["grams"].join(" "))
                }else{
                    vidIndex=0
                }
			}
		}, false);	
	});
}




