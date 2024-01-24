import { Container, Graphics } from "pixi.js";
import { gameColors, symbolValues } from "../miscStyle";
import { gsap }from "gsap";import { ClusterController } from "../clusterController";
;

/**
 * @description A single symbol in the game
 */
export class Symbol {

    private _clusterController: ClusterController;

    private _currX!:                number;

    private _currY!:                number;

    private _x!:                    number;

    private _y!:                    number;

    private _width:                 number;

    private _height:                number;

    private _lineWidth:             number;

    private _cornerRadius!:         number;

    private _borderColor!:          gameColors

    private _backgroundColor!:      gameColors;

    private _value:                 symbolValues;
    
    private _graphic:               Graphics;

    public _symbolContainer!:       Container;

    private _moving = false;

    constructor(_width: number, _height: number, _lineWidth: number, _cornerRadius: number, _borderColor: gameColors, _backgroundColor: gameColors, _value: symbolValues, _clusterController: ClusterController){

        this._clusterController = _clusterController;

        this._width             = _width;
        this._height            = _height;

        this._lineWidth         = _lineWidth;
        this._cornerRadius      = _cornerRadius;
        this._borderColor       = _borderColor;
        this._backgroundColor   = _backgroundColor;
        
        this._value = _value;

        this._graphic = new Graphics();
        this._graphic.lineStyle(this._lineWidth, this._borderColor, 1);
        this._graphic.beginFill(this._backgroundColor, 0.7);
        this._graphic.drawRoundedRect(0, 0, this._width, this._height, this._cornerRadius);
        this._graphic.endFill();

        this._graphic.pivot.x = this._width/2;
        this._graphic.pivot.y = this._height/2;

        this._symbolContainer = new Container();
        this._symbolContainer.addChild(this._graphic);
    }


    public setInitialPositions(_currX: number, _currY: number, _x: number, _y: number): void{
        this._currX = _currX;
        this._currY = _currY;

        this._x = _x;
        this._y = _y;

        this._graphic.x = this._currX + this._width/2;
        this._graphic.y = this._currY + this._height/2;
    }

    
    public moveSymbol(): void{
        this._moving = true;
        gsap.to(this._graphic,{ 
            duration: 2.3,
            // duration: 5.0,
            ease: "bounce.out",
            y: this._y,
            onComplete: (): void => {
                this._moving = false
            }
        });
    }


    public set yPosition(_y: number){
        this._y = _y;
    }

    public get symbolContainer(): Container{
        return this._symbolContainer;
    }

    public get symbolGraphic(): Graphics{
        return this._graphic;
    }

    public get value(): symbolValues{
        return this._value;
    }
} 