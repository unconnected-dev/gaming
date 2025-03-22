import { RollupController, RollupState } from "../rollupController";
import { BasicButton } from "./_basicButton";

/**
 * @description Start game button
 *              Starts rollup
 */
export class StartRollupButton extends BasicButton{
    
    constructor(_rollupController: RollupController){
        const _buttonText = `Start Rollup`;
        super(_buttonText, _rollupController);
    }

    protected override onClick(): void {
        //Start game is not a reset
        if(this._rollupController.rollupState === RollupState.PLAYED)
            return;

        this._rollupController.startRollup();
    }
}