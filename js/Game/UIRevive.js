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
var UIRevive = /** @class */ (function (_super) {
    __extends(UIRevive, _super);
    function UIRevive() {
        var _this = _super.call(this) || this;
        _this.ui_revive_bg = new exSprite();
        _this.ui_revive_bg.reset("res/revive_bg.png", Laya.stage.width / 2, Laya.stage.height / 2, "center", "center", false, _this);
        _this.btn_revive = new exButton();
        _this.btn_revive.reset("res/button.png", "res/button.png", Laya.stage.width / 2, Laya.stage.height / 2 + 124, 0, 0, "center", "center", "", _this);
        _this.btn_revive.init_text(36, "#FFFFFF");
        _this.text_revive_countdown = new exText(76, "#ffffff", _this);
        _this.text_revive_countdown.pos(Laya.stage.width / 2, Laya.stage.height / 2 + 68);
        _this.text_revive_countdown.y -= _this.btn_revive.height;
        _this.text_revive_hint = new exText(64, "#ffffff", _this);
        _this.text_revive_hint.pos(Laya.stage.width / 2, _this.text_revive_countdown.y - 76);
        _this.ui_revive_cost = new exStatic(32, "#ffffff");
        _this.ui_revive_cost.set_icon("res/heart.png");
        _this.ui_revive_cost.pos(Laya.stage.width / 2, _this.btn_revive.y - _this.btn_revive.height + 8);
        // this.ui_revive_cost.set_content(" X 100",true);
        _this.addChild(_this.ui_revive_cost);
        return _this;
    }
    UIRevive.prototype.tween = function (offsetx, offsety) {
        Laya.Tween.clearAll(this);
        Laya.Tween.from(this, { x: this.x + offsetx, y: this.y + offsety }, 1000, Laya.Ease.bounceOut, Laya.Handler.create(this, function (para) {
            Laya.Tween.clearTween(para);
        }, [this]));
    };
    UIRevive.prototype.show = function (cost) {
        this.visible = true;
        this.text_revive_countdown.set_content("10", "center");
        this.revive_start_time = Laya.timer.currTimer;
        this.ui_revive_cost.set_content(" X " + cost, true);
        this.tween(0, -200);
    };
    UIRevive.prototype.reset = function () {
        var revive;
        var revive_hint;
        switch (Variable.instance.query("lan")) {
            case "cn":
                revive = "复活";
                revive_hint = "你想继续冒险吗?";
                break;
            case "en":
                revive = "Revive";
                revive_hint = "Continue?";
                break;
            case "pt":
                revive = "A ressurreição";
                revive_hint = "Continuar?";
                break;
        }
        this.btn_revive.set_window_text(revive, "center");
        this.text_revive_hint.set_content(revive_hint, "center");
    };
    UIRevive.prototype.hide = function () {
        this.visible = false;
    };
    UIRevive.prototype.count_down = function () {
        var cdt = 6;
        var elapse = Laya.timer.currTimer - this.revive_start_time;
        if (elapse >= cdt * 1000) {
            return true;
        }
        else {
            var time = cdt - Math.floor(elapse / 1000);
            this.text_revive_countdown.set_content("" + time, "center");
        }
    };
    return UIRevive;
}(Laya.Sprite));
//# sourceMappingURL=UIRevive.js.map