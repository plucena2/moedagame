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
var exCheck = /** @class */ (function (_super) {
    __extends(exCheck, _super);
    function exCheck() {
        return _super.call(this) || this;
    }
    exCheck.prototype.reset = function (normal, check, x, y, align, parent) {
        this.x = x;
        this.y = y;
        this.normal = normal;
        this.check = check;
        this.align = align;
        this.state = "normal";
        this.last_state = this.state;
        this.reset_graphics();
        parent.addChild(this);
        this.on("mousedown", this, function () {
            if (this.state == "normal") {
                this.state = "check";
                this.reset_graphics();
            }
            else {
                this.state = "normal";
                this.reset_graphics();
            }
        });
    };
    exCheck.prototype.set_state = function (s) {
        this.state = s;
        this.reset_graphics();
    };
    exCheck.prototype.reset_graphics = function () {
        this.graphics.clear();
        var tex = (this.state == "normal") ? Laya.loader.getRes(this.normal) : Laya.loader.getRes(this.check);
        this.graphics.drawTexture(tex, 0, 0);
        this.width = tex.width;
        this.height = tex.height;
        if (this.align == "center") {
            this.pivot(tex.width / 2, tex.height / 2);
        }
    };
    exCheck.prototype.tween = function (offsetx, offsety) {
        Laya.Tween.from(this, { x: this.x + offsetx, y: this.y + offsety }, 1000, Laya.Ease.bounceOut, Laya.Handler.create(this, function (para) {
            Laya.Tween.clearTween(para);
        }, [this]));
    };
    exCheck.prototype.check_state_change = function () {
        if (this.last_state != this.state) {
            this.last_state = this.state;
            return true;
        }
        return false;
    };
    exCheck.prototype.get_state = function () {
        return this.state;
    };
    return exCheck;
}(Laya.Sprite));
//# sourceMappingURL=exCheck.js.map