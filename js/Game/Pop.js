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
var Pop = /** @class */ (function (_super) {
    __extends(Pop, _super);
    function Pop(size, color) {
        if (size === void 0) { size = 32; }
        if (color === void 0) { color = "#FFFFFF"; }
        var _this = _super.call(this) || this;
        _this.text = new Laya.Text;
        _this.text.text = "";
        _this.text.fontSize = size;
        _this.text.align = "left";
        _this.text.color = color;
        _this.text.font = "Arial";
        _this.text.visible = true;
        _this.addChild(_this.text);
        return _this;
        //this.graphics.drawCircle(0,0,8,8,"#ffff00");
    }
    Pop.prototype.reset = function (image, text, duration, x, y) {
        this.graphics.clear();
        var tex = Laya.loader.getRes(image);
        this.graphics.drawTexture(tex, 0, -tex.height / 2);
        this.width = tex.width;
        this.height = tex.height;
        this.time_start = Laya.timer.currTimer;
        this.time_duration = duration;
        this.x = x;
        this.y = y;
        this.offset = 0;
        this.alpha = 1;
        this.visible = true;
        this.remove = false;
        this.text.text = text;
        this.text.pos(this.width, -this.text.fontSize / 2);
        this.pivotX = (this.width + this.text.textWidth) / 2;
    };
    Pop.prototype.get_width = function () {
        return this.width + this.text.textWidth;
    };
    Pop.prototype.get_height = function () {
        return this.height;
    };
    Pop.prototype.get_img_width = function () {
        return this.width;
    };
    Pop.prototype.get_img_height = function () {
        return this.height;
    };
    Pop.prototype.update = function (x, y) {
        var elapse = Laya.timer.currTimer - this.time_start;
        var r = elapse / this.time_duration;
        this.offset = -r * 106;
        this.alpha = (1 - r);
        this.x = x;
        this.y = y + this.offset;
        if (elapse >= this.time_duration) {
            this.remove = true;
            this.visible = false;
        }
    };
    return Pop;
}(Laya.Sprite));
//# sourceMappingURL=Pop.js.map