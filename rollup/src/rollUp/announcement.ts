import { Container, DisplayObject, Graphics, Text } from "pixi.js";
import { AnnouncementStyling, gameColors } from "./miscStyle";
import { TweenMax } from "gsap";
import { RollupController } from "./rollupController";


/**
 * @description Basic rollup announcement
 */
export class Announcement{

    protected _rollupController:        RollupController;

    private _x!:                        number;

    private _y!:                        number;

    private _lineWidth:                 number;

    private _cornerRadius!:             number;

    private _borderColor!:              gameColors;

    private _backgroundColor!:          gameColors;
    
    private _graphic:                   Graphics;
    
    public _announcementText!:          Text;

    public _numberTextDefault!:         Text;
    
    public _numberTextExample!:         Text;

    private _announcementContainer!:    Container;
    
    constructor(_rollupController: RollupController){
        
        this._rollupController   = _rollupController;

        this._lineWidth         = AnnouncementStyling.lineWidth;
        this._cornerRadius      = AnnouncementStyling.cornerRadius;
        this._borderColor       = AnnouncementStyling.borderColor;
        this._backgroundColor   = AnnouncementStyling.backgroundColor;

        this._graphic = new Graphics();

        this._announcementText = new Text(String(``), AnnouncementStyling.basicTextStyle.clone());
        
        this._numberTextDefault = new Text(String(`0`), AnnouncementStyling.basicTextStyle.clone());
        this._numberTextDefault.scale.set(2, 2);

        this._numberTextExample = new Text(String(`0`), AnnouncementStyling.basicTextStyle.clone());
        this._numberTextExample.scale.set(2, 2);
        
        this._announcementContainer = new Container();
        this._announcementContainer.addChild(this._graphic as unknown as DisplayObject,
                                            this._announcementText as unknown as DisplayObject, 
                                            this._numberTextDefault as unknown as DisplayObject, 
                                            this._numberTextExample as unknown as DisplayObject);
    }

    public setPositions(_x: number, _y: number): void{
        this._x                  = _x;
        this._y                  = _y;

        this._graphic.x          = this._x;
        this._graphic.y          = this._y;

        this._announcementText.x = this._x;
        this._announcementText.y = this._y - 100;

        this._numberTextDefault.x = this._x;
        this._numberTextDefault.y = this._y;

        this._numberTextExample.x = this._x;
        this._numberTextExample.y = this._y + 150;
        
        this.updatePivots();
    }

    public announce(message: string, total: number): void{
        this._announcementText.text = message;
        this.updateGraphic();
        this.updatePivots();
        this.rollupNumber(total, 10);
    }

    private updateGraphic(): void{
        this._graphic.clear();
        this._graphic.lineStyle(this._lineWidth, this._borderColor, 1);
        this._graphic.beginFill(this._backgroundColor, 0.8);
        this._graphic.drawRoundedRect(0, 0, 800, 450, this._cornerRadius);
        this._graphic.endFill();
    }

    private updatePivots(): void{
        this._graphic.pivot.x = this._graphic.width/2;
        this._graphic.pivot.y = this._graphic.height/2;

        this._announcementText.anchor.set(0.5, 0.5);
        this._numberTextDefault.anchor.set(0.5, 0.5);
        this._numberTextExample.anchor.set(0.5, 0.5);
    }

    public rollupNumber(target: number, duration: number) {
        let obj = { value: parseInt(this._numberTextExample.text) || 0 }; // Start from current value
        let baseScale = 1; // Initial scale
        let milestoneThreshold = 1000; // First milestone
        let lastMilestone = 0; // Track last crossed milestone
        let milestoneCooldown = false; // Cooldown flag
    
        TweenMax.to(obj, {
            duration: duration,
            value: target,
            ease: 'power2.out',
            
            onUpdate: () => {
                const newText = Math.floor(obj.value).toString();
                this._numberTextExample.text = newText;
                this._numberTextDefault.text = newText;
    
                // Check if we've crossed the next milestone and cooldown is inactive
                if (!milestoneCooldown && Math.floor(obj.value) >= milestoneThreshold && lastMilestone < milestoneThreshold) {
                    this.scaleUp(baseScale); // Trigger the pop effect
                    lastMilestone = milestoneThreshold; // Update last milestone
                    milestoneCooldown = true; // Activate cooldown
    
                    // Increase milestone dynamically (1000 → 10000 → 100000...)
                    milestoneThreshold *= 10;
                    baseScale += 0.1; // Gradually increase baseline scale
    
                    // Set cooldown duration (e.g., 0.5 seconds)
                    setTimeout(() => {
                        milestoneCooldown = false; // Reset cooldown
                    }, 1500);
                }
    
                this.adjustKerning(newText, obj.value, target);
            },
            
            onComplete: () => {
                this._numberTextExample.text = target.toString();
                this._numberTextDefault.text = target.toString();
                this.adjustKerning(this._numberTextExample.text, target, target);
            }
        });
    }
    
    
    
    // Scaling function with bounce effect
    private scaleUp(baseScale: number) {
        const popScale = baseScale + 0.4;  // Temporary scale up

        TweenMax.to(this._numberTextExample.scale, {
            duration: 0.6,
            x: popScale,
            y: popScale,
            ease: "power2.out",
            onComplete: () => {
                // Shrink down slightly below baseline, then bounce back
                TweenMax.to(this._numberTextExample.scale, {
                    duration: 0.4,
                    x: baseScale - 0.2, 
                    y: baseScale - 0.2,
                    ease: "power2.inOut",
                    onComplete: () => {
                        TweenMax.to(this._numberTextExample.scale, {
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

    private adjustKerning(text: string, currentValue: number, targetValue: number) {
        // Progress from 1 to 0
        let progress = Math.abs(currentValue - targetValue) / targetValue; 
    
        let maxSpacing = 50;
        let spacing = maxSpacing * Math.pow(progress, 0.25); 
        this._numberTextExample.style.letterSpacing = spacing;

        // Make the number bigger at the end
        // let scaleProgress = Math.pow(progress, 0.25);
        // let scale = 2 - 0.6 * scaleProgress;
        // this._numberTextExample.scale.set(scale);
    }
    
    
    public reset(): void{
        this._announcementText.text = ``;
        this._numberTextDefault.text = ``;
        this._numberTextExample.text = ``;
        this._graphic.clear();
        this.updatePivots();
    }

    public get announcementContainer(): Container{
        return this._announcementContainer;
    }
}