import { Application } from "pixi.js";
import { SymbolsGrid } from "./symbols/symbolsGrid";
import { StartGameButton } from "./buttons/startGameButton";
import { ResetGameButton } from "./buttons/resetGameButton";

export class ClusterController{

    private _app: Application;

    private _symbolsGrid: SymbolsGrid;


    private _startGameButton: StartGameButton;

    private _resetGameButton: ResetGameButton;

    constructor(_app: Application){
        this._app = _app;

        this._symbolsGrid = new SymbolsGrid(7, 12, this);
        this._app.stage.addChild(this._symbolsGrid.symbolGridContainer);

        this._startGameButton = new StartGameButton(this);
        this._startGameButton.setPositions(-148, 300);
        this._app.stage.addChild(this._startGameButton._buttonContainer);
        
        this._resetGameButton = new ResetGameButton(this);
        this._resetGameButton.setPositions(148, 300);
        this._app.stage.addChild(this._resetGameButton._buttonContainer);
    }

    public startGame(): void{
        this._startGameButton.onClickAnimation();
    }

    public async reset(): Promise<void> {
        this._resetGameButton.onClickAnimation();
        await this._symbolsGrid.clearGrid();
        this._symbolsGrid.addNewSymbols();
    }

    public get symbolsGrid(): SymbolsGrid{
        return this._symbolsGrid;
    }

    public get startGameButton(): StartGameButton{
        return this._startGameButton;
    }

    public get resetGameButton(): ResetGameButton{
        return this._resetGameButton;
    }
}