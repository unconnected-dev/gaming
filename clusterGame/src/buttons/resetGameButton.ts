import { ClusterController } from "../clusterController";
import { BasicButton } from "./_basicButton";

/**
 * @description Reset button
 *              Resets the cluster game to be empty
 *              Resets the cluster total to be zero
 *              Gets rid of the announcement screen
 */
export class ResetGameButton extends BasicButton{

    constructor(_clusterController: ClusterController){
        const _buttonText = `Reset Game`;
        super(_buttonText, _clusterController);
    }

    protected override onClick(): void {
        this._clusterController.reset();
    }
}