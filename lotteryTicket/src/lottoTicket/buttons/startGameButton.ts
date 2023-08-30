import { LottoController, LottoState } from "../lottoController";
import { BasicButton } from "./_basicButton";

/**
 * @description Start game button
 *              Creates winning numbers
 *              Compares winning numbers against player numbers
 *              Sets the announcement to show up
 */
export class StartGameButton extends BasicButton{
    
    constructor(_lottoController: LottoController){
        const _buttonText = `Start Game`;
        super(_buttonText, _lottoController);
    }

    protected override onClick(): void {
        //Start game is not a reset
        if(this._lottoController.lottoState === LottoState.PLAYED)
            return;

        this._lottoController.startGame();
    }
}