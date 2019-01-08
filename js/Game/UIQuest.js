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
var UIQuestSlot = /** @class */ (function (_super) {
    __extends(UIQuestSlot, _super);
    function UIQuestSlot() {
        var _this = _super.call(this) || this;
        _this.ui_quest = new exSprite();
        _this.ui_quest.reset("res/questbg.png", 0, 0, "center", "center", false, _this);
        _this.text_quest = new exText(24, "#ffffff", _this);
        _this.text_quest.pos(-_this.ui_quest.width / 2 + 80, 0); //this.ui_quest.x+this.ui_quest.width/2,this.ui_quest.y);
        _this.text_result = new exText(24, "#ffffff", _this);
        _this.text_result.pos(_this.ui_quest.width / 2 - 158, 0); //this.ui_quest.x+this.ui_quest.width/2,this.ui_quest.y);
        _this.gold = new exStatic(24, "#ffffff");
        _this.gold.set_icon("res/gold_m.png");
        _this.gold.pos(_this.ui_quest.width / 2 - 90, -12);
        _this.addChild(_this.gold);
        return _this;
        //this.graphics.drawRect(0,0,this.ui_quest.width/2,100,"#ff00ff");
    }
    UIQuestSlot.prototype.reset = function () {
    };
    UIQuestSlot.prototype.get_height = function () {
        return this.ui_quest.height;
    };
    UIQuestSlot.prototype.refresh = function (q) {
        var center = true;
        this.text_quest.set_content("" + q.get_desc(), "left");
        this.text_result.set_content("" + q.current + "/" + q.cond, "right");
        if (q.gold > 0) {
            this.gold.visible = true;
            this.gold.set_content(" x " + q.gold, true);
            if (center) {
                this.gold.pos(this.ui_quest.width / 2 - 90, this.ui_quest.height / 2 - 48 + 12);
            }
            else {
                this.gold.pos(this.ui_quest.width / 2 - 90, -12);
            }
        }
        else {
            this.gold.visible = false;
        }
    };
    UIQuestSlot.prototype.tween = function (offsetx, offsety, duration) {
        Laya.Tween.clearAll(this);
        Laya.Tween.from(this, { x: this.x + offsetx, y: this.y + offsety }, duration, Laya.Ease.bounceOut, Laya.Handler.create(this, function (para) {
            Laya.Tween.clearTween(para);
        }, [this]));
    };
    return UIQuestSlot;
}(Laya.Sprite));
var UIQuest = /** @class */ (function () {
    function UIQuest() {
        this.slots = [];
        this.layer = new Laya.Sprite;
        this.slots.push(new UIQuestSlot);
        this.slots.push(new UIQuestSlot);
        this.slots.push(new UIQuestSlot);
        for (var i = 0; i < this.slots.length; i++) {
            var slot = this.slots[i];
            this.layer.addChild(slot);
        }
        this.layer.zOrder = 10000;
        Laya.stage.addChild(this.layer);
        this.layer.visible = false;
    }
    Object.defineProperty(UIQuest, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new UIQuest();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    UIQuest.prototype.reset = function () {
        for (var i = 0; i < this.slots.length; i++) {
            var slot = this.slots[i];
            slot.reset();
            slot.pos(0, i * slot.get_height());
            slot.visible = false;
        }
    };
    UIQuest.prototype.show = function (x, y) {
        this.layer.x = x;
        this.layer.y = y;
        this.layer.visible = true;
        //this.tween(Laya.stage.width,0);
        for (var i = 0; i < this.slots.length; i++) {
            this.slots[i].tween(Laya.stage.width, 0, i * 100 + 800);
        }
    };
    UIQuest.prototype.hide = function () {
        this.layer.visible = false;
    };
    UIQuest.prototype.refresh = function (qm) {
        for (var i = 0; i < 3; i++) {
            if (i < qm.quests.length) {
                this.slots[i].visible = true;
                this.slots[i].refresh(qm.quests[i]);
            }
            else {
                this.slots[i].visible = false;
            }
        }
    };
    return UIQuest;
}());
//# sourceMappingURL=UIQuest.js.map