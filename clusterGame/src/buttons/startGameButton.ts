import { ClusterController } from "../clusterController";
import { BasicButton } from "./_basicButton";

/**
 * @description Start game button
 *              Starts a cluster game to begin playing
 */
export class StartGameButton extends BasicButton{

    constructor(_clusterController: ClusterController){
        const _buttonText = `Start Game`;
        super(_buttonText, _clusterController);
    }

    protected override onClick(): void {
        this._clusterController.startGame();
    }
}