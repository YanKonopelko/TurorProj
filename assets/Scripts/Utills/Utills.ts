
export class Utills {
    public get IsRelease(): boolean {
        //@ts-ignore
        if (typeof IsRelease != "undefined") return IsRelease();
        return false;
    }
    

}