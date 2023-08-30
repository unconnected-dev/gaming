import { LottoController, LottoState } from "../lottoController";
import { BasicButton } from "./_basicButton"

/**
 * @description Lucky dip button
 *              Randomly picks 6 numbers for the player
 */
export class LuckyDipButton extends BasicButton{

    constructor(_lottoController: LottoController){
        const _buttonText = `Lucky Dip`;
        super(_buttonText, _lottoController);
    }

    protected override onClick(): void {
        //Lucky dip is not a reset
        if(this._lottoController.lottoState === LottoState.PLAYED)
            return;

        this._lottoController.luckyDip();
    }
}