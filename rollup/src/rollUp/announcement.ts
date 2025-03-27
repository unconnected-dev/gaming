import { BlurFilter, Container, DisplayObject, Graphics, Text } from "pixi.js";
import { AnnouncementStyling, gameColors, ObjectPositions } from "./miscStyle";
import { TweenMax } from "gsap";
import { RollupController } from "./rollupController";


/**
 * @description Basic rollup announcement
 */
export class Announcement{

    protected _rollupController:        RollupController;

    private _x!:                        number;

    private _y!:                        number;

    private _width:                     number;

    private _height:                    number;

    private _lineWidth:                 number;

    private _cornerRadius!:             number;

    private _borderColor!:              gameColors;

    private _backgroundColor!:          gameColors;
    
    private _graphic:                   Graphics;
    
    public _announcementText!:          Text;

    public _numberTextDefault!:         Text;
    
    public _numberTextExample1!:         Text;

    private _blurFilter!:               BlurFilter;
    
    private _announcementContainer!:    Container;

    constructor(_rollupController: RollupController){
        
        this._rollupController   = _rollupController;

        this._width             = AnnouncementStyling.width;
        this._height            = AnnouncementStyling.height;

        this._lineWidth         = AnnouncementStyling.lineWidth;
        this._cornerRadius      = AnnouncementStyling.cornerRadius;
        this._borderColor       = AnnouncementStyling.borderColor;
        this._backgroundColor   = AnnouncementStyling.backgroundColor;

        this._graphic = new Graphics();
        this.updateGraphic();

        this._announcementText = new Text(String(``), AnnouncementStyling.basicTextStyle.clone());
        
        this._numberTextDefault = new Text(String(``), AnnouncementStyling.basicTextStyle.clone());

        this._numberTextExample1 = new Text(String(``), AnnouncementStyling.basicTextStyle.clone());
        
        this._blurFilter = new BlurFilter(10);
        this._announcementText.filters = [this._blurFilter];
        

        this._announcementContainer = new Container();
        this._announcementContainer.addChild(this._graphic as unknown as DisplayObject,
                                            this._announcementText as unknown as DisplayObject, 
                                            this._numberTextDefault as unknown as DisplayObject, 
                                            this._numberTextExample1 as unknown as DisplayObject);
    }

    public setPositions(_x: number, _y: number): void{
        this._x                  = _x;
        this._y                  = _y;

        this._graphic.x          = this._x + ObjectPositions.announcementGraphic.x;
        this._graphic.y          = this._y + ObjectPositions.announcementGraphic.y;

        this._announcementText.x = this._x + ObjectPositions.announcementText.x;
        this._announcementText.y = this._y + ObjectPositions.announcementText.y;

        this._numberTextDefault.x = this._x + ObjectPositions.numberTextDefault.x;
        this._numberTextDefault.y = this._y + ObjectPositions.numberTextDefault.y;

        this._numberTextExample1.x = this._x + ObjectPositions.numberTextExample.x;
        this._numberTextExample1.y = this._y + ObjectPositions.numberTextExample.y;
        
        this.updatePivots();
    }

    public announce(message: string, target: number, timeToComplete: number): void{
        this._announcementText.text = message;
        this.updatePivots();
        this.rollupNumberDefault(target, timeToComplete);
        this.rollupNumberExample1(target, timeToComplete);
    }

    private updateGraphic(): void{
        this._graphic.clear();
        this._graphic.lineStyle(this._lineWidth, this._borderColor, 1);
        this._graphic.beginFill(this._backgroundColor, 0.8);
        this._graphic.drawRoundedRect(0, 0, this._width, this._height, this._cornerRadius);
        this._graphic.endFill();
    }

    private updatePivots(): void{
        this._graphic.pivot.x = this._graphic.width/2;
        this._graphic.pivot.y = this._graphic.height/2;

        this._announcementText.anchor.set(0.5, 0.5);
        this._numberTextDefault.anchor.set(0.5, 0.5);
        this._numberTextExample1.anchor.set(0.5, 0.5);
    }

