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
var Staff = /** @class */ (function (_super) {
    __extends(Staff, _super);
    function Staff() {
        var _this = _super.call(this) || this;
        _this.pos = new Laya.Vector3(0, 0, 0);
        _this.time_rise_duration = 1500;
        _this.time_fall_duration = 1200;
        _this.time_disapper_duration = 300;
        return _this;
    }
    Staff.prototype.test_state = function (state) {
        return (this.state != state) ? true : false;
    };
    Staff.prototype.reset_state = function (state) {
        this.state = state;
    };
    Staff.prototype.reset_height = function () {
        this.pos.y = this.tile_height;
    };
    Staff.prototype.reset = function (scene, index, x, z) {
        this.parent_scene = scene;
        this.index = index;
        this.pos.x = x;
        this.pos.z = z;
        this.pos.y = -3;
        this.scale = 1;
        this.tile_height = Math.random() * 0.025;
        this.rise_height = Math.random() * 0.015;
        this.transform.position = this.pos;
    };
    Staff.prototype.delay = function (duration, target) {
        this.state = "delay";
        this.delay_target = target;
        this.time_start = Laya.timer.currTimer;
        this.time_delay_duration = duration;
    };
    Staff.prototype.rise = function () {
        if (this.test_state("rise")) {
            this.state = "rise";
            this.pos.y = -3;
            this.time_start = Laya.timer.currTimer;
        }
    };
    Staff.prototype.fall = function () {
        if (this.test_state("fall")) {
            this.state = "fall";
            this.pos.y = this.tile_height;
            this.time_start = Laya.timer.currTimer;
        }
    };
    Staff.prototype.disapper = function () {
        if (this.test_state("disapper")) {
            this.state = "disapper";
            this.scale = 1;
            this.time_start = Laya.timer.currTimer;
        }
    };
    Staff.prototype.hurt = function () {
        if (this.test_state("hurt")) {
            this.state = "hurt";
        }
    };
    Staff.prototype.remove = function () {
        if (this.test_state("remove")) {
            this.state = "remove";
        }
    };
    Staff.prototype.stand = function () {
        if (this.test_state("stand")) {
            this.state = "stand";
            this.pos.y = this.tile_height;
        }
    };
    Staff.prototype.get_state = function () {
        return this.state;
    };
    Staff.prototype.update = function (cx, cz, radius) {
        var dx = cx - this.pos.x;
        var dz = cz - this.pos.z;
        var ratio = Math.sqrt(dx * dx + dz * dz) / radius;
        var fixheight = 0.65 * (1 - Math.min(ratio, 1));
        var elapse = Laya.timer.currTimer - this.time_start;
        switch (this.state) {
            case "delay":
                {
                    if (elapse >= this.time_delay_duration) {
                        // console.log(elapse);
                        if (this.delay_target == "rise") {
                            this.rise();
                        }
                        else if (this.delay_target == "fall") {
                            this.fall();
                        }
                    }
                }
                break;
            case "rise":
                if (elapse >= this.time_rise_duration) {
                    this.stand();
                }
                else {
                    this.pos.y = this.linear(elapse, -3, this.tile_height, this.time_rise_duration);
                    //this.pos.y = this.BounceOut(elapse,-3,3 + this.tile_height,this.time_rise_duration);
                }
                break;
            case "fall":
                if (elapse >= this.time_fall_duration) {
                    this.disapper();
                }
                else {
                    this.pos.y = this.linear(elapse, this.tile_height, this.tile_height - 3, this.time_fall_duration);
                }
                break;
            case "disapper":
                if (elapse >= this.time_disapper_duration) {
                    this.remove();
                }
                else {
                    this.scale = this.linear(elapse, 1, 0, this.time_disapper_duration);
                }
                break;
            case "stand":
                {
                }
                break;
            case "remove":
                break;
        }
        this.transform.position = new Laya.Vector3(this.pos.x, this.pos.y + fixheight, this.pos.z);
        this.transform.scale = new Laya.Vector3(this.scale, this.scale, this.scale);
    };
    Staff.prototype.get_index_x = function () {
        return Math.floor(this.pos.x);
    };
    Staff.prototype.get_index_z = function () {
        return Math.floor(this.pos.z);
    };
    Staff.prototype.BounceOut = function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        }
        else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        }
        else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        }
        else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    };
    Staff.prototype.BounceIn = function (t, b, c, d) {
        return c - this.BounceOut(d - t, 0, c, d) + b;
    };
    Staff.prototype.BounceInOut = function (t, b, c, d) {
        if (t < d / 2)
            return this.BounceIn(t * 2, 0, c, d) * .5 + b;
        else
            return this.BounceOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    };
    Staff.prototype.linear = function (t, b, c, d) {
        var r = t / d;
        return (c * r) + (b * (1 - r));
    };
    Staff.prototype.d2r = function (degree) {
        return ((degree) * (3.1415926 / 180));
    };
    Staff.prototype.get_height = function () {
        return this.tile_height;
    };
    Staff.prototype.get_pos_y = function () {
        return this.pos.y;
    };
    Staff.prototype.get_index = function () {
        return this.index;
    };
    return Staff;
}(Laya.Sprite3D));
//# sourceMappingURL=Staff.js.map