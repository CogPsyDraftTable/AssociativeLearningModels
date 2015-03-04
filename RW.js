//Rescorla Wagner Simulation
//Set initial learning parameters
var Beta = .1;
var LambdaP = .75;
var Inum = 50;

//Create new cues, specify name, alpha level, and associative strength
//function newcue(cueName,cueAlpha,cueWeight){
//this.cueName=cueName;
//this.cueAlpha=cueAlpha;
//this.cueWeight=0;
//this.cueHistory = new Array ('');
//this.cueHistorynew = new Array(new Array(''));
//}

var newcue = function(cueName,cueAlpha){
this.cueName=cueName;
this.cueAlpha=cueAlpha;
this.cueWeight=0;
this.cueHistory = new Array ('');
this.cueHistorynew = new Array(new Array(''));
this.cueHistorynew.length=0;
}

//var A = new newcue("A",.5,0);
//var B = new newcue("B",.5,0);


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

function runmodel(){
//Run Simulation
var Vtot=0;
var i = 0;
var talpha = 0;
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
		 		talpha = window[window[Phases[i]].ListCues[iii][0]].cueAlpha;
		 		window[window[Phases[i]].ListCues[iii][0]].cueWeight += talpha*Beta*(Lambda-Vtot);
		 		window[window[Phases[i]].ListCues[iii][0]].cueHistory += window[window[Phases[i]].ListCues[iii][0]].cueWeight + ",";
		 		window[window[Phases[i]].ListCues[iii][0]].cueHistorynew[iiii] = [iiii,window[window[Phases[i]].ListCues[iii][0]].cueWeight];
		 		Vtot += talpha*Beta*(Lambda-Vtot);
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
