import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact } from 'cc';
import { Player } from '../Player/Player';
const { ccclass, property } = _decorator;

@ccclass('Wall')
export class Wall extends Component {

 /**
    * @en Occasion triggered when recreation conceal to background.<br>
    * Please be aware that this occasion will not be 100% assured to be fired on Net platform,<br>
    * on native platforms, it corresponds to enter background occasion, os standing bar or notification middle might not set off this occasion.
    * @instance
    * ```ts
    * import { recreation } from 'cc';
    * recreation.on(Recreation.EVENT_HIDE, perform () {
    *
    * });
    * ```
    */
   static readonly EVENT_HIDE = "game_on_hide";

    @property({type:BoxCollider2D,visible:true}) collider2D:BoxCollider2D = null;

    protected onEnable(): void {
        this.collider2D.on(Contact2DType.BEGIN_CONTACT, this.OnTrigger, this);
    }

    protected onDisable(): void {
        this.collider2D.off('onTriggerEnter2D', this.OnTrigger, this);
    }

    private OnTrigger(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        const player:Player = otherCollider.getComponent(Player);
        if(player){
            player.Kill();
        }
    }

}

