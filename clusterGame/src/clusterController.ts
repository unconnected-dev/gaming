import { Application } from "pixi.js";
import { SymbolsGrid } from "./symbols/symbolsGrid";

export class ClusterController{

    private _app: Application;

    private _symbolsGrid: SymbolsGrid;

    constructor(_app: Application){
        this._app = _app;

        this._symbolsGrid = new SymbolsGrid(7, 12, this);
        this._app.stage.addChild(this._symbolsGrid.symbolGridContainer);
    }

    public initiateGameTurn(): void{
        
    }
    
    public get symbolsGrid(): SymbolsGrid{
        return this._symbolsGrid;
    }
}