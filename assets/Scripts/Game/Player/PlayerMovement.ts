import { _decorator, CCFloat, Component, EventKeyboard, input, Input, KeyCode, Node, RigidBody2D, Vec2  } from 'cc';
import { Player } from './Player';
import { EInputType, InputController } from '../../Utills/InputController';
const { ccclass, property,executionOrder,executeInEditMode,requireComponent,disallowMultiple,menu,help } = _decorator;




@ccclass('PlayerMovement')

@executeInEditMode(true)
@requireComponent(Player)
@executionOrder(0)
@disallowMultiple(true)
@menu('Player/PlayerMovement')
@help('https://disk.yandex.ru/i/xGemc0TG4DlmLw')

 /* https://docs.cocos.com/creator/3.8/manual/en/scripting/decorator.html */

export class PlayerMovement extends Component {

    //#region Tutorial
    @property({
        type: Node,
        visible: true,
        displayName:"Target",
        /* https://docs.cocos.com/creator/3.8/manual/en/scripting/reference/attributes.html */
    })
    targetNode: Node | null = null;

    @property({
        type: [Node],
    })
    specNodes: Node[] = [];

    @property({
        type: [Node],
    })
    _secNodes: Node[] = [];


  

    //#endregion Tutorial


    @property({type: RigidBody2D, visible:true, displayName:"RigidBody2D"}) rb: RigidBody2D = null;

    @property({type: CCFloat, visible:true}) moveSpeed: number = 0;


    private currentInputVelocity:Vec2 = new Vec2(0,0);

    protected onEnable(): void {
        InputController.On(EInputType.OnKeyPressing,this.KeyPress)
        
    }

    protected onDisable(): void {
        InputController.Off(EInputType.OnKeyPressing,this.KeyPress)
    }
    protected onDestroy(): void {
        InputController.Off(EInputType.OnKeyPressing,this.KeyPress)
    }

    private KeyPress(keyCode:KeyCode){
        console.log(keyCode);
    }

    protected update(dt: number): void {
        this.rb.linearVelocity = (InputController.InputAxis.multiplyScalar(this.moveSpeed*dt));
        
    }


}


