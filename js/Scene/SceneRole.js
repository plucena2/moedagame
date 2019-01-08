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
var ArrangeItem = /** @class */ (function () {
    function ArrangeItem() {
    }
    return ArrangeItem;
}());
var SceneRole = /** @class */ (function (_super) {
    __extends(SceneRole, _super);
    function SceneRole() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.px = 0;
        _this.py = 0.6;
        _this.pz = 4;
        _this.vx = 0;
        _this.vy = 0.5;
        _this.vz = 0;
        _this.select = 0;
        _this.items = [];
        _this.select_rotation = 0;
        return _this;
    }
    SceneRole.prototype.init = function (scene3d, camera, directionLight) {
        _super.prototype.init.call(this, scene3d, camera, directionLight);
        this.visible = false;
        this.icon_lock = new exSprite;
        this.icon_lock.reset("res/lock.png", Laya.stage.width / 2, Laya.stage.height / 2, "center", "center", false, this);
        this.icon_lock.visible = false;
        this.btn_exit = new exButton;
        this.btn_exit.reset("res/exit.png", "res/exit.png", 16, Laya.stage.height - 96, 0, 0, "left", "center", "", this);
        this.slider = new Laya.Sprite;
        this.slider.pos(0, Laya.stage.height * 1 / 3);
        this.slider.width = Laya.stage.width;
        this.slider.height = Laya.stage.height * 1 / 3;
        //this.slider.graphics.drawRect(0,0,this.slider.width,this.slider.height,"#ffff00");
        this.slider.alpha = 0.25;
        this.addChild(this.slider);
        this.btn_use = new exButton;
        this.btn_use.reset("res/button.png", "res/button.png", Laya.stage.width / 2, Laya.stage.height * 2.2 / 3, 0, 0, "center", "center", "", this);
        this.btn_use.init_text(48, "#FFFFFF");
        this.btn_left = new exButton;
        this.btn_left.reset("res/left.png", "res/left.png", 0, Laya.stage.height / 2, 0, 0, "left", "center", "", this);
        this.btn_right = new exButton;
        this.btn_right.reset("res/right.png", "res/right.png", Laya.stage.width, Laya.stage.height / 2, 0, 0, "right", "center", "", this);
        this.camera.fieldOfView = 70;
        this.camera.clearColor = null;
        for (var index = 0; index < 5; index++) {
            var aitem = new ArrangeItem;
            aitem.sprite3d = Laya.Sprite3D.instantiate(Laya.loader.getRes("res/skins/skin" + index + ".lh"));
            aitem.sprite3d.transform.scale = new Laya.Vector3(1, 1, 1);
            aitem.sprite3d.transform.translate(new Laya.Vector3(100, 100, 100), true);
            var child = aitem.sprite3d.getChildAt(0);
            var animator = child.getComponentByType(Laya.Animator);
            animator.play("STAND");
            this.items.push(aitem);
        }
        this.text_name = new exText(64, "#ffffff", this);
        this.text_name.pos(Laya.stage.width / 2, Laya.stage.height * 0.68 / 3);
        this.select_sprite3d = Laya.Sprite3D.instantiate(Laya.loader.getRes("res/effects/glow1.lh"));
        var ms3d = this.select_sprite3d.getChildAt(0);
        this.select_sprite3d_mat = ms3d.meshRender.material;
        this.select_sprite3d.transform.position = new Laya.Vector3(0, 0, 0);
        this.select_sprite3d.transform.scale = new Laya.Vector3(3, 3, 3);
        //this.select_sprite3d.transform.rotationEuler = new Laya.Vector3(this.d2r(-45),0,0);
    };
    SceneRole.prototype.reset = function () {
        _super.prototype.reset.call(this);
        if (this.camera.sky) {
            var skydome = this.camera.sky;
            if (skydome.texture) {
                skydome.texture.destroy();
            }
            skydome.texture = Laya.Texture2D.load("res/bg.png");
        }
        this.directionLight.color = new Laya.Vector3(0.99, 0.99, 0.99);
        this.directionLight.direction = new Laya.Vector3(1, 0.35, -1.5);
        Laya.SoundManager.stopMusic();
        if (Variable.instance.query("music") == "on") {
            Laya.SoundManager.playMusic("res/sound/gamebgm.mp3", 0);
        }
        Laya.Tween.clearAll(this);
        UIHud.instance.tween(0, -150);
        for (var index = 0; index < 5; index++) {
            var item = this.items[index];
            this.scene3d.addChild(item.sprite3d);
        }
        this.scene3d.addChild(this.select_sprite3d);
        this.btn_exit.tween(-100, 0);
        this.btn_exit.once("click", this, function (scene) {
            Laya.Tween.clearTween(this);
            scene.end_self();
        }, [this]);
        this.btn_use.tween(0, +100);
        this.down_start = false;
        this.down_dir = 0;
        this.slider.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        this.slider.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        this.slider.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        this.item_change(false);
        this.state = "select";
        var txt;
        switch (Variable.instance.query("lan")) {
            case "cn":
                txt = "选择";
                break;
            case "en":
                txt = "Select";
                break;
            case "pt":
                txt = "Selecione";
                break;
        }
        this.btn_use.set_window_text(txt, "center");
    };
    SceneRole.prototype.onMouseUp = function () {
        if (this.state == "select") {
            this.down_start = false;
            if (this.down_dir < 0) {
                if (this.select > 0) {
                    this.select--;
                    this.item_change(true);
                }
            }
            else if (this.down_dir > 0) {
                if (this.select < 4) {
                    this.select++;
                    this.item_change(true);
                }
            }
        }
    };
    SceneRole.prototype.onMouseDown = function () {
        if (this.state == "select") {
            if (this.down_start == false) {
                this.down_start = true;
                this.down_startx = Laya.stage.mouseX;
                this.down_starty = Laya.stage.mouseY;
            }
        }
    };
    SceneRole.prototype.onMouseMove = function () {
        if (this.state == "select") {
            var slid = this.down_startx - Laya.stage.mouseX;
            if (Math.abs(slid) > Laya.stage.width / 6) {
                this.down_dir = (slid > 0) ? 1 : -1;
            }
            else {
                this.down_dir = 0;
            }
        }
    };
    SceneRole.prototype.update = function () {
        _super.prototype.update.call(this);
        this.select_rotation -= 0.001;
        this.select_sprite3d.transform.rotationEuler = new Laya.Vector3(0, 0, this.select_rotation);
        var select_item = this.items[Variable.instance.query("role")];
        this.select_sprite3d.transform.position = new Laya.Vector3(0, 0.9, -1);
        switch (this.state) {
            case "select":
                this.camera.transform.position = new Laya.Vector3(this.px, this.py, this.pz);
                this.camera.transform.lookAt(new Laya.Vector3(this.vx, this.vy, this.vz), new Laya.Vector3(0, 1, 0));
                var elapsedTime = Laya.timer.delta;
                if (this.btn_left.get_state() == "down" && this.btn_left.check_state_change()) {
                    if (this.select > 0) {
                        this.select--;
                        this.item_change(true);
                    }
                }
                if (this.btn_right.get_state() == "down" && this.btn_right.check_state_change()) {
                    if (this.select < 4) {
                        this.select++;
                        this.item_change(true);
                    }
                }
                if (this.btn_use.get_state() == "down" && this.btn_use.check_state_change()) {
                    Variable.instance.set("role", this.select);
                    this.item_change(false);
                    Laya.SoundManager.playSound("res/sound/equip.wav", 1);
                }
                break;
            case "arrange":
                {
                    var elapse = Laya.timer.currTimer - this.arrange_time_start;
                    for (var index = 0; index < 5; index++) {
                        var aitem = this.items[index];
                        var x = this.linear(elapse, aitem.src_x, aitem.dst_x, 1000);
                        var z = this.linear(elapse, aitem.src_z, aitem.dst_z, 1000);
                        aitem.sprite3d.transform.position = new Laya.Vector3(x, 0, z);
                        if (elapse >= 1000) {
                            aitem.src_x = aitem.dst_x;
                            aitem.src_z = aitem.dst_z;
                        }
                    }
                    if (elapse >= 1000) {
                        this.state = "select";
                        var count = Number(Variable.instance.query("count"));
                        if (count < Conf.ROLE_UNLOCK_COST[this.select]) {
                            this.icon_lock.visible = true;
                            ;
                            this.icon_lock.tween(0, -150);
                        }
                        else {
                            this.btn_use.visible = true;
                        }
                        if (Variable.instance.query("role") == this.select) {
                            this.select_fade_in();
                        }
                        else {
                            this.select_show_hide();
                        }
                    }
                }
                break;
        }
    };
    SceneRole.prototype.end_self = function (code) {
        Laya.Tween.clearAll(this);
        for (var index = 0; index < 5; index++) {
            var item = this.items[index];
            item.sprite3d.removeSelf();
        }
        this.select_sprite3d.removeSelf();
        this.slider.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        this.slider.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        this.slider.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        _super.prototype.end_self.call(this, code);
    };
    SceneRole.prototype.item_change = function (tween) {
        var space = 1.8;
        for (var index = -2; index <= 2; index++) {
            var role_index = index + this.select;
            if (role_index >= 0 && role_index <= 4) {
                var item = this.items[role_index];
                var z = (index == 0) ? 0 : -2;
                if (tween) {
                    item.dst_x = index * space;
                    item.dst_z = z;
                }
                else {
                    item.src_x = index * space;
                    item.src_z = z;
                    item.sprite3d.transform.position = new Laya.Vector3(item.src_x, 0, item.src_z);
                }
                if (index == 0) {
                    this.text_name.set_content(Conf.ROLE_NAME[role_index], "center");
                }
            }
        }
        if (tween) {
            this.arrange_time_start = Laya.timer.currTimer;
            this.state = "arrange";
            this.icon_lock.visible = false;
            if (this.select_sprite3d_mat.albedoIntensity == 3) {
                this.select_fade_out();
            }
            this.btn_use.visible = false;
            this.icon_lock.visible = false;
        }
        else {
            this.select_show_hide();
            var count = Number(Variable.instance.query("count"));
            if (count < Conf.ROLE_UNLOCK_COST[this.select]) {
                this.icon_lock.visible = true;
                ;
                this.icon_lock.tween(0, -150);
            }
            else {
                this.btn_use.visible = true;
            }
        }
    };
    SceneRole.prototype.select_fade_in = function () {
        this.select_sprite3d_mat.albedoIntensity = 0;
        Laya.Tween.to(this.select_sprite3d_mat, { albedoIntensity: 3 }, 80, Laya.Ease.linearIn, Laya.Handler.create(this, function (para) {
            Laya.Tween.clearTween(para);
        }, [this.select_sprite3d_mat]));
    };
    SceneRole.prototype.select_fade_out = function () {
        this.select_sprite3d_mat.albedoIntensity = 3;
        Laya.Tween.to(this.select_sprite3d_mat, { albedoIntensity: 0 }, 80, Laya.Ease.linearIn, Laya.Handler.create(this, function (para) {
            Laya.Tween.clearTween(para);
        }, [this.select_sprite3d_mat]));
    };
    SceneRole.prototype.select_show_hide = function () {
        if (Variable.instance.query("role") == this.select) {
            this.select_sprite3d_mat.albedoIntensity = 3;
        }
        else {
            this.select_sprite3d_mat.albedoIntensity = 0;
        }
    };
    SceneRole.prototype.linear = function (t, b, c, d) {
        var r = t / d;
        return (c * r) + (b * (1 - r));
    };
    SceneRole.prototype.d2r = function (degree) {
        return ((degree) * (3.1415926 / 180));
    };
    return SceneRole;
}(Scene));
//# sourceMappingURL=SceneRole.js.map