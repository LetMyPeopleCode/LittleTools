(function(){

console.log("loaded");

var tlist = document.getElementById('tlist');
var time = document.getElementById('time');
var clearlast = document.getElementById('clearlast');
var clearall = document.getElementById('clearall');
var total = document.getElementById('total');

var times = [];


time.addEventListener('keyup',keyhandler);
time.addEventListener('keypress',keyprevent);
clearlast.addEventListener('click',removetime);
clearall.addEventListener('click',removeall);

function keyhandler(evt){
	if((evt.charCode==13)||(evt.charCode==43)||(evt.charCode==107)||(evt.keyCode==13)||(evt.keyCode==43)||(evt.keyCode==107)||(evt.char=="+")) {
		addtime();
	}
	return false;
}


function keyprevent(evt){
	if((evt.charCode==13)||(evt.charCode==43)||(evt.charCode==107)||(evt.keyCode==13)||(evt.keyCode==43)||(evt.keyCode==107)||(evt.char=="+")) {
		evt.preventDefault();
	}
}

function addtime(){
	//make sure it's just numbers and dots
	var input = time.value;
	var matcher = /^[\d\.]+$/;
	if (input.match(matcher)){ 
		var seconds = countseconds(input);
		times.push(seconds);
		updatedisplay();
		cleartime();
	} else {
		alert('not a valid value\nvalues may only have numbers and dots');
	}
}

function removetime(){
	times.pop();
	updatedisplay();

}

function removeall(){
	times = [];
	updatedisplay();
}

function cleardisplay(){
	tlist.value="";
}

function cleartime(){
	time.value="";
}

function updatedisplay(){
	cleardisplay();
	var allsecs = 0;
	for(var i =0; i < times.length; i++){
		var newtime = uncountseconds(times[i]);
		allsecs += times[i];
		tlist.value += newtime + "\n";
	}
		total.innerText = uncountseconds(allsecs);
}


function countseconds(time){
	var vals = [0,1,60,3600]
	var timearray = time.split('.');
	var secs = 0;
	var length = timearray.length;
	if(length > 3) {
		alert('bad time string; too many dots; trimming');
		length = 3;
	}
	for(var i = 1; i <= length ; i++){
		secs += timearray[length - i] * vals [i];
	}

	return secs;
}

function uncountseconds(seconds){
	var time ="";
    if(seconds < 60) return ("00:00:" + zeropad(seconds.toString()));
	var secs = seconds % 60;
	var mins = Math.floor(seconds / 60);
	if(mins > 60){
		var hours = Math.floor(mins / 60);
		mins = mins % 60;
		return(zeropad(hours.toString()) + ":" + zeropad(mins.toString()) + ":" + zeropad(secs.toString()));
	} else {
		return("00:" + zeropad(mins.toString()) + ":" + zeropad(secs.toString()));
	}

// need to add logic to handle .. 

}


function zeropad(myval){
	if(myval.length < 2) myval = "0" + myval;
	return myval; 
}

})();