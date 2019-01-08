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
var exBlank = /** @class */ (function (_super) {
    __extends(exBlank, _super);
    function exBlank(color, alpha, parent) {
        var _this = _super.call(this) || this;
        _this.color = color;
        _this.alpha = alpha;
        _this.reset_graphics();
        parent.addChild(_this);
        return _this;
    }
    exBlank.prototype.reset_graphics = function () {
        this.graphics.clear();
        this.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, this.color);
    };
    return exBlank;
}(Laya.Sprite));
//# sourceMappingURL=exBlank.js.map