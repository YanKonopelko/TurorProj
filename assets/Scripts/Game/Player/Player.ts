import { _decorator, Component, director, Node } from 'cc';
const { ccclass, menu } = _decorator;

@ccclass('Player')
@menu('Player/Player')

export class Player extends Component {

    start() {

    }

    update(deltaTime: number) {
        
    }

    public Kill():void{
        console.log("Kill");
        director.loadScene(director.getScene().name);
    }

}


