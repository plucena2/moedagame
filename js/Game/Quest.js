var QUESET_DECLARE = /** @class */ (function () {
    function QUESET_DECLARE() {
    }
    return QUESET_DECLARE;
}());
var Quest = /** @class */ (function () {
    function Quest() {
    }
    Quest.prototype.init = function (qd) {
        this.name = qd.name;
        this.type = qd.type;
        this.cond = qd.cond;
        this.target = qd.target;
        this.gold = qd.gold;
        this.current = 0;
    };
    Quest.prototype.triggered = function () {
        if (this.current < this.cond) {
            this.current++;
        }
    };
    Quest.prototype.get_desc = function () {
        switch (Variable.instance.query("lan")) {
            case "cn":
                switch (this.type) {
                    case "kill":
                        return "收集动物";
                    case "pick":
                        return "收集收集物";
                    case "move":
                        return "移动距离";
                }
                break;
            case "en":
                switch (this.type) {
                    case "kill":
                        return "collection of animals";
                    case "pick":
                        return "collection of items";
                    case "move":
                        return "distance travelled";
                }
                break;
            case "pt":
                switch (this.type) {
                    case "kill":
                        return "Ajuda animal";
                    case "pick":
                        return "Buscar bouns";
                    case "move":
                        return "Correr";
                }
                break;
        }
        return "";
    };
    Quest.prototype.complete = function () {
        return (this.current >= this.cond) ? true : false;
    };
    return Quest;
}());
;
var QuestFactory = /** @class */ (function () {
    function QuestFactory() {
        this.questdeclares = [];
        this.questdeclares.push(Laya.loader.getRes("res/quests/quest1.json"));
        this.questdeclares.push(Laya.loader.getRes("res/quests/quest2.json"));
        this.questdeclares.push(Laya.loader.getRes("res/quests/quest3.json"));
    }
    Object.defineProperty(QuestFactory, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new QuestFactory();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    QuestFactory.prototype.size = function () {
        return this.questdeclares.length;
    };
    QuestFactory.prototype.gen_quest = function (index) {
        var quest = new Quest;
        quest.init(this.questdeclares[index]);
        return quest;
    };
    QuestFactory.prototype.index2type = function (index) {
        return this.questdeclares[index].type;
    };
    QuestFactory.prototype.get_length = function () {
        return this.questdeclares.length;
    };
    return QuestFactory;
}());
var QuestManager = /** @class */ (function () {
    function QuestManager() {
        this.quests = [];
        this.last_gen_quest_time = -300 * 1000;
    }
    Object.defineProperty(QuestManager, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new QuestManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    QuestManager.prototype.size = function () {
        return this.quests.length;
    };
    QuestManager.prototype.add = function (quest) {
        this.quests.push(quest);
        UIQuest.instance.refresh(this);
    };
    QuestManager.prototype.refresh_quest = function () {
        //没有任务则添加任务
        if (this.quests.length < 3 && (Laya.timer.currTimer - this.last_gen_quest_time > 10 * 1000)) {
            this.last_gen_quest_time = Laya.timer.currTimer;
            var queset_type_index = Math.min(Math.floor(Math.random() * QuestFactory.instance.get_length()), QuestFactory.instance.get_length());
            var type = QuestFactory.instance.index2type(queset_type_index);
            if (!this.check_type_exist(type)) {
                this.add(QuestFactory.instance.gen_quest(queset_type_index));
            }
        }
    };
    QuestManager.prototype.check_type_exist = function (type) {
        for (var i = 0; i < this.quests.length; i++) {
            var q = this.quests[i];
            if (q.type == type) {
                return true;
            }
        }
        return false;
    };
    QuestManager.prototype.check_complete = function () {
        for (var i = 0; i < this.quests.length; i++) {
            var q = this.quests[i];
            if (q.complete()) {
                return q;
            }
        }
        return null;
    };
    QuestManager.prototype.remove = function (q) {
        this.quests.splice(this.quests.indexOf(q), 1);
        UIQuest.instance.refresh(this);
    };
    QuestManager.prototype.trigger = function (type) {
        var need_refresh = false;
        for (var _i = 0, _a = this.quests; _i < _a.length; _i++) {
            var p = _a[_i];
            if (type == p.type) {
                p.triggered();
                need_refresh = true;
            }
        }
        if (need_refresh) {
            UIQuest.instance.refresh(this);
        }
    };
    return QuestManager;
}());
//# sourceMappingURL=Quest.js.map