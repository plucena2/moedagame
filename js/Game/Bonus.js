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
var Bonus = /** @class */ (function (_super) {
    __extends(Bonus, _super);
    function Bonus() {
        var _this = _super.call(this) || this;
        _this.sprite3d = null;
        _this.animator = null;
        _this.reward = 1;
        return _this;
    }
    Bonus.prototype.reset = function (scene, index, x, z) {
        _super.prototype.reset.call(this, scene, index, x, z);
        if (this.sprite3d) {
            this.sprite3d.removeSelf();
            this.sprite3d.destroy();
        }
        this.sprite3d = Laya.Sprite3D.instantiate(Laya.loader.getRes("res/bonuses/bonus" + index + ".lh"));
        this.sprite3d.transform.scale = new Laya.Vector3(1.25, 1.25, 1.25);
        //this.sprite3d.transform.translate(new Laya.Vector3(0,-0.55,0),true);
        this.dir = (Math.floor(Math.random() * 1.99) == 0) ? 180 : 270;
        var child = this.sprite3d.getChildAt(0);
        this.animator = child.getComponentByType(Laya.Animator);
        this.addChild(this.sprite3d);
        this.animator.play("STAND", 1.02);
        this.sprite3d.transform.rotationEuler = new Laya.Vector3(0, this.d2r(90 - this.dir), 0);
        //Laya.stage.addChild(this.display);
    };
    Bonus.prototype.update = function (cx, cz, radius) {
        _super.prototype.update.call(this, cx, cz, radius);
        //this.display.set_content(""+this.level,true);
        //var pos2d = new Laya.Vector3(0,0,0);
        //this.camera.worldToViewportPoint(new Laya.Vector3(this.pos.x,this.pos.y + 1.7,this.pos.z),pos2d);
        //this.display.pos(pos2d.x,pos2d.y);
        switch (this.state) {
            case "stand":
                break;
            case "hurt":
                if (this.animator.playState == 0) {
                    this.remove();
                }
                break;
        }
    };
    Bonus.prototype.stand = function () {
        _super.prototype.stand.call(this);
    };
    Bonus.prototype.disapper = function () {
        _super.prototype.disapper.call(this);
    };
    Bonus.prototype.remove = function () {
        _super.prototype.remove.call(this);
    };
    return Bonus;
}(Staff));
//# sourceMappingURL=Bonus.js.map