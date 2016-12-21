/// <reference path="../../typings/index.d.ts" />
/// <reference path="FBTab.ts" />
/// <reference path="Message.ts"/>

/**
 * //TODO BackEnd Doc
 */
class BackEnd {

    private allFBTab: Array<FBTab>;


    constructor() {
        this.allFBTab = [];
    }

    public initialze(): this {
        this.activeAllListener();
        return this;
    }

    private activeAllListener(): this {
        this.listenOpenningPage();
        this.listenMessage();
        return this;
    }

    /**
     * Active t
     * @returns {boolean}
     */
    private listenOpenningPage(): this {
        chrome.webNavigation.onCompleted.addListener((details) => {
            let fBTab: FBTab = new FBTab(details.tabId, details.url);
            fBTab.injectScript();
            this.allFBTab.push(fBTab);
        }, {url: [{urlPrefix: "https://www.facebook.com/messages"}]});
        return this;
    }

    private listenMessage() {
        chrome.runtime.onMessage.addListener(
            (request, sender, sendResponse) => {
                console.log("Message Received");
                console.log(request);
                if(Message.thisIsRealMessage(request)){
                    let currentMessage : Message = Message.createMessageFromObj(request);
                    console.log("Object message created");
                }else{
                    throw new Error("Message corrupeted");
                }
                /*if(request.hasOwnProperty("requestType")){
                    switch (request.requestType){
                        case "initCryptedConversation" :
                            sendResponse({ok:"ok"});
                            break;
                    }
                }*/
            }
        );
    }
}
let backEnd: BackEnd = new BackEnd();
backEnd.initialze();
