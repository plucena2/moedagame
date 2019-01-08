var UIHud = /** @class */ (function () {
    function UIHud() {
        this.ui_lifes = [];
        this.layer = new Laya.Sprite;
        this.ui_gold = new exSprite();
        this.ui_gold.zOrder = 100;
        this.ui_gold.reset("res/gold.png", Laya.stage.width - 64, 64, "center", "center", false, this.layer);
        this.ui_goldbg = new exSprite();
        this.ui_goldbg.zOrder = 1;
        this.ui_goldbg.reset("res/level_bg.png", this.ui_gold.x - this.ui_gold.width / 2 * 1.5 / 3, this.ui_gold.y, "", "center", false, this.layer);
        this.ui_goldbg.scaleX = -1;
        this.text_gold = new exText(24, "#ffffff", this.layer);
        this.text_gold.pos(this.ui_goldbg.x - this.ui_goldbg.width / 2, this.ui_goldbg.y);
        this.layer.addChild(this.text_gold);
        this.text_gold.zOrder = 100;
        for (var i = 0; i < 3; i++) {
            var life = new exSprite();
            life.reset("res/heart.png", 64 + i * 64, 64, "center", "center", false, this.layer);
            life.zOrder = 100;
            this.ui_lifes.push(life);
        }
        this.layer.zOrder = 10000;
        Laya.stage.addChild(this.layer);
    }
    Object.defineProperty(UIHud, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new UIHud();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    UIHud.prototype.set_money = function (money) {
        this.text_gold.set_content(money, "center");
    };
    UIHud.prototype.set_life = function (life) {
        for (var i = 0; i < 3; i++) {
            this.ui_lifes[i].visible = (i < life) ? true : false;
        }
    };
    UIHud.prototype.tween = function (offsetx, offsety) {
        this.layer.pos(0, 0);
        Laya.Tween.clearAll(this.layer);
        Laya.Tween.from(this.layer, { x: this.layer.x + offsetx, y: this.layer.y + offsety }, 1000, Laya.Ease.bounceOut, Laya.Handler.create(this, function (para) {
            Laya.Tween.clearTween(para);
        }, [this.layer]));
    };
    UIHud.prototype.show = function (show) {
        this.layer.visible = show;
    };
    return UIHud;
}());
//# sourceMappingURL=UIHud.js.map