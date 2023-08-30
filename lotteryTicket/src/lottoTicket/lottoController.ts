import { Application } from "pixi.js";
import { LuckyDipButton } from "./buttons/luckyDipButton";
import { ResetGameButton } from "./buttons/resetGameButton";
import { StartGameButton } from "./buttons/startGameButton";
import { PlayerNumbersGrid } from "./numbers/playerNumbersGrid";
import { PlayerNumber } from "./numbers/playerNumber";
import { WinningNumbersGrid } from "./numbers/winningNumbersGrid";
import { Announcement } from "./announcement";

export enum LottoState{
    SELECTING,
    PLAYED
}

/**
 * @description Main controller to communicate between classes
 */
export class LottoController {

    private _app:                   Application;

    private _winningNumbersGrid:    WinningNumbersGrid;

    private _playerNumbersGrid:     PlayerNumbersGrid;

    private _startGameButton:       StartGameButton;
    
    private _luckyDipButton:        LuckyDipButton;

    private _resetGameButton:       ResetGameButton;

    private _announcement:          Announcement;

    private _gameState:             LottoState;
    
    private _selectedNumberValues:  number[] = [];

    private _winningNumberValues:   number[] = [];

    constructor(_app: Application){

        this._app = _app;
        
        this._winningNumbersGrid = new WinningNumbersGrid(this);
        this._app.stage.addChild(this._winningNumbersGrid.winningGridContainer);

        this._playerNumbersGrid = new PlayerNumbersGrid(6, 10, this);
        this._app.stage.addChild(this._playerNumbersGrid.playerGridContainer);

        this._startGameButton = new StartGameButton(this);
        this._startGameButton.setPositions(-148, 400);
        this._app.stage.addChild(this._startGameButton.buttonContainer);

        this._luckyDipButton = new LuckyDipButton(this);
        this._luckyDipButton.setPositions(0, 400);
        this._app.stage.addChild(this._luckyDipButton.buttonContainer);

        this._resetGameButton = new ResetGameButton(this);
        this._resetGameButton.setPositions(148, 400);
        this._app.stage.addChild(this._resetGameButton.buttonContainer);

        this._announcement = new Announcement(this);
        this._announcement.setPositions(0, 10);
        this._app.stage.addChild(this._announcement.announcementContainer);

        this._gameState = LottoState.SELECTING;
    }

    public startGame(): void{
        //Don't let the game start without picking 6 numbers or if already played
        //As the player needs to reset the game first
        if(this._selectedNumberValues.length < 6 || this._gameState == LottoState.PLAYED)
            return;

        this._startGameButton.onClickAnimation();

        this._gameState = LottoState.PLAYED;
        this._winningNumberValues = this.generateRandomNumbers();

        //If you want to force and check announcements
        //this._winningNumberValues = [1,2,3,4,5,6];
        this._winningNumbersGrid.revealWinningNumbers(this._winningNumberValues);
        this._playerNumbersGrid.checkMatches(this._winningNumberValues);
        this._playerNumbersGrid.deactivateMouseCursors();

        this._startGameButton.deactivateMouseCursor();
        this._luckyDipButton.deactivateMouseCursor();

        this.initiateAnnounceResult();
    }

    public luckyDip(): void{
        this._luckyDipButton.onClickAnimation();
        this._playerNumbersGrid.resetPlayerNumbers();
        this._selectedNumberValues = this.pickRandomPlayerNumbers();
    }

    public reset(): void{
        this._resetGameButton.onClickAnimation();

        this._gameState = LottoState.SELECTING;
        this._winningNumbersGrid.resetWinningNumbers();
        this._playerNumbersGrid.resetPlayerNumbers();

        this._winningNumberValues  = [];
        this._selectedNumberValues = [];
        
        this._startGameButton.activateMouseCursor();
        this._luckyDipButton.activateMouseCursor();
        
        this._announcement.reset();
    }

    private initiateAnnounceResult(): void{
        let message = `Congratulations you won! \n`;
        switch(this.checkMatchingNumbers()){
            case 3: message += `$50`;   break;
            case 4: message += `$100`;  break;
            case 5: message += `$200`;  break;
            case 6: message += `$500`;  break;

            default:
                message = `Unlucky! \nYou didn't win`;
                break;
        }
        this._announcement.announce(message);
    }

    private checkMatchingNumbers(): number{
        let matchingNumberCount = 0;
        for(const aWinningNumberValue of this._winningNumberValues){
            if(this._selectedNumberValues.includes(aWinningNumberValue))
                matchingNumberCount++;
        }
        return matchingNumberCount;
    }

    private pickRandomPlayerNumbers(): number[]{
        let randomPlayerNumbers: number[] = [];
        randomPlayerNumbers = this.generateRandomNumbers();

        //Mark the new selected numbers
        randomPlayerNumbers.forEach((value) => {
            const aPlayerNumber: PlayerNumber = this._playerNumbersGrid.playerNumbersArray[value - 1];
            aPlayerNumber.selected();
        });

        return randomPlayerNumbers;
    }

    //Used to generate random player or winning numbers
    private generateRandomNumbers(): number[]{
        const randomNumbers: number[] = []

        while(randomNumbers.length < 6){
            const randomNum = Math.floor(Math.random() * (59 - 1 + 1)) + 1;
            if (randomNumbers.indexOf(randomNum) === -1) 
                randomNumbers.push(randomNum);
        }
        
        randomNumbers.sort((a, b) => a - b);
        return randomNumbers;
    }
    
    public get lottoState(): LottoState{
        return this._gameState;
    }

    public get selectedNumberValues(): number[]{
        return this._selectedNumberValues;
    }

    //Below are required to center on screen
    public get winningNumbersGrid(): WinningNumbersGrid{
        return this._winningNumbersGrid;
    }

    public get playerNumbersGrid(): PlayerNumbersGrid{
        return this._playerNumbersGrid;
    }

    public get startGameButton(): StartGameButton{
        return this._startGameButton;
    }

    public get luckyDipButton(): LuckyDipButton{
        return this._luckyDipButton;
    }

    public get resetGameButton(): ResetGameButton{
        return this._resetGameButton;
    }

    public get annoncement(): Announcement{
        return this._announcement;
    }
}