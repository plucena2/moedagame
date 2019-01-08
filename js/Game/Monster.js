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
var Monster = /** @class */ (function (_super) {
    __extends(Monster, _super);
    function Monster() {
        var _this = _super.call(this) || this;
        _this.sprite3d = null;
        _this.animator = null;
        _this.reward = 2;
        return _this;
    }
    Monster.prototype.reset = function (scene, index, x, z) {
        _super.prototype.reset.call(this, scene, index, x, z);
        if (this.sprite3d) {
            this.sprite3d.removeSelf();
            this.sprite3d.destroy();
        }
        this.sprite3d = Laya.Sprite3D.instantiate(Laya.loader.getRes("res/monsters/monster" + index + ".lh"));
        this.sprite3d.transform.scale = new Laya.Vector3(1.2, 1.2, 1.2);
        this.sprite3d.transform.translate(new Laya.Vector3(0, -0.55, 0), true);
        this.dir = (Math.floor(Math.random() * 1.99) == 0) ? 180 : 270;
        var child = this.sprite3d.getChildAt(0);
        this.animator = child.getComponentByType(Laya.Animator);
        this.addChild(this.sprite3d);
        this.sprite3d.transform.rotationEuler = new Laya.Vector3(0, this.d2r(90 - this.dir), 0);
    };
    Monster.prototype.set_property = function (level) {
        this.level = level;
    };
    Monster.prototype.set_player = function (player) {
        this.player = player;
    };
    Monster.prototype.lookat = function (player) {
        //this.sprite3d.transform.lookAt(player.pos,new Laya.Vector3(0,1,0),true);
        var dx = -(this.pos.x - player.pos.x);
        var dz = -(this.pos.z - player.pos.z);
        var inv = 1 / Math.sqrt(dx * dx + dz * dz);
        var dxn = dx * inv;
        var dzn = dz * inv;
        var angle = Math.acos(dxn * 0.0 + dzn * 1.0);
        var result = (dx < 0) ? -angle : angle;
        this.sprite3d.transform.rotationEuler = new Laya.Vector3(0, result, 0);
    };
    Monster.prototype.project2d = function () {
        var pos2d = new Laya.Vector3(0, 0, 0);
        this.parent_scene.camera.worldToViewportPoint(new Laya.Vector3(this.pos.x, this.pos.y + 1.7, this.pos.z), pos2d);
        return pos2d;
    };
    Monster.prototype.update = function (cx, cz, radius) {
        _super.prototype.update.call(this, cx, cz, radius);
        switch (this.state) {
            case "stand":
                if (this.animator.playState == 0) {
                    this.animator.play("STAND");
                }
                break;
            case "hurt":
                //if (this.animator.playState == 0)
                {
                    this.remove();
                    QuestManager.instance.trigger("kill");
                }
                break;
        }
    };
    Monster.prototype.rise = function () {
        if (this.test_state("rise")) {
            this.animator.play("STAND");
        }
        _super.prototype.rise.call(this);
    };
    Monster.prototype.stand = function () {
        if (this.test_state("stand")) {
            this.animator.play("STAND");
        }
        _super.prototype.stand.call(this);
    };
    Monster.prototype.disapper = function () {
        _super.prototype.disapper.call(this);
    };
    Monster.prototype.hurt = function () {
        if (this.test_state("hurt")) {
            // this.animator.play("STAND",1.2);
        }
        _super.prototype.hurt.call(this);
    };
    Monster.prototype.die = function () {
    };
    Monster.prototype.remove = function () {
        _super.prototype.remove.call(this);
    };
    return Monster;
}(Staff));
//# sourceMappingURL=Monster.js.map