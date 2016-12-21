/// <reference path="../../typings/index.d.ts" />
///<reference path="../MultiEnd/Config.ts"/>
///<reference path="../MultiEnd/MessageType.ts"/>
class User{
    /**
     * Facebook User ID
     * Can be a string or a number
     */
    private _id : number|string;
    private initializedChat : boolean;

    /**
     * Constructor to create a new User
     * @param {number|string} id The Facebook User ID
     */
    constructor(id: number|string) {
        this._id = id;
    }

    /**
     *
     * @returns {User}
     */
    public initializeChat(){

    }
    /**
     * Facebook User ID
     * @returns {number|string} Return the Facebook User ID
     */
    get id(): number|string {return this._id;}
    public sendMessage(){
        chrome.runtime.sendMessage(Config.EXTENSIONID, {
            "typXe" : MessageType.initConversation, "test" : "mmmm"
        }, function (response) {
            console.log(response);
        });
    }

}
let us : User = new User(222);
us.sendMessage();
console.log("Succes of Injection");