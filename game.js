var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
context.font="60px Arial";

imgBall=new Image();
imgBall.src="images/ball.png";
imgBall.addEventListener("load",init,false);
var score=0;
var max_blink=15;
var blinker=true;
var count=0;
var nBall=[];
var delArr=[];
var gameover=false;
var timer=setInterval(nBallAdder,3000);
function getRandomBallYValue(){
  	return Math.floor(Math.random()*310)+50;
}
function nBallAdder(){
	var rndy=getRandomBallYValue()
	nBall.push([700,rndy,false])	
}
function ballMover(){
	for(j=0;j<nBall.length;j++){
		if(nBall[j][2]==false){
			nBall[j][0]-=2;
			nBall[j][1]+=2;		
		}
		if(nBall[j][2]==true){
			nBall[j][0]-=2;
			nBall[j][1]-=2;
		}
		if(nBall[j][2]=="l"){
			nBall[j][0]+=2;
			nBall[j][1]+=2;
		}
		if(nBall[j][2]=="r"){
			nBall[j][0]-=4;
			nBall[j][1]+=2;
		}
	}
}
var requestAnimFrame=window.requestAnimationFrame||
		     window.webkitRequestAnimationFrame||
		     window.mozRequestAnimationFrame||
		     window.oRequestAnimationFrame||
		     window.msRequestAnimationFrame||
		     function(callback){
			window.setTimeout(callback,1000/60);
		     };
var plateValues={
	plateX:75,
	plateY:500,
}
function init(){
	requestAnimFrame(update);
}
function update(){
	window.addEventListener("keydown",keypressed,false);
	context.clearRect(0,0,1075,650);
	context.fillRect(750,10,10,630,'#CEF19E');
	if(gameover==false)
	{
		ballMover();
		score++;
	}
	else{	
		if(blinker==true&&count==max_blink){
			blinker=false;
			count=0;
		}
		if(blinker==false&&count==max_blink)
		{
			blinker=true;
			count=0;
		}
		count++;
	}
	for(i=0;i<nBall.length;i++){
		if(blinker==true){
		if(gameover==true){
			context.strokeText("Game Over",225,250);
		}
		context.drawImage(imgBall,nBall[i][0],nBall[i][1],40,40);
		context.fillText(score,800,200);
		}
		if(gameover==false){
		if((plateValues.plateX+150)>nBall[i][0]&&(plateValues.plateX+140)<nBall[i][0]&&(nBall[i][1]+40)>plateValues.plateY&&nBall[i][1]<(plateValues.plateY+20)){
			nBall[i][2]="l";
		}
		if(plateValues.plateX<(nBall[i][0]+40)&&(plateValues.plateX+10)>(nBall[i][0]+40)&&(nBall[i][1]+40)>plateValues.plateY&&nBall[i][1]<(plateValues.plateY+20)){
			nBall[i][2]="r";
		}
		if((nBall[i][1]+40)>plateValues.plateY&&(nBall[i][1]+40)<(plateValues.plateY+20)){
			if((nBall[i][0]+40)>plateValues.plateX&&nBall[i][0]<(plateValues.plateX+150)){
				nBall[i][2]=true;
			}
		}
		if(nBall[i][0]<=10||nBall[i][1]<=10){
			delArr.push(i);			
		}
		if((nBall[i][1]+40)>600||(nBall[i][2]==true&&(nBall[i][0]+40)>700)){
			gameover=true;
		}}
		
	}

	for(k=0;k<delArr.length;k++){
		nBall.shift(delArr[k]);
	}
	delArr=[];
	if(gameover==true){
		clearInterval(timer);
	}
	context.fillRect(plateValues.plateX,plateValues.plateY,150,20,"#000000");
	
	context.fillRect(10,10,40,630,"#000000");
	context.fillRect(10,10,730,40,"#000000");
	context.fillRect(700,10,40,630,"#000000");
	context.fillRect(10,600,730,40,"#000000");
	context.fillText("Score",840,100);
	requestAnimFrame(update);
}
function keypressed(e){
	if(gameover==false){
	if(e.keyCode==37&&plateValues.plateX>75){
		plateValues.plateX-=5;
	}
	if(e.keyCode==39&&plateValues.plateX<525){
		plateValues.plateX+=5;
	}
	}
}
