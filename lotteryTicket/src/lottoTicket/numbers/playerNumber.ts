import { PlayerNumberStyle, gameColors } from "../miscStyle";
import { LottoController, LottoState } from "../lottoController";
import { BasicNumber } from "./_basicNumber";

export enum NumberState {
    NORMAL,
    SELECTED,
    MATCH,
    NOMATCH
}

/**
 * @description Player number
 *              A single selectable player number in the game
 */
export class PlayerNumber extends BasicNumber{

    private _selected:              boolean;

    private _numberState:           NumberState;

    constructor(_width: number, _height: number, _lineWidth: number, _cornerRadius: number, _borderColor: gameColors, _backgroundColor: gameColors, _fontColor: gameColors, _value: number, _lottoController: LottoController){
        super(_width, _height, _lineWidth, _cornerRadius, _borderColor, _backgroundColor, _fontColor, _value, _lottoController);

        this._selected            = false;

        this._numberState         = NumberState.NORMAL;

        this._graphic.interactive = true;
        this._graphic.cursor      = 'pointer';
        
        this._graphic.on('pointerdown', () => {
            this.onClick();
        });
    }

    protected onClick(): void{

        if(this._lottoController.lottoState === LottoState.PLAYED)
            return;

        //Add or remove the PlayerNumber _value from the selectedNumbers array
        if(!this._selected && this._lottoController.selectedNumberValues.length < 6){
            this._lottoController.selectedNumberValues.push(this._value);
            this._selected = true;
        }
        else if(this._selected){
            const indexOf = this._lottoController.selectedNumberValues.indexOf(this._value);
            this._lottoController.selectedNumberValues.splice(indexOf, 1);
            this._selected = false;
        }

        this._numberState = this._selected ? NumberState.SELECTED : NumberState.NORMAL;
        this.updatePlayerNumberStyle();
        this.popAnimation();
    }

    private updatePlayerNumberStyle(): void{
        switch(this._numberState){
            case NumberState.NORMAL:
                this._backgroundColor = PlayerNumberStyle.backgroundColor;
                this._fontColor       = PlayerNumberStyle.fontColor;
                break;

            case NumberState.SELECTED:
                this._backgroundColor = PlayerNumberStyle.backgroundSelectedColor;
                this._fontColor       = PlayerNumberStyle.fontSelectedColor;
                break;
            
            case NumberState.MATCH:
                this._backgroundColor = PlayerNumberStyle.backgroundMatchColor;
                this._fontColor       = PlayerNumberStyle.fontMatchColor;
                break;
            
            case NumberState.NOMATCH:
                this._backgroundColor = PlayerNumberStyle.backgroundNoMatchColor;
                this._fontColor       = PlayerNumberStyle.fontNoMatchColor;
                break;
        }

        this.updateGraphic();
        this.updateTextStyle();
    }
    
    public selected(): void{
        this._selected    = true;
        this._numberState = NumberState.SELECTED;
        this.updatePlayerNumberStyle();
        this.popAnimation();
    }

    public reset(): void{
        this._graphic.cursor = 'pointer';
        this._selected       = false;
        this._numberState    = NumberState.NORMAL;
        this.updatePlayerNumberStyle();
        this.popAnimation();
    }

    //Remove pointer cursor to indicate player number can't be clicked
    public deactivateMouseCursor(): void{
        this._graphic.cursor = 'default';
    }

    public checkMatched(): void{
        if(this._selected === true){
            this._numberState = NumberState.MATCH;
            this.updatePlayerNumberStyle();
            this.popAnimation();
        }
    }
} 