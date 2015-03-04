//Ghirlanda (2005) simulator
//Set initial learning parameters
var Beta = .1;
var Alpha = .1;
var LambdaP = .75;
var Inum = 50;
var vectorLength = 100;

//make new cues
var newcue = function(cueName,cuePeak,cuePeakVal,cueMinVal,cueSpread){
this.cueName=cueName;
this.cuePeak=cuePeak;
this.cuePeakVal=cuePeakVal;
this.cueMinVal=cueMinVal;
this.cueSpread=cueSpread;
this.cueVectorMake = function () {
var temp=[''];
for (i=0;i<vectorLength;i++) {
temp[i]=cueMinVal+cuePeakVal*Math.exp(-1*Math.pow(cuePeak-i,2)/Math.pow(2*cueSpread,2));
}
return temp;
};
this.cueVector=this.cueVectorMake();
this.cueWeight=0;
this.cueHistory = new Array ('');
this.cueHistorynew = new Array(new Array(''));
this.cueHistorynew.length=0;
}

//make compounds
var newcompound = function() {
this.name=arguments;
this.compoundMake = function() {
	var temp=[''];
	for (i=0; i<this.name[0].length;i++){
	temp[i]=window[this.name[0][i]].cueVector;
	}
	var tempMaxList=[''];
	var CompoundVec=[''];
	for (i=0; i<temp[0].length;i++){
		for (ii=0;ii<temp.length;ii++) {
		tempMaxList[ii]=temp[ii][i];
		}
	CompoundVec[i]=Math.max.apply(Math,tempMaxList);
	}
	return CompoundVec;
	}
this.cueVector=this.compoundMake();
this.cueHistorynew = new Array(new Array(''));
this.cueHistorynew.length=0;
}

//Create new learning phases
function newphase(NumberCues,ListCues,ListRewards){
this.NumberCues=NumberCues;
this.ListCues=ListCues;
this.ListRewards=ListRewards;
}

function newphase2(NumberCues,ListCues){
this.NumberCues=NumberCues;
this.ListCues=ListCues;
}

//var P1 = new newphase(1,"A","+");
//var P2 = new newphase(2,["A","B"],["+","+"]);

var Phases = new Array('');
//var Phases = ["P1","P2"];

var weight = makeArrayOf(0,vectorLength);

function runmodel(){
//Run Simulation
weight = makeArrayOf(0,vectorLength);
var rs=0;
var i = 0;

iiii=0;
for (i=0; i<=Phases.length-1; i++) {
	var ii = 0;
	for (ii=0; ii<=Inum; ii++) {
		var iii = 0;
		window[Phases[i]].ListCues = shuffle(window[Phases[i]].ListCues);
		for (iii=0; iii<=window[Phases[i]].NumberCues-1; iii++){
			
		 	//if (window[Phases[i]].ListRewards[iii] == "-") {
		 	if (window[Phases[i]].ListCues[iii][1] == "-") {
		 		Lambda = .05; 
		 		}
		 		else {
		 		Lambda = LambdaP;
		 		}
		 		
		 		rs=dotproduct(window[window[Phases[i]].ListCues[iii][0]].cueVector,weight);
		 	
		 		for (tt=0;tt<vectorLength;tt++) {
		 		weight[tt]+=Alpha*(Lambda-rs)*window[window[Phases[i]].ListCues[iii][0]].cueVector[tt];
		 		}
		 		
		 		//talpha = window[window[Phases[i]].ListCues[iii][0]].cueAlpha;
		 		//window[window[Phases[i]].ListCues[iii][0]].cueWeight += talpha*Beta*(Lambda-Vtot);
		 		//window[window[Phases[i]].ListCues[iii][0]].cueHistory += window[window[Phases[i]].ListCues[iii][0]].cueWeight + ",";
		 		//window[window[Phases[i]].ListCues[iii][0]].cueHistorynew[iiii] = [iiii,window[window[Phases[i]].ListCues[iii][0]].cueWeight];
		 		if (window[Phases[i]].ListCues[iii][0].length == 1) {
		 		window[window[Phases[i]].ListCues[iii][0]].cueHistorynew[iiii] = [iiii,rs];
		 		} else {
		 		window[window[Phases[i]].ListCues[iii][0]].cueHistorynew[iiii] = [iiii,rs];
		 			for (uu=0;uu<window[Phases[i]].ListCues[iii][0].length;uu++) {
		 			window[window[Phases[i]].ListCues[iii][0][uu]].cueHistorynew[iiii] = [iiii,dotproduct(window[window[Phases[i]].ListCues[iii][0][uu]].cueVector,weight)];
		 			}
		 		}
		 		
		 		//Vtot += talpha*Beta*(Lambda-Vtot);
		 		iiii++
		}
	}
}}
//runmodel();

//Print Results





function arraylastchar(t) {
return t.toString().charAt(t.toString().length-1)
}

function arrayto2d(t) {
	temp = new Array(new Array());
	for (a=0; a<=t.length; a++){
	temp[a]=[a,t[a]];
	}
	return temp;
}

function arrayto2db(t,blk,nums) {
	temp = new Array(new Array());
	for (a=blk*nums; a<=t.length+(blk*nums); a++){
	temp[a]=[a,t[a]];
	}
	return temp;
}

shuffle = function(v){
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
};

function makeArrayOf(value, length) {
  var arr = [], i = length;
  while (i--) {
    arr[i] = value;
  }
  return arr;
}


 function dotproduct(a,b) {
	var n = 0, lim = Math.min(a.length,b.length);
	for (var i = 0; i < lim; i++) n += a[i] * b[i];
	return n;
 }
