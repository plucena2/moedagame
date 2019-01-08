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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(scene3d, camera) {
        var _this = _super.call(this) || this;
        _this.speed = 0.04; //0.08;
        _this.pos = new Laya.Vector3(0, 0, 0);
        _this.scene3d = scene3d;
        _this.camera = camera;
        _this.pops = new Laya.Sprite;
        return _this;
    }
    Player.prototype.reset = function (x, z, dir) {
        this.removeSelf();
        this.scene3d.addChild(this);
        if (this.sprite3d) {
            this.sprite3d.removeSelf();
            this.sprite3d.destroy();
        }
        this.sprite3d = Laya.Sprite3D.instantiate(Laya.loader.getRes("res/skins/skin" + Variable.instance.query("role") + ".lh"));
        //this.sprite3d.transform.scale = new Laya.Vector3(0.6,0.6,0.6);        
        this.sprite3d.transform.translate(new Laya.Vector3(0, 0, 0), true);
        var child = this.sprite3d.getChildAt(0);
        this.animator = child.getComponentByType(Laya.Animator);
        this.addChild(this.sprite3d);
        this.pos.x = x;
        this.pos.y = 0;
        this.pos.z = z;
        this.level = 1;
        this.exp = 0;
        this.life = 3;
        this.last_dist = this.dist = 0;
        this.remove = false;
        this.look_dir = this.move_dir = this.want_dir = dir;
        this.transform.position = this.pos;
        this.sprite3d.transform.rotationEuler = new Laya.Vector3(0, this.d2r(90 - this.look_dir), 0);
        this.walk();
        this.pops.removeSelf();
        Laya.stage.addChild(this.pops);
        this.pops.visible = true;
    };
    Player.prototype.ontap = function () {
        if (this.move_dir == 90) {
            this.want_dir = 0;
        }
        else {
            this.want_dir = 90;
        }
    };
    Player.prototype.test_state = function (state) {
        return (this.state != state) ? true : false;
    };
    Player.prototype.walk = function () {
        if (this.test_state("walk")) {
            Laya.SoundManager.stopSound("res/sound/step.mp3");
            Laya.SoundManager.playSound("res/sound/step.mp3", 0);
            this.animator.play("RUN", 1.5);
            this.state = "walk";
        }
    };
    Player.prototype.die = function () {
        if (this.test_state("die")) {
            Laya.SoundManager.stopSound("res/sound/step.mp3");
            this.pops.visible = false;
            this.animator.play("DIE");
            this.state = "die";
        }
    };
    Player.prototype.fall = function () {
        if (this.test_state("fall")) {
            Laya.SoundManager.stopSound("res/sound/step.mp3");
            this.pops.visible = false;
            this.animator.play("FALL");
            this.state = "fall";
        }
    };
    Player.prototype.revive = function () {
        this.remove = false;
        this.pops.visible = true;
        this.walk();
    };
    Player.prototype.get_dx = function () {
        return Math.cos(this.d2r(this.move_dir));
    };
    Player.prototype.get_dz = function () {
        return Math.sin(this.d2r(this.move_dir));
    };
    Player.prototype.set_height = function (height) {
        this.pos.y = height;
    };
    Player.prototype.update = function () {
        switch (this.state) {
            case "walk":
                {
                    var dx = this.get_dx();
                    var dz = this.get_dz();
                    this.pos.x += dx * this.speed;
                    this.pos.z += dz * this.speed;
                    this.dist += Math.sqrt((dx * this.speed) * (dx * this.speed) + (dz * this.speed) * (dz * this.speed));
                    if (Math.floor(this.dist) != this.last_dist) {
                        //
                        QuestManager.instance.trigger("move");
                        this.last_dist = Math.floor(this.dist);
                    }
                    this.auto_turn();
                    if (this.move_dir != this.want_dir) {
                        if (Math.abs(this.pos.x - Math.floor(this.pos.x)) < 0.1 && Math.abs(this.pos.z - Math.floor(this.pos.z)) < 0.1) {
                            this.move_dir = this.want_dir;
                        }
                    }
                }
                break;
            case "fall":
                {
                    if (this.animator && this.animator.playState == 0) {
                        this.remove = true;
                    }
                }
                break;
            case "die":
                {
                    if (this.animator && this.animator.playState == 0) {
                        this.remove = true;
                    }
                }
        }
        var pos2d = this.get_screen_pos();
        this.transform.position = this.pos;
        this.sprite3d.transform.rotationEuler = new Laya.Vector3(0, this.d2r(90 - this.look_dir), 0);
        for (var i = this.pops.numChildren - 1; i > -1; i--) {
            var p = this.pops.getChildAt(i);
            p.update(pos2d.x, pos2d.y);
            if (p.remove) {
                p.removeSelf();
                Laya.Pool.recover("pop", p);
            }
        }
    };
    Player.prototype.get_screen_pos = function () {
        var pos2d = new Laya.Vector3(0, 0, 0);
        this.camera.worldToViewportPoint(new Laya.Vector3(this.pos.x, this.pos.y + 2.55, this.pos.z), pos2d);
        return pos2d;
    };
    Player.prototype.add_popup = function (image, text, duration) {
        var pos2d = this.get_screen_pos();
        var pop = Laya.Pool.getItemByClass("pop", Pop);
        pop.reset(image, text, duration, pos2d.x, pos2d.y);
        this.pops.addChild(pop);
    };
    Player.prototype.auto_turn = function () {
        var iDir = Math.floor(this.want_dir);
        var iCurDir = Math.floor(this.look_dir);
        iDir = (iDir + 360) % 360;
        iCurDir = (iCurDir + 360) % 360;
        var iTurnSpeed = 6;
        if (iDir != iCurDir) {
            var iDist = iDir - iCurDir;
            if (Math.abs(iDist) < iTurnSpeed) {
                iTurnSpeed = Math.abs(iDist);
            }
            if (Math.abs(iDist) < 180) {
                if (iCurDir > iDir) {
                    iCurDir -= iTurnSpeed;
                }
                else {
                    iCurDir += iTurnSpeed;
                }
            }
            else {
                if (iCurDir < iDir) {
                    iCurDir -= iTurnSpeed;
                }
                else {
                    iCurDir += iTurnSpeed;
                }
            }
        }
        this.look_dir = iCurDir;
    };
    Player.prototype.d2r = function (degree) {
        return ((degree) * (3.1415926 / 180));
    };
    Player.prototype.add_money = function (money) {
        QuestManager.instance.trigger("pickgold");
        Variable.instance.add("money", money);
        this.add_popup("res/gold.png", "+" + money, 1700);
    };
    return Player;
}(Laya.Sprite3D));
//# sourceMappingURL=Player.js.map