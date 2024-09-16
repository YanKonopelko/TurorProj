import { _decorator, Component, EventKeyboard, Input, input, KeyCode, Vec2 } from 'cc';
const { ccclass } = _decorator;

export enum EInputType {
    OnKeyPressing = "OnKeyPressing"
}

@ccclass('InputController')

export class InputController extends Component {

    private static inputAxis: Vec2 = new Vec2(0, 0);

    private lastVerticalInput: number = 0;
    private lastHorizontalInput: number = 0;

    private verticalInputSchedule: boolean[] = [false, false];
    private horizontalInputSchedule: boolean[] = [false, false];

    private AllKeysPhases:Map<KeyCode,boolean> = new Map<KeyCode,boolean>();

    private static AllListeners:Map<EInputType,[CallableFunction]> = new Map<EInputType,[CallableFunction]>;


    public static get InputAxis() {
        return InputController.inputAxis.clone();
    }

    public static On(inputType:EInputType,callback:CallableFunction){
        if(!InputController.AllListeners[inputType]){
            InputController.AllListeners[inputType] = [];
        }
        InputController.AllListeners[inputType].push(callback);
    }

    public static Off(inputType:EInputType,callback:CallableFunction){
        if(InputController.AllListeners[inputType].find(callback))
            InputController.AllListeners[inputType].remove(callback);
    }

    protected onEnable(): void {

        this.ResetInputs();

        let a = (event) => {this.OnFocus(event)};
        window.onfocus = function(event) {
            a(event);
        };
        let b = (event) => {this.OnBlur(event)};

        window.onblur = function(event) {
            b(event);
        };

        input.on(Input.EventType.KEY_DOWN, this.OnKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.OnKeyUp, this);
    }

    private ResetInputs(){
        const keys = Object.keys(KeyCode);        
        keys.forEach((key, index) => {
          this.AllKeysPhases[key] = false;  
        });
        this.lastHorizontalInput = 0;
        this.lastVerticalInput = 0;

        this.verticalInputSchedule = [false,false];
        this.horizontalInputSchedule = [false,false];

        InputController.inputAxis = new Vec2(0,0);
    }

    private OnBlur(any){
        console.log("OnBlur:")
        console.log(new Date());
        this.ResetInputs();
    }
    private OnFocus(any){
        console.log("OnFocus:")
        console.log(new Date());
    }

    protected onDisable(): void {
        input.off(Input.EventType.KEY_DOWN, this.OnKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.OnKeyUp, this);

        const keys = Object.keys(InputController.AllListeners);        
        keys.forEach((key, index) => {
            InputController.AllListeners[key] = [];  
        });

    }

    private OnKeyDown(event: EventKeyboard) {
        this.AllKeysPhases[event.keyCode] = true;
    
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

        this.AllKeysPhases[event.keyCode] = false;
        
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

    protected update(dt: number): void {

        const keys = Object.keys(this.AllKeysPhases);        
        keys.forEach((key, index) => {
            if(this.AllKeysPhases[key]){

                const Listenerskeys = Object.keys(InputController.AllListeners);        

                Listenerskeys.forEach((key1, index) => {
                    InputController.AllListeners[key1].forEach(callback => {
                        callback(key); ;  
                    });
                });
                
            }
        });

    
    }

}


