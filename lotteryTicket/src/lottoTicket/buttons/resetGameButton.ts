import { LottoController } from "../lottoController";
import { BasicButton } from "./_basicButton";

/**
 * @description Reset button
 *              Resets game state to LottoState.SELECTING
 *              Removes all player selected numbers
 *              Resets winning numbers to `?` / 0 value
 *              Gets rid of the announcement screen
 */
export class ResetGameButton extends BasicButton{

    constructor(_lottoController: LottoController){
        const _buttonText = `Reset Game`;
        super(_buttonText, _lottoController);
    }

    protected override onClick(): void {
        this._lottoController.reset();
    }
}