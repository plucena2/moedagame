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
var Tile = /** @class */ (function (_super) {
    __extends(Tile, _super);
    function Tile() {
        return _super.call(this) || this;
    }
    Tile.prototype.reset = function (scene, index, x, z) {
        _super.prototype.reset.call(this, scene, index, x, z);
        if (this.sprite3d) {
            this.sprite3d.removeSelf();
            this.sprite3d.destroy();
        }
        if (index != -1) {
            this.sprite3d = Laya.Sprite3D.instantiate(Laya.loader.getRes("res/tiles/" + index + ".lh"));
            this.sprite3d.transform.translate(new Laya.Vector3(0, -0.5, 0), true);
            // var dir = (Math.floor(Math.random() * 1.99) == 0)? 180 : 270;
            // this.sprite3d.transform.rotationEuler = new Laya.Vector3(0,this.d2r(90 - dir),0); 
            // for(var s = 0; s < this.sprite3d.getChildAt(0).numChildren;s++)
            // {
            //     var sms3d = this.sprite3d.getChildAt(0).getChildAt(s) as Laya.SkinnedMeshSprite3D;
            //     var mat:Laya.StandardMaterial = sms3d.skinnedMeshRender.material as Laya.StandardMaterial;
            //     mat.ambientColor = new Laya.Vector3(1,1,1);                
            //     mat.specularColor = new Laya.Vector4(0,0,0,0);                            
            // }
            this.addChild(this.sprite3d);
        }
    };
    Tile.prototype.update = function (cx, cz, radius) {
        _super.prototype.update.call(this, cx, cz, radius);
    };
    return Tile;
}(Staff));
//# sourceMappingURL=Tile.js.map