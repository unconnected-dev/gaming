import { Container } from "pixi.js";
import { PlayerNumber } from "./playerNumber";
import { PlayerNumberStyle } from "../miscStyle";
import { LottoController } from "../lottoController";

/**
 * @description Player numbers grid
 *              This is the grid that will hold all the selectable player numbers in an array
 */
export class PlayerNumbersGrid {

    private _lottoController:       LottoController;

    private _gridSizeX!:            number;

    private _gridSizeY!:            number;

    private _playerNumbersArray:    PlayerNumber[] = [];

    private _playerGridContainer!:  Container;

    constructor(_gridSizeX: number, _gridSizeY: number, _lottoController: LottoController){

        this._lottoController = _lottoController;
        
        this._gridSizeX       = _gridSizeX;

        this._gridSizeY       = _gridSizeY;

        //Fill array with player numbers
        this.createPlayerNumbers();
    }
 
    private createPlayerNumbers(): void{
        this._playerGridContainer = new Container();
        
        let value = 1;
        for(let yPos = 0; yPos < this._gridSizeY; yPos++){
            for(let xPos = 0; xPos < this._gridSizeX; xPos++){
                //Limit to 59 
                if(value >= 60)
                    return;

                const aPlayerNumber = this.createPlayerNumber(value, xPos, yPos);
                this._playerGridContainer.addChild(aPlayerNumber.numberContainer);
                this._playerNumbersArray.push(aPlayerNumber);
                value++;
            }
        }
    }

    private createPlayerNumber(_value: number, _xPos: number, _yPos: number): PlayerNumber{
        const aPlayerNumber  = this.createBasicPlayerNumber(_value);

        const width  = PlayerNumberStyle.width;
        const height = PlayerNumberStyle.height;
        const margin = PlayerNumberStyle.margin;

        const sX = _xPos*width  + _xPos*margin;
        const sY = _yPos*height + _yPos*margin;
        aPlayerNumber.setPositions(sX, sY);

        return aPlayerNumber;
    }

    private createBasicPlayerNumber(_value: number): PlayerNumber{
        const width             = PlayerNumberStyle.width;
        const height            = PlayerNumberStyle.height;
        const cornerRadius      = PlayerNumberStyle.cornerRadius;
        const lineWidth         = PlayerNumberStyle.lineWidth;
        
        const borderColor       = PlayerNumberStyle.borderColor;
        const backgroundColor   = PlayerNumberStyle.backgroundColor;
        const fontColor         = PlayerNumberStyle.fontColor;

        const value             = _value;

        const aPlayerNumber     = new PlayerNumber(width, height, lineWidth, cornerRadius, borderColor, backgroundColor, fontColor, value, this._lottoController);
        return aPlayerNumber;
    } 

    public deactivateMouseCursors(): void{
        this._playerNumbersArray.forEach(function(playerNumber: PlayerNumber): void{
            playerNumber.deactivateMouseCursor();
        });
    }

    //Go through the randomly generated winning numbers
    //Check if the player number was selected
    public checkMatches(randomWinningNumberValues: number[]): void{
        randomWinningNumberValues.forEach((value) => {
            this._playerNumbersArray[value - 1].checkMatched();
        });
    }

    public resetPlayerNumbers(): void{
        this._playerNumbersArray.forEach(function(playerNumber: PlayerNumber): void{
            playerNumber.reset();
        });
    }

    public get playerNumbersArray(): PlayerNumber[]{
        return this._playerNumbersArray;
    }
    
    public get playerGridContainer(): Container{
        return this._playerGridContainer;
    }
}