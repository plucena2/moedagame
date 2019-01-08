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
var exEffect = /** @class */ (function (_super) {
    __extends(exEffect, _super);
    function exEffect() {
        var _this = _super.call(this) || this;
        _this.class = "effect";
        _this.timeline = new Laya.TimeLine;
        return _this;
        //this.blendMode = "lighter";
    }
    exEffect.prototype.reset = function (name, x, y, dx, dy, time) {
        this.visible = true;
        this.graphics.clear();
        var tex = Laya.loader.getRes("res/" + name + ".png");
        this.graphics.drawTexture(tex, 0, 0);
        this.x = x;
        this.y = y;
        this.pivot(tex.width / 2, tex.height / 2);
        this.remove = false;
        this.scale(1, 1);
        this.alpha = 1;
        this.timeline.reset();
        this.timeline.addLabel("a", 0).to(this, { x: dx, y: dx, scaleX: 1.2, scaleY: 1.2 }, time, Laya.Ease.linearOut, 0)
            .addLabel("b", 0).to(this, { scaleX: 1.9, scaleY: 1.9, alpha: 0 }, time, Laya.Ease.linearIn, 0);
        this.timeline.play(0);
        this.timeline.once(Laya.Event.COMPLETE, this, function (self) {
            self.remove = true;
        }, [this]);
    };
    return exEffect;
}(Laya.Sprite));
//# sourceMappingURL=exEffect.js.map