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
var exButton = /** @class */ (function (_super) {
    __extends(exButton, _super);
    function exButton() {
        var _this = _super.call(this) || this;
        _this.text = null;
        _this.text_blt = null;
        _this.text_brb = null;
        _this.timeline = new Laya.TimeLine;
        return _this;
    }
    exButton.prototype.reset = function (normal, down, x, y, w, h, halign, valign, tween, parent) {
        //this.graphics.drawRect(0,0,w,h,"#ffff99");
        this.x = x;
        this.y = y;
        this.normal = normal;
        this.down = down;
        this.halign = halign;
        this.valign = valign;
        this.width = w;
        this.height = h;
        this.state = "normal";
        this.state_change = false;
        this.reset_graphics();
        parent.addChild(this);
        this.on("mousedown", this, function () {
            this.state_change = true;
            this.state = "down";
            this.reset_graphics();
        });
        this.on("mouseup", this, function () {
            this.state_change = true;
            this.state = "normal";
            this.reset_graphics();
        });
        switch (tween) {
            case "shake":
                {
                    this.rotation = 15;
                    this.scale(1, 1);
                    this.timeline.reset();
                    this.timeline.addLabel("a", 0).to(this, { rotation: 30, scaleX: 1.2, scaleY: 1.2 }, 1000, Laya.Ease.linearOut, 0)
                        .addLabel("b", 0).to(this, { rotation: 15, scaleX: 1, scaleY: 1 }, 1000, Laya.Ease.linearIn, 0);
                    this.timeline.play(0, true);
                }
                break;
            case "scale":
                {
                    this.scale(1, 1);
                    this.timeline.reset();
                    this.timeline.addLabel("a", 0).to(this, { scaleX: 1.2, scaleY: 1.2 }, 1000, Laya.Ease.bounceIn, 0)
                        .addLabel("b", 0).to(this, { scaleX: 1, scaleY: 1 }, 1000, Laya.Ease.bounceOut, 0);
                    this.timeline.play(0, true);
                }
                break;
            case "squeeze":
                this.scale(1, 1);
                this.timeline.reset();
                this.timeline.addLabel("a", 0).to(this, { scaleX: 1, scaleY: 1 }, 1000, Laya.Ease.linearOut, 0)
                    .addLabel("b", 0).to(this, { scaleX: 0.85, scaleY: 1 }, 1000, Laya.Ease.linearIn, 0)
                    .addLabel("c", 0).to(this, { scaleX: 1, scaleY: 1 }, 1000, Laya.Ease.linearOut, 0);
                this.timeline.play(0, true);
                break;
        }
        // this.graphics.drawCircle(0,0,15,"#ff00ff","#444444",2);
    };
    exButton.prototype.tween = function (offsetx, offsety) {
        Laya.Tween.from(this, { x: this.x + offsetx, y: this.y + offsety }, 1000, Laya.Ease.bounceOut, Laya.Handler.create(this, function (para) {
            Laya.Tween.clearTween(para);
        }, [this]));
    };
    exButton.prototype.init_text = function (size, color) {
        this.text_blt = new Laya.Text;
        //this.text.blendMode = "lighter";
        this.text_blt.text = "";
        this.text_blt.fontSize = size;
        this.text_blt.align = "left";
        this.text_blt.color = "#000000";
        this.text_blt.font = "Arial";
        this.text_blt.visible = true;
        this.text_blt.alpha = 0.55;
        this.addChild(this.text_blt);
        this.text_brb = new Laya.Text;
        this.text_brb.text = "";
        this.text_brb.fontSize = size;
        this.text_brb.align = "left";
        this.text_brb.color = "#000000";
        this.text_brb.font = "Arial";
        this.text_brb.visible = true;
        this.text_brb.alpha = 0.5;
        this.addChild(this.text_brb);
        this.text = new Laya.Text;
        //this.text.blendMode = "lighter";
        this.text.text = "";
        this.text.fontSize = size;
        this.text.align = "left";
        this.text.color = color;
        this.text.font = "Arial";
        this.text.visible = true;
        this.addChild(this.text);
    };
    exButton.prototype.set_window_text = function (text, align) {
        this.text.text = text;
        this.text_blt.text = text;
        this.text_brb.text = text;
        switch (align) {
            case "center":
                {
                    this.text.pos(this.pivotX - this.text.textWidth / 2, this.pivotY - this.text.fontSize / 2);
                }
                break;
            case "left":
                {
                    this.text.pos(this.pivotX, this.pivotY - this.text.fontSize / 2);
                }
                break;
            case "right":
                {
                    this.text.pos(this.pivotX - this.text.textWidth, this.pivotY - this.text.fontSize / 2);
                }
                break;
        }
        this.text_blt.x = this.text.x - 1;
        this.text_blt.y = this.text.y - 1;
        this.text_brb.x = this.text.x + 1;
        this.text_brb.y = this.text.y + 1;
    };
    exButton.prototype.offset = function (x, y) {
        this.x += x;
        this.y += y;
    };
    exButton.prototype.reset_graphics = function () {
        if (this.normal != null && this.down != null) {
            this.graphics.clear();
            var tex = (this.state == "normal") ? Laya.loader.getRes(this.normal) : Laya.loader.getRes(this.down);
            this.width = tex.width;
            this.height = tex.height;
            switch (this.halign) {
                case "center":
                    {
                        this.pivotX = tex.width / 2;
                    }
                    break;
                case "left":
                    {
                        this.pivotX = 0;
                    }
                    break;
                case "right":
                    {
                        this.pivotX = tex.width;
                    }
                    break;
            }
            switch (this.valign) {
                case "center":
                    {
                        this.pivotY = tex.height / 2;
                    }
                    break;
                case "top":
                    {
                        this.pivotY = 0;
                    }
                    break;
                case "bottom":
                    {
                        this.pivotY = tex.height;
                    }
                    break;
            }
            this.graphics.drawTexture(tex, 0, 0);
        }
    };
    exButton.prototype.check_state_change = function () {
        var result = this.state_change;
        this.state_change = false;
        return result;
    };
    exButton.prototype.get_state = function () {
        return this.state;
    };
    return exButton;
}(Laya.Sprite));
//# sourceMappingURL=exButton.js.map