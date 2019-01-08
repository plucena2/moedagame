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
var SceneStart = /** @class */ (function (_super) {
    __extends(SceneStart, _super);
    function SceneStart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.px = -1.8;
        _this.py = 3;
        _this.pz = -1.8;
        _this.vx = 1;
        _this.vy = 1.8;
        _this.vz = 1;
        return _this;
    }
    SceneStart.prototype.init = function (scene3d, camera, directionLight) {
        _super.prototype.init.call(this, scene3d, camera, directionLight);
        this.visible = false;
        this.btn_start = new exButton;
        this.btn_start.reset(null, null, Laya.stage.width / 2, Laya.stage.height * 3.5 / 5, 300, 68, "center", "center", "", this);
        this.btn_start.init_text(46, "#ffffff");
        this.btn_start.pivot(140, 34);
        var posy = Laya.stage.height * 4.2 / 5;
        this.chk_music = new exCheck;
        this.chk_music.reset("res/chk_music1.png", "res/chk_music2.png", 42, posy, "left", this);
        this.btn_1 = new exButton;
        this.btn_1.reset("res/btn_role.png", "res/btn_role.png", Laya.stage.width * 1.5 / 3 + 126 * 2, posy, 0, 0, "center", "top", "", this);
        this.tiles = new Laya.Sprite3D;
        this.objects = new Laya.Sprite3D;
        this.waters = new Laya.Sprite3D;
        this.chk_q = new exCheck();
        this.chk_q.reset("res/quest.png", "res/quest.png", Laya.stage.width - 72, 142, "center", this);
        this.logo = new exSprite;
        this.logo.reset("res/logo.png", Laya.stage.width / 2, Laya.stage.height * 0.8 / 3, "center", "center", false, this);
    };
    SceneStart.prototype.reset = function () {
        _super.prototype.reset.call(this);
        Laya.SoundManager.stopMusic();
        if (Variable.instance.query("music") == "on") {
            Laya.SoundManager.playMusic("res/sound/gamebgm.mp3", 0);
        }
        if (this.camera.sky) {
            var skydome = this.camera.sky;
            skydome.texture = Laya.Texture2D.load("res/skybox.png");
        }
        var start;
        switch (Variable.instance.query("lan")) {
            case "cn":
                start = "点击开始";
                break;
            case "en":
                start = "Tap to Start";
                break;
            case "pt":
                start = "Começar";
                break;
        }
        this.btn_start.set_window_text(start, "center");
        this.directionLight.color = new Laya.Vector3(0.99, 0.99, 0.99);
        this.directionLight.direction = new Laya.Vector3(1, -1, 1.5);
        this.scene3d.addChild(this.tiles);
        this.scene3d.addChild(this.waters);
        this.scene3d.addChild(this.objects);
        this.role = Laya.Sprite3D.instantiate(Laya.loader.getRes("res/skins/skin" + Variable.instance.query("role") + ".lh"));
        this.scene3d.addChild(this.role);
        this.role.transform.scale = new Laya.Vector3(1, 1, 1);
        this.role.transform.rotationEuler = new Laya.Vector3(0, this.d2r(135 + 45 + 45), 0);
        this.role.transform.position = new Laya.Vector3(2 - 0.25, 0, 2 - 0.25);
        var child = this.role.getChildAt(0);
        var animator = child.getComponentByType(Laya.Animator);
        animator.play("STAND", 0.5);
        UIHud.instance.show(true);
        UIHud.instance.tween(0, -150);
        Laya.Tween.clearAll(this);
        this.load_mini_patten();
        this.chk_music.tween(0, 130);
        this.btn_1.tween(0, 160);
        this.chk_q.tween(110, 0);
        this.chk_q.set_state("normal");
        this.logo.tween(0, -530);
        this.btn_start.once("click", this, function (scene) {
            Laya.Tween.clearAll(this);
            scene.end_self("game");
        }, [this]);
        QuestManager.instance.refresh_quest();
        this.refresh_mark();
    };
    SceneStart.prototype.refresh_mark = function () {
        if (QuestManager.instance.size()) {
            this.chk_q.filters = null;
        }
        else {
            var grayscaleMat = [0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0];
            var grayscaleFilter = new Laya.ColorFilter(grayscaleMat);
            this.chk_q.filters = [grayscaleFilter];
        }
    };
    SceneStart.prototype.update = function () {
        _super.prototype.update.call(this);
        this.camera.transform.position = new Laya.Vector3(this.px, this.py, this.pz);
        this.camera.transform.lookAt(new Laya.Vector3(this.vx, this.vy, this.vz), new Laya.Vector3(0, 1, 0));
        var elapsedTime = Laya.timer.delta;
        for (var i = this.tiles.numChildren - 1; i > -1; i--) {
            var t = this.tiles.getChildAt(i);
            t.update(1, 1, 16);
        }
        for (var i = this.waters.numChildren - 1; i > -1; i--) {
            var w = this.waters.getChildAt(i);
            w.update(1, 1, 16);
        }
        for (var i = this.objects.numChildren - 1; i > -1; i--) {
            var o = this.objects.getChildAt(i);
            o.update(1, 1, 16);
        }
        var t = this.find_tile(1, 1);
        if (t) {
            this.role.transform.position = new Laya.Vector3(2 - 0.2, t.get_pos_y() + 0.2, 2 - 0.2);
        }
        if (this.chk_music.check_state_change()) {
            //音乐开关
            Variable.instance.set("sound", (this.chk_music.get_state() == "normal") ? "on" : "off");
            if (Variable.instance.query("sound") == "off") {
                Laya.SoundManager.stopAll();
            }
            else {
                Laya.SoundManager.playMusic("res/sound/gamebgm.mp3", 0);
            }
        }
        if (this.btn_1.get_state() == "down" && this.btn_1.check_state_change()) {
            this.end_self("role");
        }
        if (this.chk_q.check_state_change()) {
            if (this.chk_q.get_state() == "check") {
                UIQuest.instance.show(Laya.stage.width / 2, this.chk_q.y + this.chk_q.height + 8);
            }
            else {
                UIQuest.instance.hide();
            }
        }
    };
    SceneStart.prototype.end_self = function (code) {
        Laya.Tween.clearAll(this);
        _super.prototype.end_self.call(this, code);
        for (var i = this.tiles.numChildren - 1; i > -1; i--) {
            var t = this.tiles.getChildAt(i);
            t.removeSelf();
            Laya.Pool.recover("tile", t);
        }
        for (var i = this.objects.numChildren - 1; i > -1; i--) {
            var t = this.objects.getChildAt(i);
            t.removeSelf();
            Laya.Pool.recover("gobject", t);
        }
        for (var i = this.waters.numChildren - 1; i > -1; i--) {
            var t = this.waters.getChildAt(i);
            t.removeSelf();
            Laya.Pool.recover("water", t);
        }
        this.tiles.removeSelf();
        this.objects.removeSelf();
        this.waters.removeSelf();
        UIQuest.instance.hide();
        this.role.removeSelf();
        this.role.destroy();
    };
    SceneStart.prototype.find_tile = function (x, z) {
        for (var i = 0; i < this.tiles.numChildren; i++) {
            var t = this.tiles.getChildAt(i);
            if (t.get_index_x() == x && t.get_index_z() == z) {
                return t;
            }
        }
        return null;
    };
    SceneStart.prototype.load_mini_patten = function () {
        var map_type_index = 0;
        var offset = 0;
        for (var x = 0; x < 5; x++) {
            for (var z = 0; z < 5; z++) {
                var tile_index = ParttenFactory.instance.ui_parttens[map_type_index].tile[x + z * 5];
                if (tile_index != -1) {
                    var tile = Laya.Pool.getItemByClass("tile", Tile);
                    tile.reset(this, tile_index, x - offset, z - offset);
                    tile.reset_state("stand");
                    tile.reset_height();
                    this.tiles.addChild(tile);
                }
                var water_index = ParttenFactory.instance.ui_parttens[map_type_index].water[x + z * 5];
                if (water_index != -1) {
                    var water = Laya.Pool.getItemByClass("water", Water);
                    water.reset(this, water_index, x - offset, z - offset);
                    water.reset_state("stand");
                    water.reset_height();
                    this.waters.addChild(water);
                }
                var object_index = ParttenFactory.instance.ui_parttens[map_type_index].object[x + z * 5];
                if (object_index != -1) {
                    var object = Laya.Pool.getItemByClass("gobject", GObject);
                    object.reset(this, object_index, x - offset, z - offset);
                    object.reset_state("stand");
                    object.reset_height();
                    this.objects.addChild(object);
                }
            }
        }
    };
    SceneStart.prototype.d2r = function (degree) {
        return ((degree) * (3.1415926 / 180));
    };
    return SceneStart;
}(Scene));
//# sourceMappingURL=SceneStart.js.map