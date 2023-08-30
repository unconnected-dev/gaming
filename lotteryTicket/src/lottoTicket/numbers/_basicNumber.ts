import { Container, Graphics, Text } from "pixi.js";
import { LottoController } from "../lottoController";
import { PlayerNumberStyle, gameColors } from "../miscStyle";
import { TweenMax } from "gsap";

/**
 * @description A basic number symbol in the game
 */

export class BasicNumber{
    
    protected _lottoController:     LottoController;

    private _x!:                    number;

    private _y!:                    number;

    private _width:                 number;

    private _height:                number;

    private _lineWidth:             number;

    private _cornerRadius:          number;

    protected _borderColor:         gameColors;
    
    protected _backgroundColor:     gameColors;
    
    protected _fontColor:           gameColors;

    protected _value:               number;
    
    protected _graphic:             Graphics;

    protected _valueText:           Text;

    public _numberContainer:    Container;
    
    constructor(_width: number, _height: number, _lineWidth: number, _cornerRadius: number, _borderColor: gameColors, _backgroundColor: gameColors, _fontColor: gameColors, _value: number, _lottoController: LottoController){

        this._lottoController   = _lottoController;

        this._width             = _width;
        this._height            = _height;

        this._lineWidth         = _lineWidth;
        this._cornerRadius      = _cornerRadius;
        this._borderColor       = _borderColor;
        this._backgroundColor   = _backgroundColor;
        this._fontColor         = _fontColor;

        this._value             = _value;

        this._graphic = new Graphics();
        this.updateGraphic();

        this._graphic.pivot.x = this._width/2;
        this._graphic.pivot.y = this._height/2;
        

        this._valueText = new Text(String(this._value), 
            {
                fontFamily: PlayerNumberStyle.fontFamily, 
                fontSize:   PlayerNumberStyle.fontSize, 
                fill:       this._fontColor, 
                align:      'center'
            });
        this._valueText.pivot.x = this._valueText.width/2;
        this._valueText.pivot.y = this._valueText.height/2;

        
        this._numberContainer = new Container();
        this._numberContainer.addChild(this._graphic, this._valueText);
    }

    protected updateGraphic(): void{
        this._graphic.clear();
        this._graphic.lineStyle(this._lineWidth, this._borderColor, 1);
        this._graphic.beginFill(this._backgroundColor, 0.7);
        this._graphic.drawRoundedRect(0, 0, this._width, this._height, this._cornerRadius);
        this._graphic.endFill();
    }

    protected updateTextStyle(): void{
        this._valueText.style.fill = this._fontColor;
    }

    public setPositions(_x: number, _y: number): void{
        this._x           = _x;
        this._y           = _y;

        this._graphic.x   = this._x + this._width/2;
        this._graphic.y   = this._y + this._height/2;

        this._valueText.x = this._x + this._width/2;
        this._valueText.y = this._y + this._height/2;
    }

    protected popAnimation(): void{
        TweenMax.fromTo([this._graphic.scale, this._graphic.scale], 1, {x: 0.5, y: 0.5}, {x: 1, y: 1, yoyo: true, ease: "Elastic.easeOut"});
        TweenMax.fromTo([this._valueText.scale, this._valueText.scale], 1, {x: 0.5, y: 0.5}, {x: 1, y: 1, yoyo: true, ease: "Elastic.easeOut"});
    }

    public set value(value: number){
        this._value = value;
    }
    
    public get numberContainer(): Container{
        return this._numberContainer;
    }
}