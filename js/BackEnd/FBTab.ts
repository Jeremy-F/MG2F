/// <reference path="User.ts" />
class FBTab{
    private id : number;
    private url : string;
    private _activeChat : Array<User>;


    constructor(id: number, url : string) {
        this.id = id;
        this.url = url;
        this._activeChat = [];
    }

    get activeChat(): Array<User> {
        return this._activeChat;
    }

    public injectScript() : this {
        chrome.tabs.executeScript(this.id, {
            file: "js/dist/FacebookEnd.min.js",
            runAt: "document_end"
        }, (result) => {
            console.log("Injection in Facebook Page is finish");
            console.log(result);
            if(result[0] !== null){
                throw new Error("Error during Injecting Javascript in Facebook Page");
            }
        });
        return this;
    }
}