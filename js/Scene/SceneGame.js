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
var SceneGame = /** @class */ (function (_super) {
    __extends(SceneGame, _super);
    function SceneGame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SceneGame.prototype.init = function (scene3d, camera, directionLight) {
        _super.prototype.init.call(this, scene3d, camera, directionLight);
        this.grids = new Grids();
        //添加自定义模型
        this.player = new Player(this.scene3d, this.camera);
        this.tracker = new Tracker;
        this.fps = new exText(12, "#77ff77", this);
        this.fps.pos(Laya.stage.width / 2, 6);
        //this.axis = new Axis(5,this.scene3d);
        this.tiles = new Laya.Sprite3D;
        this.scene3d.addChild(this.tiles);
        this.waters = new Laya.Sprite3D;
        this.scene3d.addChild(this.waters);
        this.objects = new Laya.Sprite3D;
        this.scene3d.addChild(this.objects);
        this.monsters = new Laya.Sprite3D;
        this.scene3d.addChild(this.monsters);
        this.bonuses = new Laya.Sprite3D;
        this.scene3d.addChild(this.bonuses);
        this.text_dist = new exText(48, "#ffffff", this);
        this.text_dist.pos(Laya.stage.width / 2, 64 + 64);
        this.addChild(this.text_dist);
        this.ui_blank = new exBlank("#000000", 0.95, this);
        this.ui_blank.visible = false;
        this.ui_layer_revive = new UIRevive;
        this.addChild(this.ui_layer_revive);
        this.ui_layer_revive.hide();
        this.pops = new Laya.Sprite;
        this.addChild(this.pops);
    };
    SceneGame.prototype.reset = function () {
        _super.prototype.reset.call(this);
        Laya.SoundManager.stopMusic();
        if (Variable.instance.query("music") == "on") {
            Laya.SoundManager.playMusic("res/sound/gamebgm.mp3", 0);
        }
        this.ui_blank.visible = false;
        this.ui_layer_revive.reset();
        this.ui_layer_revive.hide();
        if (this.camera.sky) {
            var skydome = this.camera.sky;
            skydome.texture = Laya.Texture2D.load("res/skybox.png");
        }
        UIHud.instance.tween(0, -150);
        this.directionLight.color = new Laya.Vector3(1.2, 1.2, 1.2);
        this.directionLight.direction = new Laya.Vector3(1, -1.35, 1);
        this.player.reset(1, 1, 0);
        this.tracker.reset(this.player, this.camera, this.scene3d);
        this.grids.set_map_type_index(0);
        this.grids.gen_all_from_parrten();
        this.grids.reset_all_flag();
        for (var i = this.pops.numChildren - 1; i > -1; i--) {
            var p = this.pops.getChildAt(i);
            p.removeSelf();
            Laya.Pool.recover("pop", p);
        }
        this.guide = false;
        this.clear_terrain();
        this.clear_staff();
        //预生产地形
        this.refresh_staff(0, 10, 0, 0, false);
        //into waite
        // this.state = "wait";     
        // Laya.stage.once("mousedown",this,function(self:SceneGame)
        // {
        var self = this;
        self.state = "running";
        Laya.stage.on("mousedown", self, self.mouse_down);
        Laya.stage.on("mouseup", this, this.mouse_up);
        //},[this]);          
    };
    SceneGame.prototype.clear_terrain = function () {
        for (var i = this.tiles.numChildren - 1; i > -1; i--) {
            var t = this.tiles.getChildAt(i);
            t.removeSelf();
            Laya.Pool.recover("tile", t);
        }
        for (var i = this.waters.numChildren - 1; i > -1; i--) {
            var w = this.waters.getChildAt(i);
            w.removeSelf();
            Laya.Pool.recover("water", w);
        }
    };
    SceneGame.prototype.clear_staff = function () {
        for (var i = this.objects.numChildren - 1; i > -1; i--) {
            var o = this.objects.getChildAt(i);
            o.removeSelf();
            Laya.Pool.recover("gobject", o);
        }
        for (var i = this.monsters.numChildren - 1; i > -1; i--) {
            var m = this.monsters.getChildAt(i);
            m.remove();
            m.removeSelf();
            Laya.Pool.recover("monster", m);
        }
        for (var i = this.bonuses.numChildren - 1; i > -1; i--) {
            var b = this.bonuses.getChildAt(i);
            b.removeSelf();
            Laya.Pool.recover("bonus", b);
        }
    };
    SceneGame.prototype.refresh_staff = function (start, end, cx, cz, dynamic) {
        for (var i = start; i < end; i++) {
            for (var j = start; j <= end; j++) {
                var x = i + cx;
                var z = j + cz;
                var gen_flag = this.grids.get_gen_flag(x, z);
                if (gen_flag == 0 && x >= 0 && z >= 0) {
                    var has_tile = false;
                    var has_water = false;
                    var has_object = false;
                    var found_tile = this.find_tile(x, z);
                    var found_water = this.find_water(x, z);
                    var found_object = this.find_object(x, z);
                    if (!found_tile && !found_water && !found_object) {
                        if (!found_tile) {
                            var tile_index = this.grids.get_tile_index(x, z);
                            if (tile_index != -1) {
                                var tile = Laya.Pool.getItemByClass("tile", Tile);
                                tile.reset(this, tile_index, x, z);
                                if (!dynamic) {
                                    tile.reset_state("stand");
                                    tile.reset_height();
                                }
                                else {
                                    tile.delay(Math.random() * 500, "rise");
                                }
                                this.tiles.addChild(tile);
                                has_tile = true;
                            }
                        }
                        if (!found_water) {
                            var water_index = this.grids.get_water_index(x, z);
                            if (water_index != -1) {
                                var water = Laya.Pool.getItemByClass("water", Water);
                                water.reset(this, water_index, x, z);
                                if (!dynamic) {
                                    water.reset_state("stand");
                                    water.reset_height();
                                }
                                else {
                                    water.delay(Math.random() * 500, "rise");
                                }
                                this.waters.addChild(water);
                                has_water = true;
                            }
                        }
                        if (!found_object) {
                            var object_index = this.grids.get_object_index(x, z);
                            if (object_index != -1) {
                                var gen = true;
                                if (object_index == 40 && this.guide == true) {
                                    gen = false;
                                }
                                if (object_index == 41 && this.guide == true) {
                                    gen = false;
                                }
                                if (gen) {
                                    var object = Laya.Pool.getItemByClass("gobject", GObject);
                                    object.reset(this, object_index, x, z);
                                    if (!dynamic) {
                                        object.reset_state("stand");
                                        object.reset_height();
                                    }
                                    else {
                                        object.delay(Math.random() * 500, "rise");
                                    }
                                    this.objects.addChild(object);
                                    has_object = true;
                                }
                            }
                        }
                        if (has_tile && !has_water && !has_object) {
                            if (Math.random() < 0.04) {
                                if (Math.random() < 0.35) {
                                    var monster = Laya.Pool.getItemByClass("monster", Monster);
                                    monster.reset(this, Math.floor(Math.random() * 1.5), x, z);
                                    if (!dynamic) {
                                        monster.reset_state("stand");
                                        monster.reset_height();
                                    }
                                    else {
                                        monster.delay(Math.random() * 500, "rise");
                                    }
                                    //
                                    var range = this.player.dist / 30;
                                    var level_max = Math.floor(Math.min(range, 29.5));
                                    monster.set_property(Math.floor(Math.random() * level_max) + 1);
                                    monster.set_player(this.player);
                                    this.monsters.addChild(monster);
                                }
                                else if (Math.random() < 0.45) {
                                    //其他道具
                                    var bonus = Laya.Pool.getItemByClass("bonus", Bonus);
                                    bonus.reset(this, Math.floor(Math.random() * 3.9), x, z);
                                    if (!dynamic) {
                                        bonus.reset_state("stand");
                                        bonus.reset_height();
                                    }
                                    else {
                                        bonus.delay(Math.random() * 500, "rise");
                                    }
                                    this.bonuses.addChild(bonus);
                                }
                            }
                        }
                        this.grids.set_gen_flag(x, z);
                    }
                }
            }
        }
        this.guide = true;
    };
    SceneGame.prototype.replace_staff = function () {
        var index_set = [
            [0, 1, 2, 3],
            [4, 5, 6],
            [7, 8, 9, 10],
            [11, 12, 13],
            [14, 15, 16]
        ];
        var tile_array = index_set[this.grids.map_type_index];
        for (var i = 0; i <= 3; i++) {
            for (var j = 0; j <= 3; j++) {
                var x = i + this.player.pos.x;
                var z = j + this.player.pos.z;
                if (!this.find_tile(x, z)) {
                    var tile_index = tile_array[Math.floor(Math.random() * (tile_array.length - 0.01))];
                    ;
                    var tile = Laya.Pool.getItemByClass("tile", Tile);
                    tile.reset(this, tile_index, x, z);
                    tile.reset_state("stand");
                    tile.reset_height();
                    this.tiles.addChild(tile);
                    var gen_flag = this.grids.set_gen_flag(x, z);
                }
                var water = this.find_water(x, z);
                if (water) {
                    water.removeSelf();
                    Laya.Pool.recover("water", water);
                }
                var object = this.find_object(x, z);
                if (object) {
                    object.removeSelf();
                    Laya.Pool.recover("gobject", object);
                }
                var monster = this.find_monster(x, z);
                if (monster) {
                    monster.removeSelf();
                    Laya.Pool.recover("monster", monster);
                }
            }
        }
    };
    SceneGame.prototype.revive = function () {
        Laya.SoundManager.stopMusic();
        if (Variable.instance.query("music") == "on") {
            Laya.SoundManager.playMusic("res/sound/gamebgm.mp3", 0);
        }
        this.ui_blank.visible = false;
        this.ui_layer_revive.hide();
        UIHud.instance.tween(0, -150);
        this.player.revive();
        this.tracker.reset(this.player, this.camera, this.scene3d);
        this.player.pos.x = Math.floor(this.player.pos.x);
        this.player.pos.z = Math.floor(this.player.pos.z);
        for (var i = this.pops.numChildren - 1; i > -1; i--) {
            var p = this.pops.getChildAt(i);
            p.removeSelf();
            Laya.Pool.recover("pop", p);
        }
        //this.clear_scene();       
        //this.grids.gen_all_from_parrten();        
        //this.grids.reset_all_flag();
        //替换玩家附近的地形
        this.replace_staff();
        this.state = "running";
    };
    SceneGame.prototype.mouse_down = function () {
        this.player.ontap();
    };
    SceneGame.prototype.mouse_up = function () {
    };
    SceneGame.prototype.collision = function () {
        if (this.player.state == "walk") {
            var x = Math.floor(this.player.pos.x + 0.5);
            var z = Math.floor(this.player.pos.z + 0.5);
            var object = this.find_object(x, z);
            if (object != null) {
                switch (object.get_index()) {
                    default:
                        {
                            Laya.SoundManager.playSound("res/sound/MHeroDeath.wav", 1);
                            this.player.die();
                        }
                }
            }
            else if (this.find_monster(x, z) != null) {
                var monster = this.find_monster(x, z);
                if (monster.state == "stand") {
                    this.player.add_money(monster.reward);
                    monster.hurt();
                    Laya.SoundManager.playSound("res/sound/PickupCoin.wav", 1);
                }
            }
            else if (this.find_bonus(x, z) != null) {
                var bonus = this.find_bonus(x, z);
                if (bonus.state == "stand") {
                    this.player.add_money(bonus.reward);
                    Laya.SoundManager.playSound("res/sound/PickupCoin.wav", 1);
                    bonus.remove();
                }
            }
            else {
                var cx = Math.floor(this.player.pos.x);
                var cz = Math.floor(this.player.pos.z);
                if (this.find_water(cx, cz) != null) {
                    //1.如果有水 ,吊水死亡
                    Laya.SoundManager.playSound("res/sound/MHeroDeathDrowning.wav", 1);
                    this.player.fall();
                }
                else if (this.find_tile(cx, cz) == null) {
                    //掉下悬崖
                    Laya.SoundManager.playSound("res/sound/MHeroDeathFall.wav", 1);
                    this.player.fall();
                }
            }
        }
        //3.如果有怪物,A.战斗怪物 B.金币 C.经验道具
    };
    SceneGame.prototype.shuffle = function (array, length) {
        var m = length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    };
    SceneGame.prototype.update_staff = function () {
        var cx = Math.floor(this.player.pos.x);
        var cz = Math.floor(this.player.pos.z);
        var radius = 3;
        this.refresh_staff(-radius - 2, radius + 3, cx + 3, cz + 3, true);
        for (var i = this.tiles.numChildren - 1; i > -1; i--) {
            var tile = this.tiles.getChildAt(i);
            tile.update(this.player.pos.x, this.player.pos.z, radius + 2);
            if (tile.get_state() == "remove") {
                tile.removeSelf();
                Laya.Pool.recover("tile", tile);
            }
            else if ((cx - tile.get_index_x() >= radius || cz - tile.get_index_z() >= radius) && tile.get_state() != "fall" && tile.get_state() != "disapper") {
                var delay = Math.random() * 400;
                tile.delay(delay, "fall");
                this.tile_fall(delay, tile.get_index_x(), tile.get_index_z());
            }
        }
        for (var i = this.waters.numChildren - 1; i > -1; i--) {
            var water = this.waters.getChildAt(i);
            water.update(this.player.pos.x, this.player.pos.z, radius + 2);
            if (water.get_state() == "remove") {
                water.removeSelf();
                Laya.Pool.recover("water", water);
            }
            else if ((cx - water.get_index_x() >= radius || cz - water.get_index_z() >= radius) && water.get_state() != "fall" && water.get_state() != "disapper") {
                water.delay(Math.random() * 300, "fall");
            }
        }
        for (var i = this.objects.numChildren - 1; i > -1; i--) {
            var object = this.objects.getChildAt(i);
            object.update(this.player.pos.x, this.player.pos.z, radius + 2);
            if (object.get_state() == "remove") {
                object.removeSelf();
                Laya.Pool.recover("gobject", object);
            }
        }
        for (var i = this.monsters.numChildren - 1; i > -1; i--) {
            var monster = this.monsters.getChildAt(i);
            monster.update(this.player.pos.x, this.player.pos.z, radius + 2);
            monster.lookat(this.player);
            if (monster.get_state() == "remove") {
                monster.removeSelf();
                Laya.Pool.recover("monster", monster);
            }
        }
        for (var i = this.bonuses.numChildren - 1; i > -1; i--) {
            var bonus = this.bonuses.getChildAt(i);
            bonus.update(this.player.pos.x, this.player.pos.z, radius + 2);
            if (bonus.get_state() == "remove") {
                bonus.removeSelf();
                Laya.Pool.recover("bonus", bonus);
            }
        }
        return false;
    };
    SceneGame.prototype.tile_fall = function (delay, x, z) {
        var obj_on_tile = this.find_object(x, z);
        if (obj_on_tile != null) {
            obj_on_tile.delay(delay, "fall");
        }
        else {
            var monster_on_tile = this.find_monster(x, z);
            if (monster_on_tile != null) {
                monster_on_tile.delay(delay, "fall");
            }
            else {
                var bonus_on_tile = this.find_bonus(x, z);
                if (bonus_on_tile != null) {
                    bonus_on_tile.delay(delay, "fall");
                }
            }
        }
    };
    SceneGame.prototype.find_tile = function (x, z) {
        for (var i = 0; i < this.tiles.numChildren; i++) {
            var t = this.tiles.getChildAt(i);
            if (t.get_index_x() == x && t.get_index_z() == z) {
                return t;
            }
        }
        return null;
    };
    SceneGame.prototype.find_water = function (x, z) {
        for (var i = 0; i < this.waters.numChildren; i++) {
            var w = this.waters.getChildAt(i);
            if (w.get_index_x() == x && w.get_index_z() == z) {
                return w;
            }
        }
        return null;
    };
    SceneGame.prototype.find_object = function (x, z) {
        for (var i = 0; i < this.objects.numChildren; i++) {
            var o = this.objects.getChildAt(i);
            if (o.get_index_x() == x && o.get_index_z() == z) {
                return o;
            }
        }
        return null;
    };
    SceneGame.prototype.find_monster = function (x, z) {
        for (var i = 0; i < this.monsters.numChildren; i++) {
            var m = this.monsters.getChildAt(i);
            if (m.get_index_x() == x && m.get_index_z() == z) {
                return m;
            }
        }
        return null;
    };
    SceneGame.prototype.find_monster_ex = function (monster) {
        for (var i = 0; i < this.monsters.numChildren; i++) {
            var m = this.monsters.getChildAt(i);
            if (monster == m) {
                return true;
            }
        }
        return false;
    };
    SceneGame.prototype.find_bonus = function (x, z) {
        for (var i = 0; i < this.bonuses.numChildren; i++) {
            var b = this.bonuses.getChildAt(i);
            if (b.get_index_x() == x && b.get_index_z() == z) {
                return b;
            }
        }
        return null;
    };
    SceneGame.prototype.get_tile_height = function (x, z) {
        var tile = this.find_tile(Math.floor(x + 0.5), Math.floor(z + 0.5));
        if (tile) {
            return tile.get_height();
        }
        return 0;
    };
    SceneGame.prototype.update = function () {
        _super.prototype.update.call(this);
        this.fps.set_content("" + Laya.Stat.FPS, "center");
        UIHud.instance.set_money(Variable.instance.query("money"));
        UIHud.instance.set_life(this.player.life);
        this.update_quest();
        this.update_pop();
        this.tracker.update();
        if (this.state == "running") {
            this.text_dist.set_content("" + Math.floor(this.player.dist) + "M", "center");
            var height = this.get_tile_height(this.player.pos.x, this.player.pos.z);
            this.player.set_height(height);
            this.player.update();
            this.grids.update(this.player.pos.x, this.player.pos.z, this.player.dist);
            this.update_staff();
            this.collision();
            if (this.player.remove) {
                if (this.player.life > 0) {
                    this.state = "revive";
                    this.ui_layer_revive.show(this.player.life);
                    this.ui_blank.visible = true;
                }
                else {
                    this.end_self();
                }
            }
        }
        else if (this.state == "revive") {
            if (this.ui_layer_revive.count_down()) {
                this.end_self();
            }
            else {
                if (this.ui_layer_revive.btn_revive.check_state_change() && this.ui_layer_revive.btn_revive.get_state() == "down") {
                    if (this.player.life > 0) {
                        this.player.life--;
                        this.ui_layer_revive.hide();
                        this.revive();
                    }
                    else {
                    }
                }
            }
        }
    };
    SceneGame.prototype.end_self = function (code) {
        _super.prototype.end_self.call(this, code);
        this.clear_terrain();
        this.clear_staff();
        this.player.removeSelf();
        UIHud.instance.set_money(Variable.instance.query("money"));
        Variable.instance.set("dist", this.player.dist);
        if (Variable.instance.query("histroy_dist") < Variable.instance.query("dist")) {
            Variable.instance.set("histroy_dist", Variable.instance.query("dist"));
        }
    };
    SceneGame.prototype.update_quest = function () {
        QuestManager.instance.refresh_quest();
        var q = QuestManager.instance.check_complete();
        if (q) {
            var head, tail;
            switch (Variable.instance.query("lan")) {
                case "cn":
                    head = "任务 ";
                    tail = " 完成!";
                    break;
                case "en":
                    head = "QUEST ";
                    tail = " COMPLATE!";
                    break;
                case "pt":
                    head = "QUEST ";
                    tail = " COMPLETA!";
                    break;
            }
            this.add_popup("res/complete.png", head + q.get_desc() + tail, 4000);
            Laya.SoundManager.playSound("res/sound/questdone.wav", 1);
            //播放 任务完成
            if (q.gold > 0) {
                this.player.add_money(q.gold);
            }
            QuestManager.instance.remove(q);
        }
    };
    SceneGame.prototype.update_pop = function () {
        for (var i = this.pops.numChildren - 1; i > -1; i--) {
            var p = this.pops.getChildAt(i);
            p.update(Laya.stage.width / 2, Laya.stage.height / 2);
            if (p.remove) {
                p.removeSelf();
                Laya.Pool.recover("pop", p);
            }
        }
    };
    SceneGame.prototype.add_popup = function (image, text, duration) {
        var pop = Laya.Pool.getItemByClass("pop", Pop);
        pop.reset(image, text, duration, Laya.stage.width / 2, Laya.stage.height / 2);
        this.pops.addChild(pop);
    };
    return SceneGame;
}(Scene));
//# sourceMappingURL=SceneGame.js.map