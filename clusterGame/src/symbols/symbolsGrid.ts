import { Container } from "pixi.js";
import { Symbol } from "./symbol";
import { getGameColor, getSymbolValue, symbolStyle } from "../miscStyle";
import { ClusterController } from "../clusterController";

/**
 * @description Symbols Grid
 *              This is the basic grid that will hold all the symbols in an array
 */
export class SymbolsGrid {

    public static readonly waitToClear: number = 0.5;

    private _clusterController!:     ClusterController;

    private SYMBOL_GRID_DEBUG:      boolean = false;

    private _gridSizeX!:            number;

    private _gridSizeY!:            number;

    private _symbolsArray:          Symbol[][] = [];

    private _symbolGridContainer!:  Container;

    private EMPTY_SYMBOL!:          Symbol;

    private _checkGameTurn!:        boolean;

    constructor(gridSizeX: number, gridSizeY: number, _clusterController: ClusterController){

        this._clusterController = _clusterController;

        this._gridSizeX = gridSizeX;

        this._gridSizeY = gridSizeY;

        this.EMPTY_SYMBOL = this.createBasicSymbol(0);
        //Initialize array to set size
        //Fill with empty symbols
        this.initSymbolsArray();
    }
 

    private initSymbolsArray(): void{
        this._symbolGridContainer = new Container();
        
        for(let y = 0; y < this._gridSizeY; y++){
            const row: Symbol[] = [];
            for(let x = 0; x < this._gridSizeX; x++){
                            
                //This is the value we will use to match
                //with other symbols just random atm
                const randomValue  = Math.floor(Math.random() * 5) + 1;

                const aGameSymbol = this.createGameSymbol(randomValue, x, y);
                this._symbolGridContainer.addChild(aGameSymbol.symbolContainer);
                row.push(aGameSymbol);
            }
            console.log(row)
            this._symbolsArray.push(row);
        }

        if(this.SYMBOL_GRID_DEBUG){
            console.log(`initSymbolsArray...`)
            console.log(this._symbolsArray);
        }
    }

    public addNewSymbols(): void{
        let newSymbolsCounter = 0;
        for (let row = 0; row < this._gridSizeY; row++) {
            for (let col = 0; col < this._gridSizeX; col++) {
                if(this._symbolsArray[row][col] === this.EMPTY_SYMBOL){
                    // console.log(`${row}:${col}`);
                    newSymbolsCounter++;
                    const randomValue  = Math.floor(Math.random() * 5) + 1;

                    const aGameSymbol = this.createGameSymbol(randomValue, col, row);
                    this._symbolGridContainer.addChild(aGameSymbol.symbolContainer);
                    this._symbolsArray[row][col] = aGameSymbol
                }
            }
        }
        console.log(`newSymbolsCounter: ${newSymbolsCounter}`);
    }

    private createGameSymbol(_symbolValue: number, _gridX: number, _gridY: number): Symbol{
        const aGameSymbol  = this.createBasicSymbol(_symbolValue);

        const symbolWidth  = symbolStyle.width;
        const symbolHeight = symbolStyle.height;
        const margin       = symbolStyle.margin;

        //Set symbols to be out of area to drop down
        const cX = _gridX*symbolWidth + _gridX*margin;
        const cY = -(this._gridSizeY*symbolHeight + this._gridSizeY*margin) + (_gridY*symbolHeight + _gridY*margin);

        const sX = _gridX*symbolWidth  + _gridX*margin;
        const sY = _gridY*symbolHeight + _gridY*margin;
        aGameSymbol.setInitialPositions(cX, cY, sX, sY);
        aGameSymbol.moveSymbol();

        return aGameSymbol;
    }

    private createBasicSymbol(_symbolValue: number): Symbol{
        const width            = symbolStyle.width;
        const height           = symbolStyle.height;
        const lineWidth        = symbolStyle.lineWidth;
        const cornerRadius     = symbolStyle.cornerRadius;
        
        const borderColor      = symbolStyle.borderColor
        const backgroundColor  = getGameColor(_symbolValue);
        const symbolValue      = getSymbolValue(_symbolValue);

        const aGameSymbol = new Symbol(width, height, lineWidth, cornerRadius, borderColor, backgroundColor, symbolValue, this._clusterController)
        return aGameSymbol;
    } 


