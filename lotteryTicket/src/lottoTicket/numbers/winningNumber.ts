import { LottoController } from "../lottoController";
import { gameColors } from "../miscStyle";
import { BasicNumber } from "./_basicNumber";

/**
 * @description A single winning number in the game
 *              Will set as 0 while player is selecting numbers
 *              But display a ? in the text field
 */
export class WinningNumber extends BasicNumber{

    constructor(_width: number, _height: number, _lineWidth: number, _cornerRadius: number, _borderColor: gameColors, _backgroundColor: gameColors, _fontColor: gameColors, _value: number, _lottoController: LottoController){
        super(_width, _height, _lineWidth, _cornerRadius, _borderColor, _backgroundColor, _fontColor, _value, _lottoController);

        this._valueText.text = `?`;
    }

    public reveal(): void{
        this._valueText.text = this._value;
        this.updateTextPivot();
        this.popAnimation();
    }
    
    public reset(): void{
        this._value = 0;
        this._valueText.text = `?`;
        this.updateTextPivot();
        this.popAnimation();
    }
    
    //Update the pivot in case this._value is double digits
    private updateTextPivot(): void{
        this._valueText.pivot.x = this._valueText.width/2;
        this._valueText.pivot.y = this._valueText.height/2;
    }
}