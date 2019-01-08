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
var Axis = /** @class */ (function (_super) {
    __extends(Axis, _super);
    function Axis(length, scene3d) {
        var _this = _super.call(this) || this;
        //模拟x轴，其实是方体 红色
        var x = _this.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(length, 0.03, 0.03)));
        var material = new Laya.StandardMaterial();
        material.albedo = new Laya.Vector4(1, 0, 0, 0.5);
        x.meshRender.material = material;
        x.transform.position = new Laya.Vector3(length / 2, 0, 0);
        //模拟y轴，其实是方体 绿色
        var y = _this.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.03, 0.03, length)));
        var material = new Laya.StandardMaterial();
        material.albedo = new Laya.Vector4(0, 1, 0, 1);
        y.meshRender.material = material;
        y.transform.position = new Laya.Vector3(0, length / 2, 0);
        //模拟z轴，其实是方体 蓝色
        var z = _this.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.03, length, 0.03)));
        var material = new Laya.StandardMaterial();
        material.albedo = new Laya.Vector4(0, 0, 1, 1);
        z.meshRender.material = material;
        z.transform.position = new Laya.Vector3(0, 0, length / 2);
        scene3d.addChild(_this);
        return _this;
    }
    return Axis;
}(Laya.Sprite3D));
//# sourceMappingURL=Axis.js.map