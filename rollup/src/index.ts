import { Application } from 'pixi.js';
import { RollupController } from './rollUp/rollupController';
import { gameColors } from './rollUp/miscStyle';


const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: gameColors.richBlack,
	resizeTo: window
});

const rollupController = new RollupController(app);


//Center game screen
resizeHandler();

function resizeHandler(){
	const newWidth 	= window.innerWidth;
	const newHeight = window.innerHeight;
	app.renderer.resize(newWidth, newHeight);
	rollupController.resize();
}

window.addEventListener('resize', resizeHandler);