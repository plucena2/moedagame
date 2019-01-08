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
var SceneLang = /** @class */ (function (_super) {
    __extends(SceneLang, _super);
    function SceneLang() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SceneLang.prototype.init = function (scene3d, camera, directionLight) {
        _super.prototype.init.call(this, scene3d, camera, directionLight);
        this.visible = false;
        var y = Laya.stage.height * 1 / 3;
        var space = 154;
        this.btn_en = new exButton;
        this.btn_en.reset("res/lg_2.png", "res/lg_2.png", Laya.stage.width / 2, y, 300, 68, "center", "center", "", this);
        this.btn_en.init_text(46, "#ffffff");
        //this.btn_en.set_window_text("Engish","");
        this.btn_en.pivot(140, 34);
        this.btn_cn = new exButton;
        this.btn_cn.reset("res/lg_1.png", "res/lg_1.png", Laya.stage.width / 2, y + space, 300, 68, "center", "center", "", this);
        this.btn_cn.init_text(46, "#ffffff");
        //this.btn_cn.set_window_text("中文","");
        this.btn_cn.pivot(140, 34);
        this.btn_pt = new exButton;
        this.btn_pt.reset("res/lg_3.png", "res/lg_3.png", Laya.stage.width / 2, y + space * 2, 300, 68, "center", "center", "", this);
        this.btn_pt.init_text(46, "#ffffff");
        //this.btn_pt.set_window_text("Português","");
        this.btn_pt.pivot(140, 34);
    };
    SceneLang.prototype.reset = function () {
        _super.prototype.reset.call(this);
        Laya.SoundManager.stopMusic();
        if (Variable.instance.query("music") == "on") {
            Laya.SoundManager.playMusic("res/sound/gamebgm.mp3", 0);
        }
        if (this.camera.sky) {
            var skydome = this.camera.sky;
            skydome.texture = Laya.Texture2D.load("res/bg.png");
        }
        UIHud.instance.show(false);
    };
    SceneLang.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.btn_cn.get_state() == "down" && this.btn_cn.check_state_change()) {
            Variable.instance.set("lan", "cn");
            this.end_self("start");
        }
        if (this.btn_en.get_state() == "down" && this.btn_en.check_state_change()) {
            Variable.instance.set("lan", "en");
            this.end_self("start");
        }
        if (this.btn_pt.get_state() == "down" && this.btn_pt.check_state_change()) {
            Variable.instance.set("lan", "pt");
            this.end_self("start");
        }
    };
    SceneLang.prototype.end_self = function (code) {
        Laya.Tween.clearAll(this);
        _super.prototype.end_self.call(this, code);
    };
    return SceneLang;
}(Scene));
//# sourceMappingURL=SceneLang.js.map