var Variable = /** @class */ (function () {
    function Variable() {
        this.values = {};
        this.set("music", "on");
        this.set("money", 0);
        this.set("role", 0);
        this.set("dist", 0);
        this.set("histroy_dist", 1);
    }
    Object.defineProperty(Variable, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new Variable();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Variable.prototype.query = function (key) {
        for (var k in this.values) {
            if (k == key) {
                return this.values[key];
            }
        }
        return null;
    };
    Variable.prototype.set = function (key, value) {
        this.values[key] = value;
    };
    Variable.prototype.add = function (key, value) {
        this.values[key] += value;
    };
    return Variable;
}());
//# sourceMappingURL=Variable.js.map