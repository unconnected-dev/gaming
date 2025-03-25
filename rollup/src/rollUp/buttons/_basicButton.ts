import { Container, DisplayObject, Graphics, Text } from "pixi.js";
import { BasicButtonStyling, gameColors } from "../miscStyle";
import { TweenMax } from "gsap";
import { RollupController } from "../rollupController";


/**
 * @description A selectable button in the game
 */
export class BasicButton{

    protected _rollupController:    RollupController;

    private _x!:                    number;

    private _y!:                    number;

    private _width:                 number;

    private _height:                number;

    private _lineWidth:             number;

    private _cornerRadius!:         number;

    private _borderColor!:          gameColors;

    private _backgroundColor!:      gameColors;

    private _graphic:               Graphics;

    private _buttonText!:           Text;
    
    public _buttonContainer!:       Container;

    constructor(_buttonText: string, _rollupController: RollupController){

        this._rollupController   = _rollupController;

        this._width             = BasicButtonStyling.width;
        this._height            = BasicButtonStyling.height;

        this._lineWidth         = BasicButtonStyling.lineWidth;
        this._cornerRadius      = BasicButtonStyling.cornerRadius;
        this._borderColor       = BasicButtonStyling.borderColor;
        this._backgroundColor   = BasicButtonStyling.backgroundColor;

        this._graphic = new Graphics();
        this._graphic.lineStyle(this._lineWidth, this._borderColor, 1);
        this._graphic.beginFill(this._backgroundColor, 0.5);
        this._graphic.drawRoundedRect(0, 0, this._width, this._height, this._cornerRadius);
        this._graphic.endFill();

        this._graphic.pivot.x     = this._width/2;
        this._graphic.pivot.y     = this._height/2;
        this._graphic.interactive = true;
        this._graphic.cursor      = 'pointer';


        this._buttonText = new Text(String(_buttonText), BasicButtonStyling.basicTextStyle.clone());

        this._buttonText.pivot.x = this._buttonText.width/2;
        this._buttonText.pivot.y = this._buttonText.height/2;

        this._buttonContainer = new Container();
        this._buttonContainer.addChild(this._graphic as unknown as DisplayObject, this._buttonText as unknown as DisplayObject);

        
        this._graphic.on('pointerdown', () => {this.onClick();});
    }

    public setPositions(_x: number, _y: number): void{
        this._x            = _x;
        this._y            = _y;

        this._graphic.x    = this._x + this._width/2;
        this._graphic.y    = this._y + this._height/2;

        this._buttonText.x = this._x + this._width/2;
        this._buttonText.y = this._y + this._height/2;
    }

    //This is unique for each button
    protected onClick(): void{
    }

    public onClickAnimation(): void{
        TweenMax.fromTo([this._graphic.scale, this._graphic.scale], 1, {x: 0.5, y:0.5}, {x: 1, y: 1, yoyo: true, ease: "Elastic.easeOut"});
        TweenMax.fromTo([this._buttonText.scale, this._buttonText.scale], 1, {x: 0.5, y:0.5}, {x: 1, y: 1, yoyo: true, ease: "Elastic.easeOut"});
    }

    //Remove pointer cursor to indicate button can't be clicked
    public deactivateMouseCursor(): void{
        this._graphic.cursor = 'default';
    }
    
    public activateMouseCursor(): void{
        this._graphic.cursor = 'pointer';
    }

    public get buttonContainer(): Container{
        return this._buttonContainer;
    }
}