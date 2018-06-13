// FLIE NAME HERE
var AllFiles = ['output']

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


		var sentenceData = data['0']['sentences'];
		var lastSentence = sentenceData[sentenceData.length - 1]
		var lastSentenceSegments = lastSentence["segments"]

		var vidStartTime = 0
		var vidEndTime = lastSentenceSegments[lastSentenceSegments.length - 1]["end_time"];
		
		var sentIndex = 0;
		var segmentIndex = 0;

		
		timeToStop = sentenceData[sentIndex]["segments"][segmentIndex]["end_time"]

		FILENAME = AllFiles[0];
		var VIDEO_FILE = "video-footage/" + FILENAME + ".mov";
		var segmentLength = sentenceData[sentIndex]["segments"].length;

		console.log(sentenceData[sentIndex])

		video.addEventListener("timeupdate", function () {	
			if (this.currentTime >= timeToStop) {
				segmentIndex++;
				if(segmentIndex > segmentLength -1){
					sentIndex++;
					segmentIndex = 0
					segmentLength = sentenceData[sentIndex]["segments"].length;
					console.log(sentenceData[sentIndex])
				}
				timeToStop = sentenceData[sentIndex]["segments"][segmentIndex]["end_time"]
				this.currentTime = sentenceData[sentIndex]["segments"][segmentIndex]["start_time"]

				gramText = sentenceData[sentIndex]["segments"][segmentIndex]["grams"].join(" ")
				$('.segment-cont').html(gramText)

				console.log("START_TIME:",sentenceData[sentIndex]["segments"][segmentIndex]["start_time"], "END_TIME:",timeToStop)

			}
		}, false);
		
	});
}




