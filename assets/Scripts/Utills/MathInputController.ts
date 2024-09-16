import { _decorator, Component, EventKeyboard, Input, input, KeyCode, Vec2 } from 'cc';
const { ccclass } = _decorator;

@ccclass('MathInputController')
export class MathInputController extends Component {

    private static inputAxis: Vec2 = new Vec2(0, 0);

    public static get InputAxis() {
        return MathInputController.inputAxis.clone();
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
            this.UpdateAxis(null, -1);

        }
        if (event.keyCode == KeyCode.ARROW_DOWN || event.keyCode == KeyCode.KEY_S) {
            this.UpdateAxis(null, 1);
        }
        if (event.keyCode == KeyCode.ARROW_RIGHT || event.keyCode == KeyCode.KEY_D) {
            this.UpdateAxis(-1, null);
        }
        if (event.keyCode == KeyCode.ARROW_LEFT || event.keyCode == KeyCode.KEY_A) {
            this.UpdateAxis(1, null);
        }


    }

    private UpdateAxis(horizontalVelocity?: number, verticalVelocity?: number) {


        if (typeof (horizontalVelocity) == typeof (0)) {
            MathInputController.inputAxis.x += horizontalVelocity;
        }

        if (typeof (verticalVelocity) == typeof (0)) {
            MathInputController.inputAxis.y += verticalVelocity;
        }
    }

}