    //Cluster detection
    public getClusters(): void{
        const visited: boolean[][] = Array.from({ length: this._gridSizeY }, () => Array(this._gridSizeX).fill(false));
        const clusters: [number, number][][] = [];

        for (let row = 0; row < this._gridSizeY; row++) {
            for (let col = 0; col < this._gridSizeX; col++) {
                if(!visited[row][col]) {
                    const cluster = this.detectCluster(row, col, visited);
                    
                    if(cluster.length >= 3) 
                        clusters.push(cluster);
                }
            }
        }
        
        if(clusters.length > 0){
            // console.log(`Clusters Detected: `);
            //row, col
            clusters.forEach((cluster, index) => {
                let buildString = ``;
                cluster.forEach((number, index) => {
                    buildString += ` ${number[1]}:${number[0]},`;
                });
                buildString = buildString.slice(0, -1)
                // console.log(`${buildString}`);
            });
        }

        this.removeClusters(clusters);
        this.dropDownRemainingSymbols();
        this.addNewSymbols();

    }

    private detectCluster(row: number, col: number, visited: boolean[][]): [number, number][]{
        const symbolType = this._symbolsArray[row][col].value;

        let cluster: [number, number][] = [];

        const checkNextTo = (r: number, c: number): void =>{
            if( r >= 0 && r < this._gridSizeY &&
                c >= 0 && c < this._gridSizeX &&
                !visited[r][c] &&
                this._symbolsArray[r][c].value === symbolType){
                    
                    visited[r][c] = true;
                    cluster.push([r, c]);
                    checkNextTo(r - 1, c);//above
                    checkNextTo(r + 1, c);//below  
                    checkNextTo(r, c - 1);//left
                    checkNextTo(r, c + 1);//right
                }
        }
        checkNextTo(row, col);

        return cluster;
    }

    //Remove detected clusters from the array
    private removeClusters(clusters:[number, number][][]): void{
        clusters.forEach((cluster => {
            cluster.forEach(([row, col]) => {
                const aSymbol = this._symbolsArray[row][col];
                
                if(aSymbol)
                    this._symbolGridContainer.removeChild(aSymbol.symbolContainer);
                
                this._symbolsArray[row][col] = this.EMPTY_SYMBOL;
            });
        }));
    }

    //Remove all symbols from the entire grid
    public async clearGrid(): Promise<void>{

        await this.animateClearGrid();

        for(let i = 0; i < this._symbolsArray.length; i++){
            const row = this._symbolsArray[i];
            for(let j = 0; j < row.length; j++){
                const aSymbol = this._symbolsArray[i][j];
                aSymbol.animateRemoveSymbol();

                if(aSymbol)
                    this._symbolGridContainer.removeChild(aSymbol.symbolContainer);

                this._symbolsArray[i][j] = this.EMPTY_SYMBOL;
            }
        }
    }

    //Wait on the animation
    async animateClearGrid(): Promise<void>{
        
        for(let i = 0; i < this._symbolsArray.length; i++){
            const row = this._symbolsArray[i];
            for(let j = 0; j < row.length; j++){
                const aSymbol = this._symbolsArray[i][j];
                aSymbol.animateRemoveSymbol();
            }
        }

        await new Promise<void>((resolve, reject) => {
            setTimeout(resolve, (Symbol.timeToHideSymbol + SymbolsGrid.waitToClear) * 1000);
        });
    }


    private dropDownRemainingSymbols(): void{
        const nonEmptySymbols: Symbol[] = [];
        const symbolHeight = symbolStyle.height;
        const margin       = symbolStyle.margin;

        //Iterate through grid from top to bottom
        for(let col = 0; col < this._gridSizeX; col++){
            for(let row = 0; row < this._gridSizeY; row++){
                const aSymbol = this._symbolsArray[row][col];

                //If not empty add symbol to nonEmptySymbols array
                if(aSymbol !== this.EMPTY_SYMBOL)
                    nonEmptySymbols.push(aSymbol);
                
                //Empty that cell
                this._symbolsArray[row][col] = this.EMPTY_SYMBOL;
            }
            
            //Starting from bottom, assign symbols from nonEmptySymbols
            //to fill the empty cells in the column
            let newRow = this._gridSizeY - 1;
            while(nonEmptySymbols.length > 0){
                this._symbolsArray[newRow][col] = nonEmptySymbols.pop()!;

                // const sY = newRow*symbolHeight + newRow*margin;
                const sY = (newRow*symbolHeight + newRow*margin);

                this._symbolsArray[newRow][col].yPosition = sY;
                this._symbolsArray[newRow][col].moveSymbol();

                newRow--;
            }
        }
    }


    public get symbolGridContainer(): Container{
        return this._symbolGridContainer;
    }

    public get checkGameTurn(): boolean{
        return this._checkGameTurn;
    }
}