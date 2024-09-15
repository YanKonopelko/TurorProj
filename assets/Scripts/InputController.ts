import { _decorator, Component, EventKeyboard, Input, input, KeyCode, Node, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('InputController')
export class InputController extends Component {

    private static inputAxis: Vec2 = new Vec2(0, 0);

    private lastVerticalInput: number = 0;
    private lastHorizontalInput: number = 0;

    private verticalInputSchedule: boolean[] = [false, false];
    private horizontalInputSchedule: boolean[] = [false, false];


    public static get InputAxis() {
        return InputController.inputAxis.clone();
    }

    protected onEnable(): void {
        input.on(Input.EventType.KEY_DOWN, this.OnKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.OnKeyUp, this);
    }

    protected onDisable(): void {
        input.off(Input.EventType.KEY_DOWN, this.OnKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.OnKeyUp, this);
    }

    private OnKeyDown(event: EventKeyboard) {

        if (event.keyCode == KeyCode.ARROW_UP || event.keyCode == KeyCode.KEY_W) {
            this.UpdateAxis(null, 1);
        }
        if (event.keyCode == KeyCode.ARROW_LEFT || event.keyCode == KeyCode.KEY_A) {
            this.UpdateAxis(-1, null);
        }
        if (event.keyCode == KeyCode.ARROW_DOWN || event.keyCode == KeyCode.KEY_S) {
            this.UpdateAxis(null, -1);
        }
        if (event.keyCode == KeyCode.ARROW_RIGHT || event.keyCode == KeyCode.KEY_D) {
            this.UpdateAxis(1, null);
        }
    }

    private OnKeyUp(event: EventKeyboard) {

        
        if (event.keyCode == KeyCode.ARROW_UP || event.keyCode == KeyCode.KEY_W) {

            if (this.lastVerticalInput == 1) {
                this.UpdateAxis(null, 0, false);
            }
            this.verticalInputSchedule[1] = false;

            if (this.verticalInputSchedule[0]) {
                this.UpdateAxis(null, -1, false);
            }

        }
        if (event.keyCode == KeyCode.ARROW_DOWN || event.keyCode == KeyCode.KEY_S) {
            if (this.lastVerticalInput == -1) {
                this.UpdateAxis(null, 0, false);

            }
            this.verticalInputSchedule[0] = false;

            if (this.verticalInputSchedule[1]) {
                this.UpdateAxis(null, 1, false);
            }


        }
        if (event.keyCode == KeyCode.ARROW_RIGHT || event.keyCode == KeyCode.KEY_D) {
            if (this.lastHorizontalInput == 1) {
                this.UpdateAxis(0, null, false);
            }
            this.horizontalInputSchedule[1] = false;
            if (this.horizontalInputSchedule[0]) {
                this.UpdateAxis(-1,null, false);
            }
        }
        if (event.keyCode == KeyCode.ARROW_LEFT || event.keyCode == KeyCode.KEY_A) {
            if (this.lastHorizontalInput == -1) {
                this.UpdateAxis(0, null, false);
            }
            this.horizontalInputSchedule[0] = false;
            if (this.horizontalInputSchedule[1]) {
                this.UpdateAxis(1,null, false);
            }

        }


    }

    private UpdateAxis(horizontalVelocity?: number, verticalVelocity?: number, withPush: boolean = true) {


        if (typeof (horizontalVelocity) == typeof (0)) {

            if (withPush) {
                let idx = horizontalVelocity == 1 ? 1 : 0;
                this.horizontalInputSchedule[idx] = true;
            }
            InputController.inputAxis.x = horizontalVelocity;
            this.lastHorizontalInput = horizontalVelocity;
        }

        if (typeof (verticalVelocity) == typeof (0)) {
            if (withPush) {
                let idx = verticalVelocity == 1 ? 1 : 0;
                this.verticalInputSchedule[idx] = true;
            }

            InputController.inputAxis.y = verticalVelocity;
            this.lastVerticalInput = verticalVelocity;
        }
    }

}


