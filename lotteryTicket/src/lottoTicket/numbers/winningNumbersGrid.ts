import { Container } from "pixi.js";
import { LottoController } from "../lottoController";
import { WinningNumber } from "./winningNumber";
import { WinningNumberStyle } from "../miscStyle";

/**
 * @description Winning numbers grid
 *              This is the grid that will hold all winning numbers in an array
 */
export class WinningNumbersGrid{

    private _lottoController:       LottoController;

    private _winningNumbersArray:   WinningNumber[] = [];

    private _winningGridContainer!: Container;

    constructor(_lottoController: LottoController){
        this._lottoController = _lottoController;
        
        //Fill array with winning numbers
        this.createWinningNumbers();
    }

    private createWinningNumbers(): void{
        this._winningGridContainer = new Container();

        for(let xPos = 0; xPos < 6; xPos++){
            const aWinningSymbol = this.createWinningNumber(xPos);
            this._winningGridContainer.addChild(aWinningSymbol.numberContainer);
            this._winningNumbersArray.push(aWinningSymbol);
        }
    }

    private createWinningNumber(_xPos: number): WinningNumber{
        const width             = WinningNumberStyle.width;
        const height            = WinningNumberStyle.height;
        const cornerRadius      = WinningNumberStyle.cornerRadius;
        const lineWidth         = WinningNumberStyle.lineWidth;
        const margin            = WinningNumberStyle.margin;

        const borderColor       = WinningNumberStyle.borderColor;
        const backgroundColor   = WinningNumberStyle.backgroundColor;
        const fontColor         = WinningNumberStyle.fontColor;

        const symbolValue       = 0;

        const aWinningNumber    = new WinningNumber(width, height, lineWidth, cornerRadius, borderColor, backgroundColor, fontColor, symbolValue, this._lottoController);
        
        const sX = _xPos*width + _xPos*margin;
        const sY = -398;
        aWinningNumber.setPositions(sX, sY);
        return aWinningNumber;
    }

    //Go through the randomly generated winning numbers
    //Add that value to replace the `?` / 0 in the WinningNumberGrid  6  WinningNumber
    public revealWinningNumbers(randomWinningNumberValues: number[]): void{
        for(let i = 0; i < randomWinningNumberValues.length; i++){
            const aWinningNumber = this._winningNumbersArray[i];
            aWinningNumber.value = randomWinningNumberValues[i];
            aWinningNumber.reveal();
        }
    }

    public resetWinningNumbers(): void{
        this._winningNumbersArray.forEach((aWinningNumber: WinningNumber) =>{
            aWinningNumber.reset();
        });
    }

    public get winningGridContainer(): Container{
        return this._winningGridContainer;
    }
}