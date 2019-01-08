// 程序入口
var LayaAir3D = /** @class */ (function () {
    function LayaAir3D() {
        this.cur_scene = null;
        //初始化引擎
        Laya.MiniAdpter.init(); //weixing
        Laya3D.init(640, 1138, true);
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.Stat.enable();
        //Laya.stage.frameRate='slow';		
        this.text_progress = new exText(20, "#ffffff", Laya.stage);
        this.text_progress.pos(Laya.stage.width / 2, Laya.stage.height * 1 / 2);
        this.text_progress.alpha = 0.5;
        Laya.stage.addChild(this.text_progress);
        var res = [
            { url: "res/pars/p00.json", type: Laya.Loader.JSON },
            { url: "res/pars/p10.json", type: Laya.Loader.JSON },
            { url: "res/pars/p20.json", type: Laya.Loader.JSON },
            { url: "res/pars/mini/mp0.json", type: Laya.Loader.JSON },
            { url: "res/gold.png", type: Laya.Loader.IMAGE },
            { url: "res/button.png", type: Laya.Loader.IMAGE },
            { url: "res/level_bg.png", type: Laya.Loader.IMAGE },
            { url: "res/exit.png", type: Laya.Loader.IMAGE },
            { url: "res/left.png", type: Laya.Loader.IMAGE },
            { url: "res/right.png", type: Laya.Loader.IMAGE },
            { url: "res/chk_music1.png", type: Laya.Loader.IMAGE },
            { url: "res/chk_music2.png", type: Laya.Loader.IMAGE },
            { url: "res/end_bg.png", type: Laya.Loader.IMAGE },
            { url: "res/questbg.png", type: Laya.Loader.IMAGE },
            { url: "res/lock.png", type: Laya.Loader.IMAGE },
            { url: "res/quest.png", type: Laya.Loader.IMAGE },
            { url: "res/gold_m.png", type: Laya.Loader.IMAGE },
            { url: "res/logo.png", type: Laya.Loader.IMAGE },
            { url: "res/heart.png", type: Laya.Loader.IMAGE },
            { url: "res/lg_1.png", type: Laya.Loader.IMAGE },
            { url: "res/lg_2.png", type: Laya.Loader.IMAGE },
            { url: "res/lg_3.png", type: Laya.Loader.IMAGE },
            { url: "res/quests/quest1.json", type: Laya.Loader.JSON },
            { url: "res/quests/quest2.json", type: Laya.Loader.JSON },
            { url: "res/quests/quest3.json", type: Laya.Loader.JSON },
            { url: "res/url.json", type: Laya.Loader.JSON },
            { url: "res/revive_bg.png", type: Laya.Loader.IMAGE },
            { url: "res/btn_role.png", type: Laya.Loader.IMAGE },
            { url: "res/complete.png", type: Laya.Loader.IMAGE },
            { url: "res/sound/BtnBig.wav", type: Laya.Loader.SOUND },
            { url: "res/sound/MHeroDeath.wav", type: Laya.Loader.SOUND },
            { url: "res/sound/MHeroDeathDrowning.wav", type: Laya.Loader.SOUND },
            { url: "res/sound/PickupCoin.wav", type: Laya.Loader.SOUND },
            { url: "res/sound/step.mp3", type: Laya.Loader.SOUND },
            { url: "res/sound/mandie.wav", type: Laya.Loader.SOUND },
            { url: "res/sound/unlock.wav", type: Laya.Loader.SOUND },
            { url: "res/sound/equip.wav", type: Laya.Loader.SOUND },
            { url: "res/sound/levelup.mp3", type: Laya.Loader.SOUND },
            { url: "res/sound/questdone.wav", type: Laya.Loader.SOUND },
            { url: "res/sound/gamebgm.mp3", type: Laya.Loader.SOUND },
            { url: "res/sound/MHeroDeathFall.wav", type: Laya.Loader.SOUND }
        ];
        Laya.loader.load(res, Laya.Handler.create(this, this.load3d), Laya.Handler.create(this, this.on_loading2d, null, false));
    }
    //进入开始游戏画面 & 重新开始游戏
    LayaAir3D.prototype.start = function () {
        this.switch_scene(this.scene_lang);
        Laya.timer.frameLoop(1, this, this.update);
    };
    LayaAir3D.prototype.on_loading2d = function (num) {
        this.text_progress.set_content("Loading..." + Math.ceil(num * 50) + "%", "center");
    };
    LayaAir3D.prototype.load3d = function () {
        var res3d = [
            "res/tiles/0.lh",
            "res/tiles/1.lh",
            "res/tiles/2.lh",
            "res/tiles/3.lh",
            "res/tiles/4.lh",
            "res/tiles/5.lh",
            "res/tiles/6.lh",
            "res/tiles/7.lh",
            "res/tiles/8.lh",
            "res/tiles/9.lh",
            "res/tiles/10.lh",
            "res/tiles/11.lh",
            "res/tiles/12.lh",
            "res/tiles/13.lh",
            "res/waters/w0.lh",
            "res/objects/0.lh",
            "res/objects/1.lh",
            "res/objects/2.lh",
            "res/objects/3.lh",
            "res/objects/4.lh",
            "res/objects/5.lh",
            "res/objects/6.lh",
            "res/objects/7.lh",
            "res/objects/8.lh",
            "res/objects/9.lh",
            "res/objects/10.lh",
            "res/objects/11.lh",
            "res/objects/12.lh",
            "res/objects/13.lh",
            "res/objects/14.lh",
            "res/objects/15.lh",
            "res/objects/16.lh",
            "res/objects/17.lh",
            "res/objects/18.lh",
            "res/objects/19.lh",
            "res/objects/20.lh",
            "res/skins/skin0.lh",
            "res/skins/skin1.lh",
            "res/skins/skin2.lh",
            "res/skins/skin3.lh",
            "res/skins/skin4.lh",
            "res/monsters/monster0.lh",
            "res/monsters/monster1.lh",
            "res/monsters/monster2.lh",
            "res/bonuses/bonus0.lh",
            "res/bonuses/bonus1.lh",
            "res/bonuses/bonus2.lh",
            "res/bonuses/bonus3.lh",
            "res/effects/glow1.lh",
        ];
        Laya.loader.create(res3d, Laya.Handler.create(this, this.load_complate), Laya.Handler.create(this, this.on_loading3d, null, false));
    };
    LayaAir3D.prototype.on_loading3d = function (num) {
        this.text_progress.set_content("Loading..." + Math.ceil(num * 50 + 50) + "%", "center");
    };
    LayaAir3D.prototype.load_complate = function () {
        var url = Laya.loader.getRes("res/url.json");
        Conf.POST_URL = url["url"];
        Conf.DL_URL = url["dl_url"];
        UIHud.instance.set_money(0);
        UIQuest.instance.reset();
        this.text_progress.visible = false;
        this.scene3d = Laya.stage.addChild(new Laya.Scene());
        //添加照相机
        this.camera = (this.scene3d.addChild(new Laya.Camera(0, 0.1, 100)));
        this.camera.fieldOfView = 70;
        this.camera.clearColor = null;
        this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        //this.camera.addComponent(CameraMoveScript);      
        this.skydome = new Laya.SkyDome;
        this.camera.sky = this.skydome;
        //添加方向光
        this.directionLight = new Laya.DirectionLight();
        this.directionLight.color = new Laya.Vector3(0, 0, 0);
        this.directionLight.direction = new Laya.Vector3(1, 1, 1);
        this.scene3d.addChild(this.directionLight);
        this.scene_start = new SceneStart;
        this.scene_start.init(this.scene3d, this.camera, this.directionLight);
        this.scene_game = new SceneGame;
        this.scene_game.init(this.scene3d, this.camera, this.directionLight);
        this.scene_end = new SceneEnd;
        this.scene_end.init(this.scene3d, this.camera, this.directionLight);
        this.scene_role = new SceneRole;
        this.scene_role.init(this.scene3d, this.camera, this.directionLight);
        this.scene_lang = new SceneLang;
        6;
        this.scene_lang.init(this.scene3d, this.camera, this.directionLight);
        var userid = (this.GetQueryString("userid") != null) ? this.GetQueryString("userid") : "guest";
        Variable.instance.set("userid", userid);
        var count = (this.GetQueryString("count") != null) ? Number(this.GetQueryString("count")) : 0;
        Variable.instance.set("count", count);
        var lan = (this.GetQueryString("lan") != null) ? this.GetQueryString("lan") : "en";
        Variable.instance.set("lan", lan);
        var cls = (this.GetQueryString("$class") != null) ? this.GetQueryString("$class") : "moeda.addScore";
        Variable.instance.set("$class", cls);
        var gid = (this.GetQueryString("gameid") != null) ? this.GetQueryString("gameid") : "0";
        Variable.instance.set("gameid", gid);
        var gs = (this.GetQueryString("game_signature") != null) ? this.GetQueryString("game_signature") : "0";
        Variable.instance.set("game_signature", gs);
        //进入开始游戏画面	
        this.start();
    };
    LayaAir3D.prototype.switch_scene = function (scene) {
        if (this.cur_scene != scene) {
            Laya.stage.removeChild(this.cur_scene);
            scene.reset();
            this.cur_scene = scene;
            Laya.stage.addChild(this.cur_scene);
        }
    };
    //场景切换逻辑 GameStart -> Game ->GameEnd 循环
    LayaAir3D.prototype.process_scene_switch = function () {
        if (this.cur_scene instanceof SceneStart) {
            if (this.cur_scene.is_end()) {
                switch (this.cur_scene.get_end_code()) {
                    case "role":
                        this.switch_scene(this.scene_role);
                        break;
                    case "game":
                        this.switch_scene(this.scene_game);
                        break;
                }
            }
        }
        if (this.cur_scene instanceof SceneGame) {
            if (this.cur_scene.is_end()) {
                this.switch_scene(this.scene_end);
            }
        }
        if (this.cur_scene instanceof SceneEnd) {
            if (this.cur_scene.is_end()) {
                this.switch_scene(this.scene_start);
            }
        }
        if (this.cur_scene instanceof SceneRole) {
            if (this.cur_scene.is_end()) {
                this.switch_scene(this.scene_start);
            }
        }
        if (this.cur_scene instanceof SceneLang) {
            if (this.cur_scene.is_end()) {
                this.switch_scene(this.scene_start);
            }
        }
    };
    //游戏主循环
    LayaAir3D.prototype.update = function () {
        if (this.cur_scene) {
            this.cur_scene.update();
            this.process_scene_switch();
        }
    };
    LayaAir3D.prototype.GetQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return r[2]; //注意这里不能用js里面的unescape方法
        }
        return null;
    };
    return LayaAir3D;
}());
new LayaAir3D();
//# sourceMappingURL=LayaAir3D.js.map