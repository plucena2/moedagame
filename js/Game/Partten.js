var PARRTENDECLARE = /** @class */ (function () {
    function PARRTENDECLARE() {
    }
    return PARRTENDECLARE;
}());
var ParttenFactory = /** @class */ (function () {
    function ParttenFactory() {
        this.parttens = [];
        this.ui_parttens = [];
        this.parttens.push(Laya.loader.getRes("res/pars/p00.json"));
        this.parttens.push(Laya.loader.getRes("res/pars/p10.json"));
        this.parttens.push(Laya.loader.getRes("res/pars/p20.json"));
        this.ui_parttens.push(Laya.loader.getRes("res/pars/mini/mp0.json"));
    }
    Object.defineProperty(ParttenFactory, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new ParttenFactory();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return ParttenFactory;
}());
//# sourceMappingURL=Partten.js.map