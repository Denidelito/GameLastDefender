import {Player} from "../objects/player.ts";

export enum PlayerState {
    IDLE,
    MOVE_DOWN,
    MOVE_LEFT,
    MOVE_RIGHT,
    ATTACK,
    DEFANCE,
}

export class PlayerAnimationStateMachine {
    private player: Player;
    private currentState: PlayerState;

    constructor(player: Player) {
        this.player = player;
        this.currentState = PlayerState.IDLE;
    }

    setState(newState: PlayerState, onCompleteCallback?: () => void) {
        if (newState !== this.currentState) {
            this.currentState = newState;
            this.updateAnimation(onCompleteCallback);
        }
    }

    private updateAnimation(onCompleteCallback?: () => void) {
        switch (this.currentState) {
            case PlayerState.IDLE:
                this.player.play('idle');
                break;

            case PlayerState.MOVE_DOWN:
                this.player.play('move_down');
                break;

            case PlayerState.MOVE_LEFT:
                this.player.play('move_left');
                break;

            case PlayerState.MOVE_RIGHT:
                this.player.play('attack');
                break;

            case PlayerState.ATTACK:
                this.player.play('attack');
                break;

            case PlayerState.DEFANCE:
                this.player.play('defence');
                break;

            default:
                break;
        }

        if (onCompleteCallback) {
            this.player.once(Phaser.Animations.Events.ANIMATION_REPEAT, onCompleteCallback);
        }
    }
}
