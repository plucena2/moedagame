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
var exStatic = /** @class */ (function (_super) {
    __extends(exStatic, _super);
    function exStatic(size, color) {
        var _this = _super.call(this) || this;
        _this.content_layer = new Laya.Sprite;
        _this.addChild(_this.content_layer);
        _this.text_brb = new Laya.Text;
        _this.text_brb.text = "";
        _this.text_brb.fontSize = size;
        _this.text_brb.align = "left";
        _this.text_brb.color = "#000000";
        _this.text_brb.font = "Arial";
        _this.text_brb.visible = true;
        _this.text_brb.alpha = 0.5;
        _this.content_layer.addChild(_this.text_brb);
        _this.text_blt = new Laya.Text;
        //this.text.blendMode = "lighter";
        _this.text_blt.text = "";
        _this.text_blt.fontSize = size;
        _this.text_blt.align = "left";
        _this.text_blt.color = "#000000";
        _this.text_blt.font = "Arial";
        _this.text_blt.visible = true;
        _this.text_blt.alpha = 0.5;
        _this.content_layer.addChild(_this.text_blt);
        _this.text = new Laya.Text;
        _this.text.text = "";
        _this.text.fontSize = size;
        _this.text.align = "left";
        _this.text.color = color;
        _this.text.font = "Arial";
        _this.text.visible = true;
        _this.content_layer.addChild(_this.text);
        return _this;
    }
    exStatic.prototype.set_back = function (back, align) {
        this.graphics.clear();
        if (back) {
            var texb = Laya.loader.getRes(back);
            if (texb) {
                if (align == "center") {
                    this.graphics.drawTexture(texb, -texb.width / 2, -texb.height / 2);
                }
                else {
                    this.graphics.drawTexture(texb, 0, -texb.height / 2);
                }
                this.width = texb.width;
                this.height = texb.height;
            }
        }
    };
    exStatic.prototype.set_icon = function (icon) {
        this.content_layer.graphics.clear();
        if (icon) {
            var texi = Laya.loader.getRes(icon);
            if (texi) {
                this.content_layer.graphics.drawTexture(texi, 0, -texi.height / 2);
                this.icon_width = texi.width;
                this.icon_height = texi.height;
                if (this.width == 0) {
                    this.width = texi.width;
                }
                if (this.height == 0) {
                    this.height = texi.height;
                }
            }
        }
        //this.graphics.drawCircle(0,0,8,8,"#ffff00");
    };
    exStatic.prototype.set_content = function (text, auto_center) {
        this.text.text = text;
        this.text_blt.text = text;
        this.text_brb.text = text;
        if (auto_center) {
            this.text.pos(this.icon_width, -this.text.fontSize / 2);
            this.text_blt.pos(this.icon_width - 1, -this.text.fontSize / 2 - 1);
            this.text_brb.pos(this.icon_width + 1, -this.text.fontSize / 2 + 1);
            this.content_layer.x = -(this.icon_width + this.text.textWidth) / 2;
        }
        else {
            this.text.pos(this.icon_width, -this.text.fontSize / 2);
            this.text_blt.pos(this.icon_width - 1, -this.text.fontSize / 2 - 1);
            this.text_brb.pos(this.icon_width + 1, -this.text.fontSize / 2 + 1);
            this.content_layer.x = 0;
        }
    };
    exStatic.prototype.get_width = function () {
        return this.width + this.text.textWidth;
    };
    exStatic.prototype.get_height = function () {
        return this.height;
    };
    exStatic.prototype.get_img_width = function () {
        return this.width;
    };
    exStatic.prototype.get_img_height = function () {
        return this.height;
    };
    return exStatic;
}(Laya.Sprite));
//# sourceMappingURL=exStatic.js.map