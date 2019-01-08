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
var Scene = /** @class */ (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.end = false;
        return _this;
    }
    Scene.prototype.init = function (scene3d, camera, directionLight) {
        this.scene3d = scene3d;
        this.camera = camera;
        this.directionLight = directionLight;
        this.end = false;
    };
    ;
    Scene.prototype.reset = function () {
        this.end = false;
        this.visible = true;
    };
    ;
    Scene.prototype.update = function () { };
    ;
    Scene.prototype.is_end = function () {
        return this.end;
    };
    Scene.prototype.get_end_code = function () {
        return this.end_code;
    };
    Scene.prototype.end_self = function (code) {
        this.end = true;
        if (code) {
            this.end_code = code;
        }
    };
    return Scene;
}(Laya.Sprite));
//# sourceMappingURL=Scene.js.map