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
var SceneEnd = /** @class */ (function (_super) {
    __extends(SceneEnd, _super);
    function SceneEnd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.http = new HTTP;
        return _this;
    }
    SceneEnd.prototype.init = function (scene3d, camera, directionLight) {
        _super.prototype.init.call(this, scene3d, camera, directionLight);
        this.blank = new Laya.Sprite;
        this.blank.visible = true;
        this.blank.alpha = 0.75;
        this.blank.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        this.addChild(this.blank);
        this.bg = new exSprite;
        this.bg.reset("res/end_bg.png", Laya.stage.width / 2, Laya.stage.height * 1 / 3, "center", "center", false, this);
        this.text_dist = new exText(32, "#ffffff", this);
        this.text_dist.pos(this.bg.x, this.bg.y);
        this.text_histroy_dist = new exText(48, "#ffffff", this);
        this.text_histroy_dist.pos(this.bg.x, this.bg.y - 64);
        this.btn_cions = new exButton;
        this.btn_cions.reset("res/button.png", "res/button.png", Laya.stage.width / 2, Laya.stage.height * 2.6 / 3 - 126, 0, 0, "center", "center", "", this);
        this.btn_cions.init_text(48, "#ffffff");
        this.btn_return = new exButton;
        this.btn_return.reset("res/button.png", "res/button.png", Laya.stage.width / 2, Laya.stage.height * 2.6 / 3, 0, 0, "center", "center", "", this);
        this.btn_return.init_text(48, "#ffffff");
    };
    SceneEnd.prototype.reset = function () {
        _super.prototype.reset.call(this);
        Laya.SoundManager.stopMusic();
        Laya.SoundManager.stopMusic();
        if (Variable.instance.query("music") == "on") {
            Laya.SoundManager.playMusic("res/sound/gamebgm.mp3", 0);
        }
        this.btn_return.visible = false;
        this.btn_cions.visible = false;
        this.text_dist.visible = false;
        this.text_histroy_dist.visible = false;
        this.bg.tween(0, -200);
        var cd_text;
        var his_text;
        switch (Variable.instance.query("lan")) {
            case "cn":
                cd_text = "当前距离: ";
                his_text = "历史距离: ";
                break;
            case "en":
                cd_text = "DIstance:";
                his_text = "Longest Run: ";
                break;
            case "pt":
                cd_text = "Distância: ";
                his_text = "Histroy Distância: ";
                break;
        }
        this.text_dist.set_content(cd_text + Math.floor(Variable.instance.query("dist")), "center");
        this.text_histroy_dist.set_content(his_text + Math.floor(Variable.instance.query("histroy_dist")), "center");
        UIQuest.instance.refresh(QuestManager.instance);
        var ret_txt, con_txt;
        var userid = Variable.instance.query("userid");
        switch (Variable.instance.query("lan")) {
            case "cn":
                ret_txt = "返回";
                con_txt = "收集金币";
                break;
            case "en":
                ret_txt = "Return";
                con_txt = "Collect Cions";
                break;
            case "pt":
                ret_txt = "Retorno";
                con_txt = "Recolher cions";
                break;
        }
        this.btn_return.set_window_text(ret_txt, "center");
        this.btn_cions.set_window_text(con_txt, "center");
        this.timer.once(500, this, function (self) {
            var userid = Variable.instance.query("userid");
            self.btn_return.visible = true;
            self.text_dist.visible = true;
            self.text_histroy_dist.visible = true;
            UIQuest.instance.show(Laya.stage.width / 2, this.bg.y + this.bg.height - 48);
            self.text_dist.tween(300, 0);
            self.text_histroy_dist.tween(300, 0);
            self.btn_return.tween(0, 150);
            if (userid == "guest") {
                self.btn_cions.visible = true;
                self.btn_cions.tween(0, 150);
            }
        }, [this]);
    };
    SceneEnd.prototype.update = function () {
        _super.prototype.update.call(this);
        var userid = Variable.instance.query("userid");
        if (userid == "guest" && this.btn_cions.get_state() == "down" && this.btn_cions.check_state_change()) {
            var href = Conf.DL_URL + "?" + "score=" + Variable.instance.query("money");
            console.log(href);
            Laya.Browser.window.location.href = href;
            Variable.instance.set("money", 0);
        }
        if (this.btn_return.get_state() == "down" && this.btn_return.check_state_change()) {
            if (userid != "guest") {
                var cls = Variable.instance.query("$class");
                var gid = Variable.instance.query("gameid");
                var gs = Variable.instance.query("game_signature");
                var post_data = JSON.stringify({
                    "$class": cls,
                    "playerId": userid,
                    "score": Variable.instance.query("money"),
                    "gameid": gid,
                    "game_signature": gs,
                });
                this.http.post(Conf.POST_URL, post_data, "application/json;charset=UTF-8", this, this.onPostData);
                console.log("url" + Conf.POST_URL);
                console.log("post" + post_data);
                Variable.instance.set("money", 0);
            }
            this.end_self();
        }
    };
    SceneEnd.prototype.onPostData = function () {
        console.log("post data done");
    };
    SceneEnd.prototype.end_self = function (code) {
        UIQuest.instance.hide();
        _super.prototype.end_self.call(this, code);
    };
    return SceneEnd;
}(Scene));
//# sourceMappingURL=SceneEnd.js.map