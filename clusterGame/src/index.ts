import { Application } from 'pixi.js';
import { ClusterController } from './clusterController';
import { gameColors } from './miscStyle';


const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: gameColors.lightGray,
	resizeTo: window
});


const clusterController = new ClusterController(app);

//Center game to screen
resizeHandler();


app.ticker.add((delta) => {
	if(clusterController.symbolsGrid.checkGameTurn)
	clusterController.symbolsGrid.initiateGameTurn();

	if(num1 && !num1_fired){
		clusterController.symbolsGrid.getClusters();
	}
	
	if(num1)
		num1 = false;
});

let num1 	   = false;
let num1_fired = false;
document.addEventListener('keydown', function(event){
	switch(event.key){
		case "1": num1 = true; break;
	}
});

document.addEventListener('keyup', function(event){
	switch(event.key){
		case "1": num1 		 = false; 
				  num1_fired = false;	break;
	}
});


//Center game screen
function resizeHandler(){
	const newWidth = window.innerWidth;
	const newHeight = window.innerHeight;
	app.renderer.resize(newWidth, newHeight);
	
	const centerX = app.renderer.width / 2;
	const centerY = app.renderer.height / 2;

	clusterController.symbolsGrid.symbolGridContainer.x = Math.floor(centerX - clusterController.symbolsGrid.symbolGridContainer.width / 2);
	clusterController.symbolsGrid.symbolGridContainer.y = Math.floor(centerY - clusterController.symbolsGrid.symbolGridContainer.height / 2);
}

window.addEventListener('resize', resizeHandler);