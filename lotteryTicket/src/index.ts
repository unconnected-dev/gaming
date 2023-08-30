import { Application } from 'pixi.js';
import { gameColors } from './lottoTicket/miscStyle';
import { LottoController } from './lottoTicket/lottoController';


const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: gameColors.richBlack,
	resizeTo: window
});

const lottoController = new LottoController(app);


//Center game screen
resizeHandler();

function resizeHandler(){
	const newWidth 	= window.innerWidth;
	const newHeight = window.innerHeight;
	app.renderer.resize(newWidth, newHeight);
	
	const centerX = app.renderer.width/2;
	const centerY = app.renderer.height/2;

	lottoController.winningNumbersGrid.winningGridContainer.x = centerX - lottoController.winningNumbersGrid.winningGridContainer.width/2;
	lottoController.winningNumbersGrid.winningGridContainer.y = centerY - lottoController.winningNumbersGrid.winningGridContainer.height/2;
	
	lottoController.playerNumbersGrid.playerGridContainer.x = centerX - lottoController.playerNumbersGrid.playerGridContainer.width/2;
	lottoController.playerNumbersGrid.playerGridContainer.y = centerY - lottoController.playerNumbersGrid.playerGridContainer.height/2;

	lottoController.startGameButton.buttonContainer.x  = centerX - lottoController.startGameButton.buttonContainer.width/2;
	lottoController.startGameButton.buttonContainer.y  = centerY - lottoController.startGameButton.buttonContainer.height/2;

	lottoController.luckyDipButton.buttonContainer.x  = centerX - lottoController.luckyDipButton.buttonContainer.width/2;
	lottoController.luckyDipButton.buttonContainer.y  = centerY - lottoController.luckyDipButton.buttonContainer.height/2;

	lottoController.resetGameButton.buttonContainer.x = centerX - lottoController.resetGameButton.buttonContainer.width/2;
	lottoController.resetGameButton.buttonContainer.y = centerY - lottoController.resetGameButton.buttonContainer.height/2;

	lottoController.annoncement.announcementContainer.x = centerX - lottoController.annoncement.announcementContainer.width/2;
	lottoController.annoncement.announcementContainer.y = centerY - lottoController.annoncement.announcementContainer.height/2;
}

window.addEventListener('resize', resizeHandler);