import { Application, DisplayObject } from "pixi.js";
import { ResetRollupButton } from "./buttons/resetRollupButton";
import { StartRollupButton } from "./buttons/startRollupButton";
import { Announcement } from "./announcement";
import { ObjectPositions } from "./miscStyle";

export enum RollupState{
    WAITING,
    PLAYED
}

/**
 * @description Main controller to communicate between classes
 */
export class RollupController {

    private _app:                           Application;

    private _startRollupButton:             StartRollupButton;

    private _resetRollupButton:             ResetRollupButton;

    private _announcement:                  Announcement;

    private _gameState:                     RollupState;
    
    private _announcementMessage!:          string;

    private _announcementTarget!:           number;

    private _announcementTimeToComplete!:   number;

    constructor(_app: Application){
        this._app = _app;


        this._startRollupButton = new StartRollupButton(this);
        this._resetRollupButton = new ResetRollupButton(this);
        this._announcement = new Announcement(this);

        this.resize();

        this._app.stage.addChild(this._startRollupButton.buttonContainer as unknown as DisplayObject);
        this._app.stage.addChild(this._resetRollupButton.buttonContainer as unknown as DisplayObject);
        this._app.stage.addChild(this._announcement.announcementContainer as unknown as DisplayObject);

        this._gameState = RollupState.WAITING;

        this._announcementMessage = `Congratulations! \n`;
        this._announcementTarget = 99999;
        this._announcementTimeToComplete = 10;
    }

    public resize(){
        const centerX = this._app.renderer.width/2;
        
        this._startRollupButton.setPositions((centerX - this._startRollupButton.buttonContainer.width/2) + ObjectPositions.startButton.x, ObjectPositions.startButton.y);
        this._resetRollupButton.setPositions((centerX - this._resetRollupButton.buttonContainer.width/2) + ObjectPositions.resetButton.x, ObjectPositions.resetButton.y);

        this._announcement.setPositions(centerX, 0);
    }

    //Called by startRollupButton
    public startRollup(): void{
        //Don't let the rollup start if already played
        //As the player needs to reset the rollup first
        if(this._gameState == RollupState.PLAYED)
            return;

        this._startRollupButton.onClickAnimation();

        this._gameState = RollupState.PLAYED;

        this._startRollupButton.deactivateMouseCursor();

        this.initiateAnnounceResult();
    }

    //Called by resetRollupButton
    public reset(): void{
        this._resetRollupButton.onClickAnimation();

        this._gameState = RollupState.WAITING;

        this._startRollupButton.activateMouseCursor();
        
        this._announcement.reset();
    }

    private initiateAnnounceResult(): void{
        this._announcement.announce(this._announcementMessage, this._announcementTarget, this._announcementTimeToComplete);
    }
    
    public get rollupState(): RollupState{
        return this._gameState;
    }

    public get startRollupButton(): StartRollupButton{
        return this._startRollupButton;
    }

    public get resetGameButton(): ResetRollupButton{
        return this._resetRollupButton;
    }

    public get annoncement(): Announcement{
        return this._announcement;
    }

    public get app(): Application{
        return this._app;
    }
}