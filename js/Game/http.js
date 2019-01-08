var HTTP = /** @class */ (function () {
    function HTTP() {
        this.http = new Laya.HttpRequest;
    }
    HTTP.prototype.get = function (url, caller, callback) {
        this.caller = caller;
        this.callback = callback;
        //this.http.once(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);	
        this.http.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
        this.http.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        this.http.send(url, null, 'get', 'text');
        return this;
    };
    HTTP.prototype.post = function (url, data, contentType, caller, callback) {
        this.caller = caller;
        this.callback = callback;
        //this.http.once(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);		
        this.http.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
        this.http.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        if (contentType == null) {
            this.http.send(url, data, 'post', 'text');
        }
        else {
            this.http.send(url, data, 'post', 'text', ["content-type", contentType]);
        }
        return this;
    };
    HTTP.prototype.onHttpRequestError = function (e) {
        this.callback.apply(this.caller, [{ state: 500, msg: e }]);
    };
    HTTP.prototype.onHttpRequestComplete = function (e) {
        this.callback.apply(this.caller, [{ state: 200, data: this.http.data }]);
    };
    return HTTP;
}());
//# sourceMappingURL=http.js.map