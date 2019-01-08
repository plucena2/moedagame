var Grids = /** @class */ (function () {
    function Grids() {
        this.gen_flag = null;
        this.tile_index = null;
        this.water_index = null;
        this.object_index = null;
        this.grid_size = Conf.CHUNKSIZE * 3;
        this.tile_index = new Array(this.grid_size * this.grid_size);
        this.water_index = new Array(this.grid_size * this.grid_size);
        this.object_index = new Array(this.grid_size * this.grid_size);
        this.gen_flag = new Array(this.grid_size * this.grid_size);
    }
    Grids.prototype.gen_random = function () {
        for (var x = 0; x < this.grid_size; x++) {
            for (var z = 0; z < this.grid_size; z++) {
                var index = x + z * this.grid_size;
                this.tile_index[index] = Math.floor(Math.random() * 8);
            }
        }
    };
    Grids.prototype.set_map_type_index = function (mti) {
        this.map_type_index = mti;
    };
    Grids.prototype.get_map_type_index = function (mti) {
        return this.map_type_index;
    };
    Grids.prototype.gen_all_from_parrten = function () {
        var steps = this.grid_size / Conf.CHUNKSIZE;
        for (var sx = 0; sx < steps; sx++) {
            for (var sz = 0; sz < steps; sz++) {
                var par = ParttenFactory.instance.parttens[this.map_type_index];
                this.copy_partten(sx, sz, par);
            }
        }
    };
    Grids.prototype.copy_partten = function (sx, sz, par) {
        for (var x = 0; x < par.grid_size; x++) {
            for (var z = 0; z < par.grid_size; z++) {
                this.tile_index[(sx * Conf.CHUNKSIZE + x) + (sz * Conf.CHUNKSIZE + z) * this.grid_size] = par.tile[x + z * par.grid_size];
                this.water_index[(sx * Conf.CHUNKSIZE + x) + (sz * Conf.CHUNKSIZE + z) * this.grid_size] = par.water[x + z * par.grid_size];
                this.object_index[(sx * Conf.CHUNKSIZE + x) + (sz * Conf.CHUNKSIZE + z) * this.grid_size] = par.object[x + z * par.grid_size];
            }
        }
    };
    Grids.prototype.reset_all_flag = function () {
        for (var x = 0; x < this.grid_size; x++) {
            for (var z = 0; z < this.grid_size; z++) {
                var index = x + z * this.grid_size;
                this.gen_flag[index] = 0;
            }
        }
        this.last_gen_partten_distance = 0;
        this.last_x_reset_flag = -1;
        this.last_z_reset_flag = -1;
    };
    Grids.prototype.reset_other_flag = function (px, pz) {
        for (var ix = -2; ix < 1; ix++) {
            for (var iz = -2; iz < 1; iz++) {
                var chunkx = Math.floor(px / Conf.CHUNKSIZE);
                var chunkz = Math.floor(pz / Conf.CHUNKSIZE);
                var cur_chx = (chunkx + ix) % Math.floor(this.grid_size / Conf.CHUNKSIZE);
                var cur_chz = (chunkz + iz) % Math.floor(this.grid_size / Conf.CHUNKSIZE);
                if (cur_chx >= 0 && cur_chz >= 0) {
                    for (var x = 0; x < Conf.CHUNKSIZE; x++)
                        for (var z = 0; z < Conf.CHUNKSIZE; z++) {
                            var index = x + (cur_chx * Conf.CHUNKSIZE) + (z + (cur_chz * Conf.CHUNKSIZE)) * this.grid_size;
                            this.gen_flag[index] = 0;
                        }
                }
            }
        }
    };
    Grids.prototype.update = function (x, z, d) {
        var xx = Math.floor(x);
        var zz = Math.floor(z);
        // if ( (xx % Math.floor(this.grid_size) == 0 || zz % Math.floor(this.grid_size) == 0) &&  d - this.last_gen_partten_distance > 128)
        if (d - this.last_gen_partten_distance > 125) {
            this.last_gen_partten_distance = d;
            this.map_type_index = (this.map_type_index + 1) % 3;
            console.log(this.map_type_index);
            this.gen_all_from_parrten();
        }
        if ((xx % Math.floor(Conf.CHUNKSIZE / 2) == 0 && xx != this.last_x_reset_flag) || (zz % Math.floor(Conf.CHUNKSIZE / 2) == 0 && zz != this.last_z_reset_flag)) {
            this.last_x_reset_flag = xx;
            this.last_z_reset_flag = zz;
            //console.log("start:%d %d",xx,zz);
            this.reset_other_flag(xx, zz);
        }
    };
    Grids.prototype.get_gen_flag = function (x, z) {
        return this.gen_flag[this.warp_index(x, z)];
    };
    Grids.prototype.warp_float = function (value) {
        //return ((value * 100) % (this.grid_size * 100)) / 100;
        return Math.floor(value) % this.grid_size;
    };
    Grids.prototype.warp_index = function (x, z) {
        var wx = this.warp_float(x);
        var wz = this.warp_float(z);
        return wx + wz * this.grid_size;
    };
    Grids.prototype.set_gen_flag = function (x, z) {
        this.gen_flag[this.warp_index(x, z)] = 1;
    };
    Grids.prototype.get_tile_index = function (x, z) {
        return this.tile_index[this.warp_index(x, z)];
    };
    Grids.prototype.get_water_index = function (x, z) {
        return this.water_index[this.warp_index(x, z)];
    };
    Grids.prototype.get_object_index = function (x, z) {
        return this.object_index[this.warp_index(x, z)];
    };
    return Grids;
}());
//# sourceMappingURL=Grid.js.map