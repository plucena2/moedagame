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
var exText = /** @class */ (function (_super) {
    __extends(exText, _super);
    function exText(size, color, parent) {
        var _this = _super.call(this) || this;
        _this.text_blt = new Laya.Text;
        //this.text.blendMode = "lighter";
        _this.text_blt.text = "";
        _this.text_blt.fontSize = size;
        _this.text_blt.align = "left";
        _this.text_blt.color = "#000000";
        _this.text_blt.font = "Arial";
        _this.text_blt.visible = true;
        _this.text_blt.alpha = 0.55;
        _this.addChild(_this.text_blt);
        _this.text_brb = new Laya.Text;
        _this.text_brb.text = "";
        _this.text_brb.fontSize = size;
        _this.text_brb.align = "left";
        _this.text_brb.color = "#000000";
        _this.text_brb.font = "Arial";
        _this.text_brb.visible = true;
        _this.text_brb.alpha = 0.5;
        _this.addChild(_this.text_brb);
        _this.text = new Laya.Text;
        //this.text.blendMode = "lighter";
        _this.text.text = "";
        _this.text.fontSize = size;
        _this.text.align = "left";
        _this.text.color = color;
        _this.text.font = "Arial";
        _this.text.visible = true;
        _this.addChild(_this.text);
        parent.addChild(_this);
        return _this;
    }
    exText.prototype.set_content = function (text, align) {
        this.text.text = text;
        this.text_blt.text = text;
        this.text_brb.text = text;
        switch (align) {
            case "center":
                {
                    this.text.pos(-this.text.textWidth / 2, -this.text.fontSize / 2);
                }
                break;
            case "left":
                {
                    this.text.pos(0, -this.text.fontSize / 2);
                }
                break;
            case "right":
                {
                    this.text.pos(-this.text.textWidth, -this.text.fontSize / 2);
                }
                break;
        }
        this.text_blt.x = this.text.x - 1;
        this.text_blt.y = this.text.y - 1;
        this.text_brb.x = this.text.x + 1;
        this.text_brb.y = this.text.y + 1;
    };
    exText.prototype.get_tex_width = function () {
        return this.text.textWidth;
    };
    exText.prototype.tween = function (offsetx, offsety) {
        Laya.Tween.from(this, { x: this.x + offsetx, y: this.y + offsety }, 1000, Laya.Ease.bounceOut, Laya.Handler.create(this, function (para) {
            Laya.Tween.clearTween(para);
        }, [this]));
    };
    return exText;
}(Laya.Sprite));
//# sourceMappingURL=exText.js.map