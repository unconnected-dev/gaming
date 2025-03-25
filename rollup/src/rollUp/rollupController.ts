import { Application, DisplayObject } from "pixi.js";
import { ResetRollupButton } from "./buttons/resetRollupButton";
import { StartRollupButton } from "./buttons/startRollupButton";
import { Announcement } from "./announcement";

export enum RollupState{
    WAITING,
    PLAYED
}

/**
 * @description Main controller to communicate between classes
 */
export class RollupController {

    private _app:                   Application;

    private _startRollupButton:     StartRollupButton;

    private _resetRollupButton:     ResetRollupButton;

    private _announcement:          Announcement;

    private _gameState:             RollupState;
    
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
    }

    public resize(){
        const centerX = this._app.renderer.width/2;
        
        this._startRollupButton.setPositions((centerX - this._startRollupButton.buttonContainer.width/2) - 148, 450);
        this._resetRollupButton.setPositions((centerX - this._resetRollupButton.buttonContainer.width/2) + 148, 450);

        this._announcement.setPositions(centerX, 200);
    }

    public startRollup(): void{
        //Don't let the game start if already played
        //As the player needs to reset the game first
        if(this._gameState == RollupState.PLAYED)
            return;

        this._startRollupButton.onClickAnimation();

        this._gameState = RollupState.PLAYED;

        this._startRollupButton.deactivateMouseCursor();

        this.initiateAnnounceResult();
    }

    public reset(): void{
        this._resetRollupButton.onClickAnimation();

        this._gameState = RollupState.WAITING;

        this._startRollupButton.activateMouseCursor();
        
        this._announcement.reset();
    }

    private initiateAnnounceResult(): void{
        const message = `Congratulations you won! \n`;
        const total = 99999;

        this._announcement.announce(message, total);
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