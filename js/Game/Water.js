var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Water = /** @class */ (function (_super) {
    __extends(Water, _super);
    function Water() {
        var _this = _super.call(this) || this;
        _this.sprite3d = null;
        return _this;
    }
    Water.prototype.reset = function (scene, index, x, z) {
        _super.prototype.reset.call(this, scene, index, x, z);
        if (this.sprite3d) {
            this.sprite3d.destroy();
            this.sprite3d.removeSelf();
        }
        if (index != -1) {
            this.sprite3d = Laya.Sprite3D.instantiate(Laya.loader.getRes("res/waters/w" + index + ".lh"));
            this.sprite3d.transform.translate(new Laya.Vector3(0, -1, 0), true);
            this.addChild(this.sprite3d);
        }
    };
    Water.prototype.update = function (cx, cz, radius) {
        _super.prototype.update.call(this, cx, cz, radius);
    };
    return Water;
}(Staff));
//# sourceMappingURL=Water.js.map