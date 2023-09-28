import {FPSDisplay} from "../helper/FPSDisplay.ts";
import {Player} from "../objects/player.ts";
import {PlayerAnimationStateMachine, PlayerState} from "../utils/animationStateMachine.ts";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }
    create() : void {
        new FPSDisplay(this);

        const player = new Player(this, 128, 128, 'player');

        const animationStateMachine = new PlayerAnimationStateMachine(player)

        animationStateMachine.setState(PlayerState.DEFANCE, () => animationStateMachine.setState(PlayerState.ATTACK));
    }

    update(time: number, delta: number) {
        super.update(time, delta);

    }
}