    public rollupNumberDefault(target: number, duration: number){
        // Start from current value
        const obj = { value: parseInt(this._numberTextDefault.text) || 0 }; 

        TweenMax.to(obj, {
            duration: duration,
            value: target,
            ease: 'power2.out',
            
            onUpdate: () => {
                const newText = Math.floor(obj.value).toString();
                this._numberTextDefault.text = newText;
            },
            onComplete: () => {
                this._numberTextDefault.text = target.toString();
            }
        });
    }

    public rollupNumberExample1(target: number, duration: number) {
        // Start from current value
        const obj = { value: parseInt(this._numberTextExample1.text) || 0 }; 
        let baseScale = 1;
        const milestones = [1000, 5000, 7500];
        let currentMilestoneIndex = 0;
        let milestoneCooldown = false;
        
        TweenMax.to(obj, {
            duration: duration,
            value: target,
            ease: 'power2.out',
            
            onUpdate: () => {
                const newText = Math.floor(obj.value).toString();
                this._numberTextExample1.text = newText;
    
                // Check if we've crossed the next milestone and cooldown is inactive
                if (!milestoneCooldown && obj.value >= milestones[currentMilestoneIndex]) {
                    this.scaleUp(baseScale); // Trigger the pop effect
                    currentMilestoneIndex++; // Move to next milestone
                    
                    baseScale += 0.1; // Gradually increase baseline scale
                    
                    milestoneCooldown = true;
                    
                    // Set cooldown duration (slow down when reaching milestone)
                    setTimeout(() => {
                        milestoneCooldown = false;
                    }, 1500); // Adjust this value to control the slowdown duration
    
                    // Move to the next milestone in the array
                    if (currentMilestoneIndex < milestones.length) {
                        milestoneCooldown = true;
                    }
                }
    
                this.adjustKerning(obj.value, target);
            },
            
            onComplete: () => {
                this._numberTextExample1.text = target.toString();
                this.adjustKerning(target, target);
            }
        });
    
        this.adjustBlurFilter(duration);
    }
    
    
    
    // Scaling function with bounce effect
    private scaleUp(baseScale: number) {
        const popScale = baseScale + 0.4;  // Temporary scale up

        TweenMax.to(this._numberTextExample1.scale, {
            duration: 0.6,
            x: popScale,
            y: popScale,
            ease: "power2.out",
            onComplete: () => {
                // Shrink down slightly below baseline, then bounce back
                TweenMax.to(this._numberTextExample1.scale, {
                    duration: 0.4,
                    x: baseScale - 0.2, 
                    y: baseScale - 0.2,
                    ease: "power2.inOut",
                    onComplete: () => {
                        TweenMax.to(this._numberTextExample1.scale, {
                            duration: 0.2,
                            x: baseScale,
                            y: baseScale,
                            ease: "bounce.out"
                        });
                    }
                });
            }
        });
    }

    private adjustKerning(currentValue: number, targetValue: number) {
        // Progress from 1 to 0
        const progress = Math.abs(currentValue - targetValue) / targetValue; 
    
        const maxSpacing = 30;
        const minSpacing = 10;

        // Interpolate spacing so it smoothly transitions but never drops below 10
        // Ensures minimum spacing 
        const announcementSpacing = minSpacing + (maxSpacing - minSpacing) * Math.pow(progress, 0.5);
        const numberSpacing = maxSpacing * Math.pow(progress, 0.25); 

        this._announcementText.style.letterSpacing = announcementSpacing;

        this._numberTextExample1.style.letterSpacing = numberSpacing;
    }
    
    private adjustBlurFilter(duration: number){
        TweenMax.to(this._blurFilter, {
            blur: 0,
            duration: duration,
            ease: 'power1.out'
        });
    }    


    public reset(): void{
        this._announcementText.text = ``;
        this._numberTextDefault.text = ``;
        this._numberTextExample1.text = ``;
        this.updatePivots();

        this._blurFilter.blur = 10;
    }

    public get announcementContainer(): Container{
        return this._announcementContainer;
    }
}