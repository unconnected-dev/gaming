import { Container, Graphics, Text } from "pixi.js";
import { LottoController } from "./lottoController";
import { AnnouncementStyle, gameColors } from "./miscStyle";
import { TweenMax } from "gsap";


/**
 * @description Announcement to show after a game has been played
 *              what the result was
 */
export class Announcement{

    protected _lottoController: LottoController;

    private _x!:                        number;

    private _y!:                        number;

    private _lineWidth:                 number;

    private _cornerRadius!:             number;

    private _borderColor!:              gameColors;

    private _backgroundColor!:          gameColors;
    
    private _graphic:                   Graphics;
    
    public _announcementText!:          Text;

    private _announcementContainer!:    Container;
    
    constructor(_lottoController: LottoController){
        
        this._lottoController   = _lottoController;

        this._lineWidth         = AnnouncementStyle.lineWidth;
        this._cornerRadius      = AnnouncementStyle.cornerRadius;
        this._borderColor       = AnnouncementStyle.borderColor;
        this._backgroundColor   = AnnouncementStyle.backgroundColor;

        this._graphic = new Graphics();

        this._announcementText = new Text(String(``), 
            {
                fontFamily:  AnnouncementStyle.fontFamily,
                fontVariant: `small-caps`, 
                fontSize:    AnnouncementStyle.fontSize, 
                fill:        AnnouncementStyle.fontColor, 
                align:       `center`
            });
        
        this._announcementContainer = new Container();
        this._announcementContainer.addChild(this._graphic, this._announcementText);
    }

    public setPositions(_x: number, _y: number): void{
        this._x                  = _x;
        this._y                  = _y;

        this._graphic.x          = this._x;
        this._graphic.y          = this._y;

        this._announcementText.x = this._x;
        this._announcementText.y = this._y;
    }

    public announce(message: string): void{
        this._announcementText.text = message;
        this.updateGraphic();
        this.updatePivots();
        this.popAnimation();
    }

    private updateGraphic(): void{
        this._graphic.clear();
        this._graphic.lineStyle(this._lineWidth, this._borderColor, 1);
        this._graphic.beginFill(this._backgroundColor, 0.8);
        this._graphic.drawRoundedRect(0, 0, this._announcementText.width + 20, this._announcementText.height + 20, this._cornerRadius);
        this._graphic.endFill();
    }

    private updatePivots(): void{
        this._graphic.pivot.x = this._graphic.width/2;
        this._graphic.pivot.y = this._graphic.height/2;

        this._announcementText.pivot.x = this._announcementText.width/2;
        this._announcementText.pivot.y = this._announcementText.height/2;
    }

    private popAnimation(): void{
        TweenMax.fromTo([this._graphic.scale, this._graphic.scale], 1, {x: 0, y:0}, {x: 1, y: 1, yoyo: true, ease: "Elastic.easeOut"});
        TweenMax.fromTo([this._announcementText.scale, this._announcementText.scale], 1, {x: 0, y:0}, {x: 1, y: 1, yoyo: true, ease: "Elastic.easeOut"});
    }

    public reset(): void{
        this._announcementText.text = ``;
        this._graphic.clear();
        this.updatePivots();
    }

    public get announcementContainer(): Container{
        return this._announcementContainer;
    }
}