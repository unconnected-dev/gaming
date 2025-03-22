import { RollupController } from "../rollupController";
import { BasicButton } from "./_basicButton";

/**
 * @description Reset button
 *              Resets rollup
 */
export class ResetRollupButton extends BasicButton{

    constructor(_rollupController: RollupController){
        const _buttonText = `Reset Rollup`;
        super(_buttonText, _rollupController);
    }

    protected override onClick(): void {
        this._rollupController.reset();
    }
}