var Tracker = /** @class */ (function () {
    function Tracker() {
    }
    Tracker.prototype.reset = function (player, camera, scene3d) {
        this.scene3d = scene3d;
        this.player = player;
        this.camera = camera;
        this.hdistance = -6.5;
        this.vdistance = 6.5;
        this.hangle = 45;
        this.vangle = 55;
        this.fov = 65;
    };
    Tracker.prototype.update = function () {
        var elapsedTime = Laya.timer.delta;
        var dx = Math.cos(this.d2r(this.hangle)) * this.hdistance;
        var dz = Math.sin(this.d2r(this.hangle)) * this.hdistance;
        var dy = Math.tan(this.d2r(this.vangle)) * this.vdistance;
        var px = this.player.transform.position.x + dx;
        var pz = this.player.transform.position.z + dz;
        var py = this.player.transform.position.y + dy;
        this.camera.fieldOfView = this.fov;
        this.camera.transform.position = new Laya.Vector3(px, py, pz);
        this.camera.transform.lookAt(new Laya.Vector3(this.player.transform.position.x + 3, 0.1, this.player.transform.position.z + 3), new Laya.Vector3(0, 1, 0));
        if (Laya.KeyBoardManager.hasKeyDown(87))
            this.hdistance += (0.01 * elapsedTime); //W
        if (Laya.KeyBoardManager.hasKeyDown(83))
            this.hdistance += (-0.01 * elapsedTime); //S
        if (Laya.KeyBoardManager.hasKeyDown(65))
            this.hangle += (-0.01 * elapsedTime); //A
        if (Laya.KeyBoardManager.hasKeyDown(68))
            this.hangle += (0.01 * elapsedTime); //D
        if (Laya.KeyBoardManager.hasKeyDown(81))
            this.vangle += (-0.1 * elapsedTime); //Q
        if (Laya.KeyBoardManager.hasKeyDown(69))
            this.vangle += (0.1 * elapsedTime); //E
        if (Laya.KeyBoardManager.hasKeyDown(90))
            this.fov -= (0.1 * elapsedTime); //Z\
        if (Laya.KeyBoardManager.hasKeyDown(67))
            this.fov += (0.1 * elapsedTime); //C        
    };
    Tracker.prototype.d2r = function (degree) {
        return ((degree) * (3.1415926 / 180));
    };
    Tracker.prototype.r2d = function (radian) {
        return (radian) * (180.0 / 3.1415926);
    };
    return Tracker;
}());
//# sourceMappingURL=Tracker.js.map