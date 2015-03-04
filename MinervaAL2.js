////////////////////////////////////////
//MINERVA-CC Simulator
//Beta Version 0.2
//By Matthew Crump 2012
////////////////////////////////////////


//Set initial learning parameters
/////////////////////////////////
var L =.5;		
enoise=.01;							
var Inum = 50;
var vectorLength = 120;
var sims=10;


//Create new cues
//////////////////////
var newcue = function(cueName,cueStart,cueEnd,cueVal){
this.cueName=cueName;
this.cueStart=cueStart;
this.cueEnd=cueEnd;
this.cueVal=cueVal;
this.cueVectorMake = function () {
var temp=[''];
temp=makeArrayOf(0,vectorLength);
for (i=cueStart-1;i<cueEnd;i++) {
temp[i]=cueVal;
}
return temp;
};
this.cueVector=this.cueVectorMake();
this.cueWeight=0;
this.cueHistory = new Array ('');
this.cueHistorynew = [['']];
}

//Create cue compounds
////////////////////////////////
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
this.cueHistorynew = [['']];
}

//Define learning phases
//////////////////////////////////////////////////

function newphase2(NumberCues,ListCues){
this.NumberCues=NumberCues;
this.ListCues=ListCues;
}


//Run model simulation
/////////////////////////////////////////////////

function runmodel(){

	for(w=0;w<sims;w++){
		memory=[['']];
		memory[0]=makeArrayOf(0,vectorLength);
		memory[0]=addnoise(memory[0],1);
		var i = 0;
		for (b=0; b<=Testlines.length-1; b++){
			window[Testlines[b]].cueHistorynew[w]=[];
		}
		iiii=0;
		for (i=0; i<=Phases.length-1; i++) {
			var ii = 0;
			for (ii=0; ii<=Inum; ii++) {
				var iii = 0;
				window[Phases[i]].ListCues = shuffle(window[Phases[i]].ListCues); //shuffle Cues
				for (iii=0; iii<=window[Phases[i]].NumberCues-1; iii++){
					//	Compute Similarity between Probe and memory
					if (iiii<1){
					echo=memory[0];
					}else{
					echo=[''];
					echo=getecho(window[window[Phases[i]].ListCues[iii][0]].cueVector,memory);
					}
					// get echoes for each test cue 
					for (b=0; b<=Testlines.length-1; b++){
					echotest=[''];
					echotest=getecho(window[Testlines[b]].cueVector,memory);
					//window[Testlines[b]].cueHistorynew[w][iiii]=cosineSim(X.cueVector.slice(100,120),echotest.slice(100,120));
					window[Testlines[b]].cueHistorynew[w][iiii]=similarity(X.cueVector.slice(100,120),echotest.slice(100,120));
					}
					
					//store discrepancy in memory
					memory[iiii]=samplingRate(discrepancy(window[window[Phases[i]].ListCues[iii][0]].cueVector,echo),L);
					iiii++
				}
			}
		}
	}
}
/////////////////////////////////////////////////////////





////////////////////////////////////////////////////////
//FUNCTION LIST
/////////////////////////////////////////////////////////

function arraylastchar(t) {
return t.toString().charAt(t.toString().length-1)
}

//Turn a 1-d array into a 2-d array for plotting function
/////////////////////////////////////////////////////////
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

//Randomize of elements in array
/////////////////////////////////
shuffle = function(v){
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
};

//Create array with elements
//value is the number
//length is array size
//////////////////////////////////////
function makeArrayOf(value, length) {
  var arr = [], i = length;
  while (i--) {
    arr[i] = value;
  }
  return arr;
}

//Compute dotproduct of 2 arrays
////////////////////////////////
 function dotproduct(a,b) {
	var n = 0, lim = Math.min(a.length,b.length);
	for (var i = 0; i < lim; i++) n += a[i] * b[i];
	return n;
 }

//Compute cosine similarity of 2 arrays
///////////////////////////////////////
function cosineSim(a,b) {
	var temp=0;
	temp=dotproduct(a,b)/(Math.sqrt(dotproduct(a,a))*Math.sqrt(dotproduct(b,b)));
	return temp;
}

//Add +/- noise to array
//////////////////////////////////////
function addnoise(arr,noise) {
var temp=[''];
for (i=0;i<arr.length;i++){
	if (Math.random()<.5) {
	temp[i]=arr[i]-Math.random()*noise;
	}else{
	temp[i]=arr[i]+Math.random()*noise;
	}
}
return temp;
}

//Multiply elements in array by multiplier
//a is array, b is multiplier
//////////////////////////////////////////
function multiplyarray(a,b) {
var temp=[''];
for(i=0;i<a.length;i++){
temp[i]=a[i]*b;
}
return temp;
}

//Sum the columns of mxn array
//////////////////////////////
function sum2darray(a){
var sum=0;
var temp=[''];
for (i=0;i<a[0].length;i++) {
	sum=0;
	for (ii=0;ii<a.length;ii++) {
	sum+=a[ii][i];
	}
	temp[i]=sum;
}
return temp;
}

//Average the columns of mxn array
///////////////////////////////////
function avg2darray(a){
var sum=0;
var temp=[''];
for (i=0;i<a[0].length;i++) {
	sum=0;
	for (ii=0;ii<a.length;ii++) {
	sum+=a[ii][i];
	}
	temp[i]=sum/a.length;
}
return temp;
}

//Return the element by element difference between two arrays
//////////////////////////////////////////////////////////////
function discrepancy(probe,echo){
temp=[''];
for (i=0;i<probe.length;i++){
temp[i]=probe[i]-echo[i];
}
return temp;
}

//Add zeros with probability 1-prob to array
//////////////////////////////////////////
function samplingRate(arr,prob) {
var temp=[''];
for (i=0;i<arr.length;i++){
	if (Math.random()<prob) {
	temp[i]=arr[i];
	}else{
	temp[i]=0;
	}
}
return temp;
}

//Submit event vector to memory and return memory echo
//////////////////////////////////////////////////////
function getecho(probe,mem) {
	var Tempsims=[''];
	var TempMem=[['']];
	var Tempecho=[''];
	var m=0;
	for (m=0;m<mem.length;m++) {
	Tempsims[m]=cosineSim(probe.slice(0,100),mem[m].slice(0,100));
	//TempMem[m]=multiplyarray(mem[m],Math.pow(Tempsims[m],3));
	}
	for (m=0;m<mem.length;m++) {
	TempMem[m]=multiplyarray(mem[m],Math.pow(Tempsims[m],3));
	//TempMem[m]=addnoise(multiplyarray(mem[m],Math.pow(Tempsims[m],3)),.001);
	}
	Tempecho=addnoise(sum2darray(TempMem),enoise);
	//Tempecho=sum2darray(TempMem);
	Tempecho=multiplyarray(Tempecho,1/Math.max.apply(Math,absarray(Tempecho))); //make absolute include negative
	return Tempecho;
}

//return absolute values for all elements in array
//////////////////////////////////////////////////
function absarray(a){
var temp=[''];
for(i=0;i<a.length;i++){
temp[i]=Math.abs(a[i]);
}
return temp;
}


//join 2d array with lines and tabs for excel
function excelprint2darray(a){
for (x in a){
	if(a[x] instanceof Array){
	a[x]=a[x].join("\t");
	}
	}
	return a.join("\n");
	
}

//similarity function
//////////////////////////////
function  similarity(a,b) {
	var temp=0;
	temp=dotproduct(a,b)/a.length;
	return temp;
}








