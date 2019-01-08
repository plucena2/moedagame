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
var exSprite = /** @class */ (function (_super) {
    __extends(exSprite, _super);
    function exSprite() {
        return _super.call(this) || this;
    }
    exSprite.prototype.reset = function (name, x, y, halign, valign, scale, parent) {
        this.x = x;
        this.y = y;
        this.graphics.clear();
        var tex = Laya.loader.getRes(name);
        if (scale) {
            var ratio = (tex.height / Laya.stage.height);
            this.width = tex.width / ratio;
            this.height = tex.height / ratio;
        }
        else {
            this.width = tex.width;
            this.height = tex.height;
        }
        this.graphics.drawTexture(tex, 0, 0, this.width, this.height);
        if (halign == "center") {
            this.pivotX = this.width / 2;
        }
        if (valign == "center") {
            this.pivotY = this.height / 2;
        }
        parent.addChild(this);
    };
    exSprite.prototype.tween = function (offsetx, offsety) {
        Laya.Tween.from(this, { x: this.x + offsetx, y: this.y + offsety }, 1000, Laya.Ease.bounceOut, Laya.Handler.create(this, function (para) {
            Laya.Tween.clearTween(para);
        }, [this]));
    };
    return exSprite;
}(Laya.Sprite));
//# sourceMappingURL=exSprite.js.map