///<reference path="../MultiEnd/MessageType.ts"/>
/**
 * Created by jeremyfornarino on 21/12/2016.
 */
class Message{
    private type : MessageType;


    constructor(type: MessageType) {
        this.type = type;
    }

    public static thisIsRealMessage(request: any) : boolean{
        let tempMessage = new Message(MessageType.cryptMessage);
        for(let key in tempMessage){
            if(!request.hasOwnProperty(key)){
                return false;
            }
        }
        return true;
    }

    public static createMessageFromObj(request: any) : Message{
        return new Message(request.type);
    }
}