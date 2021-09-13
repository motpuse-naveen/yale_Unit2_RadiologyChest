var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("model/model", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Model = /** @class */ (function () {
        function Model() {
            this.nOriginalWidth = 984;
            this.nOriginalHeight = 482;
            //...
        }
        Object.defineProperty(Model, "Instance", {
            get: function () {
                // Do you need arguments? Make it a regular method instead.
                return this._instance || (this._instance = new this());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Model.prototype, "scale", {
            get: function () {
                return this.nScale;
            },
            set: function (num) {
                this.nScale = num;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Model.prototype, "controllerRef", {
            get: function () {
                return this.refController;
            },
            set: function (ref) {
                this.refController = ref;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Model.prototype, "imageWidth", {
            get: function () {
                return this.nImageWidth;
            },
            set: function (width) {
                this.nImageWidth = width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Model.prototype, "imageHeight", {
            get: function () {
                return this.nImageHeight;
            },
            set: function (height) {
                this.nImageHeight = height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Model.prototype, "originaleWidth", {
            get: function () {
                return this.nOriginalWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Model.prototype, "originalHeight", {
            get: function () {
                return this.nOriginalHeight;
            },
            enumerable: true,
            configurable: true
        });
        return Model;
    }());
    exports.Model = Model;
});
define("events/eventdispatcher", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * EventDispatcher (TypeScript)
     * - Simple extendable event dispatching class
     *
     * @version 1.0.0
     * @author Amit Jain
     * @license MIT License
     **/
    var EventDispatcher = /** @class */ (function () {
        function EventDispatcher() {
            this._listeners = [];
        }
        EventDispatcher.prototype.addEventListener = function (type, method, scope) {
            if (scope === void 0) { scope = window; }
            //console.log("Amit",scope)
            this.scope = scope;
            if (!(this.listeners = this._listeners)) {
                this.listeners = this._listeners = {};
            }
            if (!(this.handlers = this.listeners[type])) {
                this.handlers = this.listeners[type] = [];
            }
            this.scope = (this.scope ? this.scope : window);
            this.handlers.push({
                method: method,
                scope: this.scope,
                context: (this.context ? this.context : this.scope)
            });
        };
        EventDispatcher.prototype.dispatchEvent = function (type, data) {
            if (data === void 0) { data = {}; }
            var i, n, handler;
            //console.log('called',this.handlers,this.listeners)
            if (!(this.listeners = this._listeners)) {
                return;
            }
            if (!(this.handlers = this.listeners[type])) {
                return;
            }
            for (i = 0, n = this.handlers.length; i < n; i++) {
                handler = this.handlers[i];
                //console.log(handler,'called inside',this.context)
                if (typeof (this.context) !== "undefined" && this.context !== handler.context)
                    continue;
                if (handler.method.call(handler.scope, data, this, type) === false) {
                    return false;
                }
            }
            return true;
        };
        return EventDispatcher;
    }());
    exports.EventDispatcher = EventDispatcher;
});
define("global", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ifDropped = "false";
    exports.isCorrect = false;
    exports.count = 0;
    exports.questionCount = 0;
    exports.draggableCount = 0;
});
define("HeaderController", ["require", "exports", "events/eventdispatcher", "global"], function (require, exports, eventdispatcher_1, myGlobals) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HeaderController = /** @class */ (function (_super) {
        __extends(HeaderController, _super);
        function HeaderController(data, currQues, questionCount) {
            var _this = _super.call(this) || this;
            _this.objHeader = $("<header>");
            _this.objTitle = $("<div>");
            _this.objQuestionCount = $("<div>");
            _this.oDataObj = data;
            _this.currQuestion = currQues + 1;
            _this.totalQuestionCount = questionCount;
            _this.updateData();
            _this.bootStrapGameObject();
            return _this;
        }
        HeaderController.prototype.updateData = function () {
            this.titleText = this.oDataObj.header.titleText;
            this.questionCount = "Question " + this.currQuestion + " of " + this.totalQuestionCount;
        };
        HeaderController.prototype.bootStrapGameObject = function () {
            this.objHeader.addClass("header");
            this.objTitle.addClass("mainTitle");
            this.objTitle.css("font", "16px");
            this.objTitle.attr("id", "mainTitle");
            this.objTitle.append(this.titleText);
            this.objQuestionCount.addClass("questionCount");
            this.objQuestionCount.attr("id", "questionCount");
            if (myGlobals.questionCount > 0) {
                this.objQuestionCount.attr("tabindex", "-1");
            }
            this.objQuestionCount.append(this.questionCount);
            this.objHeader.append(this.objTitle);
            this.objHeader.append(this.objQuestionCount);
        };
        HeaderController.prototype.getQuestionCount = function () {
            return this.sQstCount;
        };
        HeaderController.prototype.setQuestioncount = function (count) {
            return this.sQstCount = "Question " + count + " of " + this.sToltalQuestion;
        };
        HeaderController.prototype.getHTML = function () {
            return this.objHeader;
        };
        return HeaderController;
    }(eventdispatcher_1.EventDispatcher));
    exports.HeaderController = HeaderController;
});
define("HotSpot", ["require", "exports", "model/model", "global"], function (require, exports, model_1, myGlobals) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HotSpot = /** @class */ (function () {
        function HotSpot(leftPos, topPos, count, dropPosition) {
            this.oMainHotSpot = $("<div>");
            this.oHotSpot = $("<div>");
            this.oCallOutTop = $("<div>");
            this.oCallOutTopRight = $("<div>");
            this.oCallOutBottom = $("<div>");
            this.oCallOutRight = $("<div>");
            this.oCallOutLeft = $("<div>");
            this.oCallOutBottomRight = $("<div>");
            this.oSpotDiv = $("<div>");
            this.oCorrectImg = $("<img>");
            this.oInCorrectImg = $("<img>");
            this.oModelRef = model_1.Model.Instance;
            this.left = leftPos;
            this.top = topPos;
            this.id = count;
            this.dropPosition = dropPosition;
            this.imgSrc = 'assets/Dot_Gray.svg';
            this.correctImgSrc = 'assets/Dot_Correct.svg';
            this.inCorrectImgSrc = 'assets/Dot_Incorrect.svg';
            this.hotSpotPosition();
        }
        HotSpot.prototype.hotSpotPosition = function () {
            this.oHotSpot.addClass("spot");
            this.oHotSpot.addClass("");
            this.oHotSpot.attr("id", "dropSpot_" + this.id);
            this.oHotSpot.attr("dropPosition", "_" + this.dropPosition);
            this.oHotSpot.attr("dropped", "false");
            this.oHotSpot.css("left", this.left);
            this.oHotSpot.css("top", this.top);
            ///this.oSpotDiv.attr("src",this.imgSrc);
            this.oSpotDiv.css("display", "block");
            this.oSpotDiv.addClass("gspot circle");
            this.oSpotDiv.text(this.id + 1);
            this.oHotSpot.append(this.oSpotDiv);
            this.oCorrectImg.attr("src", this.correctImgSrc);
            this.oCorrectImg.attr("alt", "Correct Answer");
            this.oCorrectImg.css("display", "none");
            this.oCorrectImg.addClass("correct");
            this.oHotSpot.append(this.oCorrectImg);
            this.oInCorrectImg.attr("src", this.inCorrectImgSrc);
            this.oInCorrectImg.attr("alt", "Incorrect Answer");
            this.oInCorrectImg.css("display", "none");
            this.oInCorrectImg.addClass("incorrect");
            this.oHotSpot.append(this.oInCorrectImg);
            this.oHotSpot.droppable({
                tolerance: "touch",
                drop: function (event, ui) {
                    myGlobals.isCorrect = $(this).hasClass("correct");
                    console.log(this, "droppped out");
                    if (!myGlobals.isCorrect)
                        myGlobals.ifDropped = "true";
                },
                over: function (event, ui) {
                    var id = "#" + $(this).attr("id");
                    $(id + " .gspot").removeClass("circle");
                    $(id + " .gspot").addClass("circleActive");
                },
                out: function (event, ui) {
                    var id = "#" + $(this).attr("id");
                    if ($(id).attr("dropped") == "false") {
                        setTimeout(function () {
                            $(id + " .gspot").addClass("circle");
                            $(id + " .gspot").removeClass("circleActive");
                        }, 300);
                    }
                }
            });
            this.createCalloutTop(this.left, this.top, this.id);
            this.createCalloutTopRight(this.left, this.top, this.id);
            this.createCalloutBottom(this.left, this.top, this.id);
            this.createCalloutBottomRight(this.left, this.top, this.id);
            this.createCalloutLeft(this.left, this.top, this.id);
            this.createCalloutRight(this.left, this.top, this.id);
            this.oMainHotSpot.append(this.oCallOutTop);
            this.oMainHotSpot.append(this.oCallOutTopRight);
            this.oMainHotSpot.append(this.oCallOutBottom);
            this.oMainHotSpot.append(this.oCallOutBottomRight);
            this.oMainHotSpot.append(this.oCallOutLeft);
            this.oMainHotSpot.append(this.oCallOutRight);
            this.oMainHotSpot.append(this.oHotSpot);
        };
        HotSpot.prototype.createCalloutTop = function (left, top, id) {
            var coLeft = left - 15;
            var coTop = top - 50;
            this.oCallOutTop.addClass("callout");
            this.oCallOutTop.addClass("top-left");
            this.oCallOutTop.css({ "left": coLeft, "top": coTop, "display": "none" });
            this.oCallOutTop.attr("id", "dropSpot_" + id + "_Top");
        };
        HotSpot.prototype.createCalloutTopRight = function (left, top, id) {
            var coLeft = left - 75;
            var coTop = top - 50;
            this.oCallOutTopRight.addClass("callout");
            this.oCallOutTopRight.addClass("top-right");
            this.oCallOutTopRight.css({ "left": coLeft, "top": coTop, "display": "none" });
            this.oCallOutTopRight.attr("id", "dropSpot_" + id + "_TRight");
        };
        HotSpot.prototype.createCalloutBottom = function (left, top, id) {
            var coLeft = left - 9;
            var coTop = top + 35;
            this.oCallOutBottom.addClass("callout");
            this.oCallOutBottom.addClass("bottom");
            this.oCallOutBottom.css({ "left": coLeft, "top": coTop, "display": "none" });
            this.oCallOutBottom.attr("id", "dropSpot_" + id + "_Bottom");
        };
        HotSpot.prototype.createCalloutBottomRight = function (left, top, id) {
            var coLeft = left + 5;
            var coTop = top + 37;
            this.oCallOutBottomRight.addClass("callout");
            this.oCallOutBottomRight.addClass("bottom-right");
            this.oCallOutBottomRight.css({ "left": coLeft, "top": coTop, "display": "none" });
            this.oCallOutBottomRight.attr("id", "dropSpot_" + id + "_BRight");
        };
        HotSpot.prototype.createCalloutLeft = function (left, top, id) {
            var coLeft = left;
            var coTop = top;
            this.oCallOutLeft.addClass("callout");
            this.oCallOutLeft.addClass("left");
            this.oCallOutLeft.css({ "left": coLeft, "top": coTop, "display": "none" });
            this.oCallOutLeft.attr("id", "dropSpot_" + id + "_Left");
        };
        HotSpot.prototype.createCalloutRight = function (left, top, id) {
            var coLeft = left + 35;
            var coTop = top - 8;
            this.oCallOutRight.addClass("callout");
            this.oCallOutRight.addClass("right");
            this.oCallOutRight.css({ "left": coLeft, "top": coTop, "display": "none" });
            this.oCallOutRight.attr("id", "dropSpot_" + id + "_Right");
        };
        HotSpot.prototype.realignCalloutTop = function (left, top, id) {
            var coLeft = left - 15;
            var coTop = top - 50;
            $("#" + id).css({ "left": coLeft, "top": coTop });
        };
        HotSpot.prototype.realignCalloutTopRight = function (left, top, id) {
            var coLeft = left - 125;
            var coTop = top - 50;
            $("#" + id).css({ "left": coLeft, "top": coTop });
        };
        HotSpot.prototype.realignCalloutBottom = function (left, top, id) {
            var coLeft = left;
            var coTop = top + 35;
            $("#" + id).css({ "left": coLeft, "top": coTop });
        };
        HotSpot.prototype.realignCalloutLeft = function (left, top, id) {
            var coLeft = left - $("#" + id).width() - 15;
            var coTop = top;
            $("#" + id).css({ "left": coLeft, "top": coTop });
        };
        HotSpot.prototype.realignCalloutRight = function (left, top, id) {
            var coLeft = left + 35;
            var coTop = top - 8;
            $("#" + id).css({ "left": coLeft, "top": coTop });
        };
        HotSpot.prototype.realignCalloutBottomRight = function (left, top, id) {
            var coLeft = left + 5;
            var coTop = top + 37;
            $("#" + id).css({ "left": coLeft, "top": coTop });
        };
        HotSpot.prototype.reAlign = function (leftPos, topPos) {
            leftPos *= this.oModelRef.scale;
            topPos *= this.oModelRef.scale;
            this.left = leftPos - 7;
            this.top = topPos - 10;
            this.oHotSpot.css('left', this.left);
            this.oHotSpot.css('top', this.top);
            this.realignCalloutTop(this.left, this.top, "dropSpot_" + this.id + "_Top");
            this.realignCalloutTopRight(this.left, this.top, "dropSpot_" + this.id + "_TRight");
            this.realignCalloutBottom(this.left, this.top, "dropSpot_" + this.id + "_Bottom");
            this.realignCalloutBottomRight(this.left, this.top, "dropSpot_" + this.id + "_BRight");
            this.realignCalloutLeft(this.left, this.top, "dropSpot_" + this.id + "_Left");
            this.realignCalloutRight(this.left, this.top, "dropSpot_" + this.id + "_Right");
            return [this.left, this.top, this.id];
        };
        HotSpot.prototype.getHTML = function () {
            return this.oMainHotSpot;
        };
        return HotSpot;
    }());
    exports.HotSpot = HotSpot;
});
define("Dragable", ["require", "exports", "events/eventdispatcher", "global"], function (require, exports, eventdispatcher_2, myGlobals) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Dragable = /** @class */ (function (_super) {
        __extends(Dragable, _super);
        function Dragable(data, i) {
            var _this = _super.call(this) || this;
            _this.anyDropDivTouch = null;
            _this.dragDiv = $(_this);
            _this.oDataObject = data;
            _this.index = i;
            _this.createDragable();
            var ref;
            return _this;
        }
        Dragable.prototype.createDragable = function () {
            var parentDiv;
            var childDiv;
            var ifDropped;
            this.oDrag = $("<div>");
            this.oDrag.addClass("dragBox item tabindex");
            this.oDrag.attr("id", "dragBox_" + this.index);
            this.oDrag.attr("tabindex", "0");
            this.oDrag.append(this.oDataObject);
            var arialabel = this.oDataObject + ". Press the Enter or Spacebar key to open the list of Drop Areas.";
            this.oDrag.attr("aria-label", arialabel);
            this.oDrag.css("cursor", "pointer");
            var ref = this;
            this.oDrag.bind('keyup', this, this.showList);
            var containerRef = this;
            this.oDrag.draggable({
                tolerance: "touch",
                containment: $(".role"),
                start: function (event, ui) {
                    parentDiv = $(this).parent();
                    console.log(parentDiv);
                    $(this).addClass("dragBoxOpacity");
                    $(this).removeClass("dropDragBox");
                    $(this).css("zIndex", 4);
                },
                drag: function (event, ui) {
                    console.log("dragable drag");
                    this.dragDiv = $(this);
                    var ref = this;
                    var id;
                    $(".spot").each(function () {
                        if (!$(this).hasClass("correct")) {
                            var collisionDetection = containerRef.collision(ref.dragDiv, $(this));
                            if (collisionDetection) {
                                ref.anyDropDivTouch = $(this);
                                id = "#" + ref.anyDropDivTouch.attr("id");
                                return false;
                            }
                            else {
                                ref.anyDropDivTouch = $(this);
                                id = "#" + ref.anyDropDivTouch.attr("id");
                                ref.anyDropDivTouch = null;
                            }
                        }
                    });
                },
                stop: function (event, ui) {
                    var _this = this;
                    console.log("dragable stop");
                    $(this).addClass("dropDragBox");
                    $(this).removeClass("dragBoxOpacity");
                    if (this.anyDropDivTouch) {
                        this.dropId = "#" + this.anyDropDivTouch.attr("id");
                    }
                    if (this.anyDropDivTouch && myGlobals.isCorrect === false) {
                        ifDropped = this.anyDropDivTouch.attr("dropped");
                        this.dropId = "#" + this.anyDropDivTouch.attr("id") + this.anyDropDivTouch.attr("dropPosition");
                        console.log(this.dropId, "Amit");
                        if (ifDropped === "true") {
                            var childDragParent = $(this.dropId).children();
                            if ($(parentDiv).hasClass("dragable")) {
                                childDragParent.removeAttr("style");
                                childDragParent.removeClass("dropDragBox");
                                childDragParent.attr("tabindex", 0);
                                childDragParent.css("position", "relative");
                            }
                            parentDiv.append(childDragParent);
                            console.log(parentDiv.hasClass('menu'), " >>>> Amit");
                            if (!parentDiv.hasClass('menu')) {
                                console.log("Amit ", parentDiv); //Number(parentDiv.attr("id").split("_")[1])
                                if ($("#dropSpot_" + Number(parentDiv.attr("id").split("_")[1])).attr("dropPosition") === "_Left") {
                                    console.log("swappedTOLeft");
                                    var left = $("#dropSpot_" + Number(parentDiv.attr("id").split("_")[1])).position().left;
                                    var width = childDragParent.width();
                                    left = left - width - 35;
                                    $(parentDiv).css("left", left);
                                    $(parentDiv).css("top", $("#dropSpot_" + Number(parentDiv.attr("id").split("_")[1])).position().top - 5);
                                }
                            }
                        }
                        else {
                            if (!$(parentDiv).hasClass("dragable")) {
                                var str = $(parentDiv).attr("id");
                                if (str.indexOf("_Right") != -1) {
                                    str = str.replace("_Right", "");
                                    $("#" + str + " .gspot").addClass("circle");
                                    $("#" + str + " .gspot").removeClass("circleActive");
                                    $("#" + str).attr("dropped", "false");
                                }
                                else if (str.indexOf("_Left") != -1) {
                                    str = str.replace("_Left", "");
                                    $("#" + str + " .gspot").addClass("circle");
                                    $("#" + str + " .gspot").removeClass("circleActive");
                                    $("#" + str).attr("dropped", "false");
                                }
                                else if (str.indexOf("_TRight") != -1) {
                                    str = str.replace("_TRight", "");
                                    $("#" + str + " .gspot").addClass("circle");
                                    $("#" + str + " .gspot").removeClass("circleActive");
                                    $("#" + str).attr("dropped", "false");
                                }
                                else if (str.indexOf("_Top") != -1) {
                                    str = str.replace("_Top", "");
                                    $("#" + str + " .gspot").addClass("circle");
                                    $("#" + str + " .gspot").removeClass("circleActive");
                                    $("#" + str).attr("dropped", "false");
                                }
                                else if (str.indexOf("_BRight") != -1) {
                                    str = str.replace("_BRight", "");
                                    $("#" + str + " .gspot").addClass("circle");
                                    $("#" + str + " .gspot").removeClass("circleActive");
                                    $("#" + str).attr("dropped", "false");
                                }
                                else if (str.indexOf("_Bottom") != -1) {
                                    str = str.replace("_Bottom", "");
                                    $("#" + str + " .gspot").addClass("circle");
                                    $("#" + str + " .gspot").removeClass("circleActive");
                                    $("#" + str).attr("dropped", "false");
                                }
                                console.log($(parentDiv).attr("id"), ">>>>>");
                                $(parentDiv).css("display", "none");
                            }
                        }
                        if (myGlobals.isCorrect === false) {
                            this.dragDiv.css({ "left": 0, "top": 0 });
                            this.dragDiv.css("border", 0);
                            this.dragDiv.addClass("dropDragBox");
                            $(this.dropId).append(this.dragDiv);
                            "#" + this.anyDropDivTouch.attr("dropped", "true");
                            if (this.anyDropDivTouch.attr("dropPosition") === "_Left") {
                                $(this.dropId).css("left", -500);
                                setTimeout(function () {
                                    var left = $(_this.anyDropDivTouch).position().left;
                                    var width = _this.dragDiv.width();
                                    left = left - width - 35;
                                    $(_this.dropId).css("left", left);
                                    $(_this.dropId).css("top", $(_this.anyDropDivTouch).position().top - 5);
                                    console.log('Dropped for left, swapnil');
                                }, 100);
                            }
                            else if (this.anyDropDivTouch.attr("dropPosition") === "_TRight") {
                                $(this.dropId).css("left", -500);
                                setTimeout(function () {
                                    var left = $(_this.anyDropDivTouch).position().left;
                                    var width = _this.dragDiv.width();
                                    left = left - width + 8;
                                    $(_this.dropId).css("left", left);
                                    $(_this.dropId).css("top", $(_this.anyDropDivTouch).position().top - 46);
                                    console.log('Dropped for left, swapnil');
                                }, 100);
                            }
                            else if (this.anyDropDivTouch.attr("dropPosition") === "_BRight") {
                                $(this.dropId).css("left", -500);
                                setTimeout(function () {
                                    var left = $(_this.anyDropDivTouch).position().left;
                                    var width = _this.dragDiv.width();
                                    left = left - width + 5;
                                    var top = $(_this.anyDropDivTouch).position().top + 37;
                                    $(_this.dropId).css("left", left);
                                    $(_this.dropId).css("top", top);
                                    console.log('Dropped for bottomRight, swapnil');
                                }, 100);
                            }
                            $(this.dropId).css("display", "block");
                            $(this).removeClass("dragBoxOpacity");
                        }
                    }
                    else {
                        parentDiv = $(this).parent();
                        if ($(parentDiv).hasClass("dragable")) {
                            $(this).removeClass("dropDragBox");
                        }
                    }
                    if ($(".callout:visible").length === myGlobals.draggableCount) {
                        $(".checkAnswer").removeClass("disabled").addClass("enabled");
                        $(".checkAnswer").attr("tabindex", "0");
                    }
                    $(this).css("zIndex", 0);
                    setTimeout(function () {
                        for (var i = 0; i < myGlobals.draggableCount; i++) {
                            if ($("#dropSpot_" + i).attr("dropped") == "false") {
                                $("#dropSpot_" + i).find(".gspot").removeClass("circleActive").addClass("circle");
                            }
                        }
                    }, 300);
                }, revert: function () {
                    console.log(myGlobals.ifDropped, "ifDropped");
                    if (myGlobals.ifDropped === "true") {
                        myGlobals.ifDropped = "false";
                        console.log(myGlobals.ifDropped, "ifDropped");
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            });
        };
        Dragable.prototype.getHTML = function () {
            return this.oDrag;
        };
        Dragable.prototype.collision = function ($div1, $div2) {
            var x1 = $div1.offset().left; //+$div1.offset().left;
            var y1 = $div1.offset().top;
            var h1 = $div1.outerHeight(true);
            var w1 = $div1.outerWidth(true);
            var b1 = y1 + h1;
            var r1 = x1 + w1;
            var x2 = $div2.offset().left; //+$div2.offset().left;
            var y2 = $div2.offset().top;
            var h2 = $div2.height();
            var w2 = $div2.width();
            var b2 = y2 + h2;
            var r2 = x2 + w2;
            if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2)
                return false;
            return true;
        };
        Dragable.prototype.showList = function (e) {
            e.data.dispatchEvent("Enter_Clicked", e); // example dispatch event to emit
        };
        return Dragable;
    }(eventdispatcher_2.EventDispatcher));
    exports.Dragable = Dragable;
});
define("PageSection", ["require", "exports", "events/eventdispatcher", "model/model"], function (require, exports, eventdispatcher_3, model_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PageSection = /** @class */ (function (_super) {
        __extends(PageSection, _super);
        function PageSection(data) {
            var _this = _super.call(this) || this;
            _this.secPageContainer = $("<section>");
            _this.secSlideContainer = $("<section>");
            _this.objInstruction = $("<div>");
            _this.objInstructionText = $("<div>");
            _this.objSection = $("<div>");
            _this.objDropSection = $("<div>");
            _this.objDragSection = $("<div>");
            _this.objImgHotSpot = $("<img>");
            _this.objDragNext = $("<div>");
            _this.objImgDragNext = $("<img>");
            _this.objDragBack = $("<div>");
            _this.objDragable = $("<div>");
            _this.objImgDragBack = $("<img>");
            _this.oHotspotHolder = $("<div>");
            _this.bOnce = true;
            _this.oDataObj = data;
            _this.updateData();
            return _this;
            //this.bootStrapGameObject();
        }
        PageSection.prototype.updateData = function () {
            this.instructionText = this.oDataObj.pageSection.titleInstruction;
            this.hotSpotImageSrc = this.oDataObj.pageSection.hotSpotImageSrc;
            this.dragNextImageSrc = this.oDataObj.pageSection.dragNextImageSrc;
            this.dragBackImageSrc = this.oDataObj.pageSection.dragBackImageSrc;
            this.dragNextDeactiveImageSrc = this.oDataObj.pageSection.dragNextDeactiveImageSrc;
            this.dragBackDeactiveImageSrc = this.oDataObj.pageSection.dragBackDeactiveImageSrc;
            //this.oDragable = new Dragable(this.oDataObj);
        };
        PageSection.prototype.bootStrapGameObject = function () {
            this.secPageContainer.addClass("pageContainer");
            this.secSlideContainer.addClass("slideContainer");
            this.objInstruction.addClass("instruction");
            this.objInstructionText.addClass("instructionText");
            this.objInstructionText.append(this.instructionText);
            this.objInstruction.append(this.objInstructionText);
            this.secSlideContainer.append(this.objInstruction);
            this.objDropSection.addClass("dropSection");
            this.oHotspotHolder.addClass("dropSectionPosition");
            this.oHotspotHolder.css("height", this.oDataObj.hotSpotImageWidth);
            this.oHotspotHolder.css("width", this.oDataObj.hotSpotImageHeight);
            this.objImgHotSpot.attr("src", this.hotSpotImageSrc);
            this.objImgHotSpot.attr("alt", "image depicts the diffrent internal parts of the body.");
            this.objImgHotSpot.addClass("hotSpotImage");
            this.oHotspotHolder.append(this.objImgHotSpot);
            //this.objDropSection.append(this.oHotspotHolder);
            this.objDropSection.append(this.oHotspotHolder);
            this.objSection.append(this.objDropSection);
            this.objDragBack.addClass("dragBack left-paddle paddle");
            this.objImgDragBack.attr("src", this.dragBackImageSrc);
            this.objImgDragBack.attr("alt", "back button");
            this.objDragBack.append(this.objImgDragBack);
            this.objDragSection.append(this.objDragBack);
            this.objSection.append(this.objDragSection);
            this.objDragSection.append(this.objDragable);
            this.objDragSection.addClass("dragSection menu-wrapper");
            this.objDragNext.addClass("dragNext right-paddle paddle");
            this.objImgDragNext.attr("src", this.dragNextImageSrc);
            this.objImgDragNext.attr("alt", "Next Button");
            this.objDragNext.append(this.objImgDragNext);
            this.objDragSection.append(this.objDragNext);
            this.objSection.attr("role", "application");
            this.objSection.addClass("role");
            this.secSlideContainer.append(this.objSection);
            this.secPageContainer.append(this.secSlideContainer);
        };
        PageSection.prototype.setupImageDimentions = function () {
            var tempModelRef = model_2.Model.Instance;
            tempModelRef.imageHeight = this.objImgHotSpot.height();
            tempModelRef.imageWidth = this.objImgHotSpot.width();
            if (this.bOnce) {
                this.bOnce = false;
                this.dispatchEvent("UI_LOADED", this.oDataObj);
            }
        };
        PageSection.prototype.appendHotspotHolder = function (hotSpotHolder) {
            this.oHotspotHolder.append(hotSpotHolder);
        };
        PageSection.prototype.appendDraggable = function (dragHolder) {
            this.objDragable.append(dragHolder);
        };
        PageSection.prototype.getHTML = function () {
            return this.secPageContainer;
        };
        return PageSection;
    }(eventdispatcher_3.EventDispatcher));
    exports.PageSection = PageSection;
});
define("BottomContainer", ["require", "exports", "events/eventdispatcher", "global"], function (require, exports, eventdispatcher_4, myGlobals) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BottomContainer = /** @class */ (function (_super) {
        __extends(BottomContainer, _super);
        function BottomContainer() {
            var _this = _super.call(this) || this;
            _this.objBottamContainer = $("<section>");
            _this.objBtnNavBack = $("<div>");
            _this.objBtnNavNext = $("<div>");
            _this.objBtnCheckAnswer = $("<div>");
            _this.objBtnTryAgain = $("<div>");
            _this.objImgNext = $("<img>");
            _this.objImgBack = $("<img>");
            _this.objBtnClearAnswer = $("<div>");
            _this.updateData();
            _this.bootStrapGameObject();
            return _this;
        }
        BottomContainer.prototype.updateData = function () {
            this.nextImageSrcActive = "assets/Next_button_Active.svg";
            this.backImageSrcActive = "assets/Back_button_Active.svg";
            this.nextImageSrcDeactive = "assets/Next_button_Deactive.svg";
            this.backImageSrcDeactive = "assets/Back_button_Deactive.svg";
        };
        BottomContainer.prototype.bootStrapGameObject = function () {
            this.objBottamContainer.addClass("navigation");
            this.objBottamContainer.attr("role", "application");
            this.objBtnNavBack.addClass("naviagtionBack");
            if (myGlobals.count != 0) {
                this.objImgBack.attr("src", this.backImageSrcActive);
                //this.objImgBack.attr("tabindex", "0")
                this.objBtnNavBack.attr("tabindex", "0");
                this.objBtnNavBack.attr("aria-label", "Previous Button, press enter or space bar key to go to Previous question.");
                this.objBtnNavBack.css("pointer-events", "auto");
                this.objBtnNavBack.css('cursor', 'pointer');
            }
            else {
                this.objImgBack.attr("src", this.backImageSrcDeactive);
                this.objBtnNavBack.css("pointer-events", "none");
                this.objImgBack.attr("tabindex", "-1");
                this.objBtnNavBack.css('cursor', 'default');
            }
            this.objImgBack.attr("alt", "Back Button");
            this.objBtnNavBack.append(this.objImgBack);
            this.objBtnNavBack.unbind('click keyup', this.previousQuestion);
            this.objBtnNavBack.bind('click keyup', this, this.previousQuestion);
            this.objBottamContainer.append(this.objBtnNavBack);
            this.objBtnCheckAnswer.addClass("button");
            this.objBtnCheckAnswer.append("Check Answer");
            this.objBottamContainer.append(this.objBtnCheckAnswer);
            this.objBtnCheckAnswer.unbind('click keyup', this.onCheckAnswer);
            this.objBtnCheckAnswer.bind('click keyup', this, this.onCheckAnswer);
            this.objBtnCheckAnswer.addClass("checkAnswer disabled");
            this.objBtnCheckAnswer.attr("aria-label", "Check Answers, To check your answer, press the Enter or space bar key.");
            this.objBtnTryAgain.addClass("button tryAgain");
            this.objBtnTryAgain.append("Try Again");
            this.objBtnTryAgain.unbind('click keyup', this.onTryAgain);
            this.objBtnTryAgain.bind('click keyup', this, this.onTryAgain);
            this.objBtnTryAgain.attr("aria-label", "Try Again, Sorry! Your answer is incorrect. To try again, press the Enter or Space bar key.");
            this.objBottamContainer.append(this.objBtnTryAgain);
            this.objBtnClearAnswer.addClass("button clearAnswer");
            this.objBtnClearAnswer.append("Clear Answer");
            this.objBtnClearAnswer.unbind('click keyup', this.onClearAnswer);
            this.objBtnClearAnswer.bind('click keyup', this, this.onClearAnswer);
            this.objBtnClearAnswer.attr("aria-label", "Clear Answer, Your answers are correct. To clear answers, press the Enter or Space bar key. To go to the next question press tab key.");
            this.objBottamContainer.append(this.objBtnClearAnswer);
            this.objBtnNavNext.addClass("naviagtionNext");
            this.objImgNext.attr("src", this.nextImageSrcDeactive);
            this.objImgNext.attr("alt", "Next Button");
            this.objBtnNavNext.append(this.objImgNext);
            this.objBtnNavNext.unbind('click keyup', this.nextQuestion);
            this.objBtnNavNext.bind('click keyup', this, this.nextQuestion);
            this.objBtnNavNext.css("pointer-events", "none");
            this.objBottamContainer.append(this.objBtnNavNext);
        };
        BottomContainer.prototype.onCheckAnswer = function (e) {
            e.data.dispatchEvent(BottomContainer.CHECKANSWER, e); // example dispatch event to emit
        };
        BottomContainer.prototype.onTryAgain = function (e) {
            e.data.dispatchEvent(BottomContainer.TRYAGAIN, e); // example dispatch event to emit
        };
        BottomContainer.prototype.onClearAnswer = function (e) {
            e.data.dispatchEvent(BottomContainer.CLEARANSWER, e); // example dispatch event to emit
        };
        BottomContainer.prototype.nextQuestion = function (e) {
            e.data.dispatchEvent(BottomContainer.NEXTQUESTION, e); // example dispatch event to emit
        };
        BottomContainer.prototype.previousQuestion = function (e) {
            e.data.dispatchEvent(BottomContainer.PREVIOUSQUESTION, e); // example dispatch event to emit
        };
        BottomContainer.prototype.getHTML = function () {
            return this.objBottamContainer;
        };
        BottomContainer.CHECKANSWER = "CHECK_ANSWER";
        BottomContainer.TRYAGAIN = "TRY_AGAIN";
        BottomContainer.CLEARANSWER = "CLEAR_ANSWER";
        BottomContainer.NEXTQUESTION = "NEXT_QUESTION";
        BottomContainer.PREVIOUSQUESTION = "PREVIOUS_QUESTION";
        return BottomContainer;
    }(eventdispatcher_4.EventDispatcher));
    exports.BottomContainer = BottomContainer;
});
define("JsonLoader", ["require", "exports", "events/eventdispatcher"], function (require, exports, eventdispatcher_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var JsonLoader = /** @class */ (function (_super) {
        __extends(JsonLoader, _super);
        function JsonLoader() {
            var _this = _super.call(this) || this;
            $.ajax({
                url: 'includes/dataset.json',
                success: function (data) { return _this.onJSONLoaded(data, _this); }
            });
            return _this;
        }
        JsonLoader.prototype.onJSONLoaded = function (e, ref) {
            ref.dispatchEvent(JsonLoader.LOADED, e);
        };
        JsonLoader.LOADED = "loaded";
        return JsonLoader;
    }(eventdispatcher_5.EventDispatcher));
    exports.JsonLoader = JsonLoader;
});
define("HotSpotHolder", ["require", "exports", "HotSpot", "model/model"], function (require, exports, HotSpot_1, model_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HotSpotHolder = /** @class */ (function () {
        function HotSpotHolder(data) {
            this.oHotSpotSet = $("<div>");
            this.aHotSpots = new Array();
            this.modelRefLocal = model_3.Model.Instance;
            this.oDataObject = data;
            this.hotSpotHolder();
        }
        HotSpotHolder.prototype.hotSpotHolder = function () {
            this.modelRefLocal.scale = 1;
            if (this.modelRefLocal.imageWidth > this.modelRefLocal.originaleWidth) {
                this.modelRefLocal.scale = 1;
            }
            else {
                this.modelRefLocal.scale = (this.modelRefLocal.imageWidth / this.modelRefLocal.originaleWidth);
            }
            //this.oHotSpotSet.addClass("hotSpotImage");
            for (var i = 0; i < this.oDataObject.LeftPos.length; i++) {
                this.left = this.oDataObject.LeftPos[i] * this.modelRefLocal.scale;
                this.top = this.oDataObject.TopPos[i] * this.modelRefLocal.scale;
                this.left -= 16;
                this.top -= 10;
                var oHotSpot = new HotSpot_1.HotSpot(this.left, this.top, i, this.oDataObject.DropPosition[i]);
                this.aHotSpots.push(oHotSpot);
                this.oHotSpotSet.append(oHotSpot.getHTML());
            }
        };
        HotSpotHolder.prototype.invalidate = function () {
            for (var i = 0; i < this.aHotSpots.length; i++) {
                this.aHotSpots[i].reAlign(this.oDataObject.LeftPos[i], this.oDataObject.TopPos[i]);
            }
        };
        HotSpotHolder.prototype.getHTML = function () {
            return this.oHotSpotSet;
        };
        return HotSpotHolder;
    }());
    exports.HotSpotHolder = HotSpotHolder;
});
define("DragableHolder", ["require", "exports", "events/eventdispatcher", "Dragable", "global"], function (require, exports, eventdispatcher_6, Dragable_1, myGlobals) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DragableHoder = /** @class */ (function (_super) {
        __extends(DragableHoder, _super);
        function DragableHoder(data) {
            var _this = _super.call(this) || this;
            _this.oDraggable = $("<div>");
            _this.aDragable = new Array();
            _this.bOnce = false;
            _this.distanceBetweenArrrow = 0;
            _this.rightCount = 0;
            _this.aItemSize = [];
            _this.oDataObject = data;
            _this.createDragable();
            return _this;
        }
        ;
        DragableHoder.prototype.createDragable = function () {
            this.oDraggable.addClass("dragable menu");
            for (var i = 0; i < this.oDataObject.OptionArray.length; i++) {
                this.objDragable = new Dragable_1.Dragable(this.oDataObject.OptionArray[i], (i + 1));
                this.aDragable.push(this.objDragable);
                this.oDraggable.append(this.objDragable.getHTML());
                this.objDragable.addEventListener("Enter_Clicked", this.showDropList, this);
            }
        };
        DragableHoder.prototype.getHTML = function () {
            return this.oDraggable;
        };
        DragableHoder.prototype.showDropList = function (e, ref) {
            console.log(e.keyCode);
            var charCode = (e.which) ? e.which : e.keyCode;
            if ((e.type === 'keyup') && (charCode !== 32) && (charCode !== 13) && (charCode !== 9)) {
                return false;
            }
            if ((charCode !== 9)) {
                if (e) {
                    e.stopPropagation();
                    e.preventDefault();
                }
                var currentDrag = $(this);
                var isHome = false;
                var DragID = ref.oDrag.attr("id");
                var DropListArray = ref.scope.oDataObject.DropListArray;
                var DropListAriaLabel = ref.scope.oDataObject.DropListAriaLabel;
                var DropList = "";
                $('#popup').remove();
                $(this).attr("aria-grabbed", "true");
                this.oDropListContainer = $('<ul id="popup" role="menu"></ul>');
                $(".spot").each(function (index) {
                    if (!$(this).hasClass("correct")) {
                        var checkDropSpot = "#" + $(this).attr("id") + $(this).attr("dropposition");
                        var i = index.toString();
                        //if ($(checkDropSpot).children().hasClass('dragBox') && !$(this).attr("dropped")) {
                        if ($(checkDropSpot).attr("droppid") == i) {
                            if ($(currentDrag).parent().attr("id") === $(this).attr("id")) {
                                isHome = true;
                            }
                            else {
                                $(this).attr("aria-dropeffect", "move");
                                DropList += '<li tabIndex="-1" id="' + DropListArray[index] + '" aria-label="' + DropListAriaLabel[index] + '" role="menuitem" class="dropList focus" data-id="' + $(this).attr("id") + '">' + DropListArray[index] + '</li>';
                            }
                        }
                        else {
                            console.log($(checkDropSpot).children());
                            $(this).attr("aria-dropeffect", "move");
                            DropList += '<li tabIndex="-1" id="' + DropListArray[index] + '" aria-label="' + DropListAriaLabel[index] + '" role="menuitem" class="dropList focus" data-id="' + $(this).attr("id") + '">' + DropListArray[index] + '</li>';
                        }
                    }
                });
                if (isHome) {
                    $("#dragContainer").attr("aria-dropeffect", "move");
                    DropList += '<li tabIndex="-1" id="' + DropListArray[DropListArray.length - 1] + '" aria-label="' + DropListAriaLabel[DropListAriaLabel.length - 1] + '" role="menuitem" class="dropList focus">' + DropListArray[DropListArray.length - 1] + '</li>';
                    isHome = false;
                }
                this.oDropListContainer.append(DropList);
                $('#' + DragID).append(this.oDropListContainer);
                if ($('#' + DragID).parent().hasClass("dragable")) {
                    this.oDropListContainer.css("top", "-" + ($(this.oDropListContainer).height() - 6));
                }
                else {
                    var ulTop = parseInt($('#' + DragID).parent().css("top").replace("px", ""));
                    if (ulTop <= 100) {
                        $("#popup").css("top", "-21px");
                    }
                    else {
                        this.oDropListContainer.css("top", "-" + ($(this.oDropListContainer).height() - 6));
                    }
                }
                if ($(this).parent().parent().attr("id") === "dragContainer") {
                    $('#Home').remove();
                }
                $(".dropList").bind('keydown', ref.scope.oDataObject, this.handleDropByList);
                setTimeout(function () {
                    $(".dropList").first().focus();
                }, 50);
            }
            else {
                var itemSize = 0;
                var aISize = [];
                $('.dragable .dragBox').each(function (i, obj) {
                    //console.log($(this).outerWidth(true))
                    itemSize += 25;
                    itemSize += $(obj).outerWidth(true);
                    aISize.push($(obj).outerWidth(true) + 20);
                });
                console.log("shift KEy", e.shiftKey, " keycode", e.keyCode);
                if (e.shiftKey && e.keyCode == 9) {
                    if (!$(".dragBack").hasClass("hidden")) {
                        var currentDrag = $(this);
                        this.distanceBetweenArrrow = Math.abs($(".dragNext").position().left + $(".dragNext").outerWidth() + $(".dragBack").outerWidth() - ($(".dragBack").position().left));
                        //this.distanceBetweenArrrow = Math.abs($(".dragBack").position().left - $(".dragBack").outerWidth())
                        var width;
                        if (($(ref.oDrag).next().siblings()).length === 0) {
                            width = $(ref.oDrag).position().left + $(ref.oDrag).outerWidth(true);
                        }
                        else {
                            width = $(ref.oDrag).position().left - $(ref.oDrag).outerWidth(true);
                        }
                        console.log(width, this.distanceBetweenArrrow);
                        if (width < 0) {
                            this.bOnce = false;
                            $('.menu').css('left', 0);
                        }
                        else if (($(ref.oDrag).offset().left < $(".dragBack").offset().left)) {
                            var left = $('.menu').position().left;
                            left += $(".dragBack").offset().left;
                            $('.menu').css('left', left);
                        }
                        else if (width < this.distanceBetweenArrrow) {
                            //$('.menu').css('left', width)
                        }
                        else if (width > this.distanceBetweenArrrow) {
                            var left = width - this.distanceBetweenArrrow;
                            left += (2 * $(".dragBack").outerWidth() + $(".dragNext").outerWidth());
                            $('.menu').css('left', -left);
                        }
                    }
                }
                else {
                    if (!$(".dragNext").hasClass("hidden")) {
                        var currentDrag = $(this);
                        this.distanceBetweenArrrow = Math.abs($(".dragNext").position().left - $(".dragNext").outerWidth());
                        var width;
                        width = $(ref.oDrag).outerWidth(true) + $(ref.oDrag).position().left;
                        //console.log(width +  this.distanceBetweenArrrow);
                        //console.log("sibling", ($(ref.oDrag).next().siblings()));
                        if (($(ref.oDrag).prev().siblings().length === 0 && $(".dragable").position().left < 0)) {
                            $('.menu').css('left', 0);
                            this.bOnce = false;
                        }
                        else if (width > this.distanceBetweenArrrow) {
                            if (!this.bOnce) {
                                var left = $('.menu').position().left;
                                left -= ($(ref.oDrag).outerWidth(true) + 25);
                                //console.log(($(ref.oDrag).next().siblings()));
                                $('.menu').css('left', -1 * Math.abs(left));
                                if (($(ref.oDrag).next().siblings()).length === 0) {
                                    this.bOnce = true;
                                }
                            }
                        }
                    }
                }
            }
        };
        DragableHoder.prototype.handleDropByList = function (e) {
            var parentDiv;
            console.log("hellddddo", e.data, e);
            var charCode = (e.which) ? e.which : e.keyCode;
            if ((e.type === 'keyup') && (charCode !== 13) && (charCode !== 32) && (charCode !== 9) && (charCode !== 37) && (charCode !== 38) && (charCode !== 39) && (charCode !== 40) && (charCode !== 27)) {
                return false;
            }
            e.stopPropagation();
            e.preventDefault();
            switch (charCode) {
                case 38:// Down arrow
                    setTimeout(function () {
                        $(e.currentTarget).prev().focus();
                    }, 30);
                    break;
                case 40:// Up arrow
                    setTimeout(function () {
                        $(e.currentTarget).next().focus();
                    }, 30);
                    break;
                case 27: // Escape
                case 9://Tab
                    $(this).parent().parent().focus();
                    $('#popup').remove();
                    $(".dropspot, #dragContainer").removeAttr("aria-dropeffect");
                    $(".dragbox").attr("aria-grabbed", "false");
                    break;
                case 13: // Enter
                case 32:// Space
                    var tempDragKey = $(e.target).parent().parent();
                    var tempDragKeyID = $(e.target).parent().parent().attr("id");
                    parentDiv = $(e.target).parent().parent().parent();
                    if ($('#' + tempDragKeyID).hasClass("spot")) {
                        $('#' + tempDragKeyID).attr("dropped", 'false');
                    }
                    var listarr = "Home";
                    var match;
                    for (var j = 0; j < e.data.DropListArray.length; j++) {
                        if ($(this).attr("id") === e.data.DropListArray[j]) {
                            listarr = e.data.DropListArray[j];
                            match = j;
                        }
                    }
                    if (listarr != "Home") {
                        var hotSpotId = $('#dropSpot_' + match);
                        var dropPosition = $('#dropSpot_' + match).attr("dropposition");
                        var id = "#";
                        $('#dropSpot_' + match).find(".gspot").addClass("circleActive").removeClass("circle");
                        id += $('#dropSpot_' + match + dropPosition).attr("id");
                        $("#" + tempDragKeyID).css({ "left": 0, "top": 0 });
                        $("#" + tempDragKeyID).css("border", 0);
                        $("#" + tempDragKeyID).addClass("dropDragBox");
                        $("#" + tempDragKeyID).removeClass("dragBox");
                        var width = $("#" + tempDragKeyID).width();
                        /////////////
                        $(this).addClass("dropDragBox");
                        $(this).removeClass("dragBoxOpacity");
                        var ifDropped = hotSpotId.attr("dropped");
                        if (ifDropped === "true") {
                            var childDragParent = $(id).children();
                            if ($(parentDiv).hasClass("dragable")) {
                                childDragParent.removeAttr("style");
                                childDragParent.removeClass("dropDragBox");
                                childDragParent.addClass("dragBox");
                                childDragParent.attr("tabindex", 0);
                                childDragParent.css("position", "relative");
                            }
                            parentDiv.append(childDragParent);
                            console.log(parentDiv, parentDiv.hasClass('menu'), " Drag Menu >>>> AmitAgain");
                            if (!parentDiv.hasClass('menu')) {
                                console.log("Amit ", parentDiv); //Number(parentDiv.attr("id").split("_")[1])
                                if ($("#dropSpot_" + Number(parentDiv.attr("id").split("_")[1])).attr("dropPosition") === "_Left") {
                                    console.log("swappedTOLeft");
                                    var left = $("#dropSpot_" + Number(parentDiv.attr("id").split("_")[1])).position().left;
                                    var width = childDragParent.width();
                                    left = left - width - 35;
                                    $(parentDiv).css("left", left);
                                    $(parentDiv).css("top", $("#dropSpot_" + Number(parentDiv.attr("id").split("_")[1])).position().top - 5);
                                }
                            }
                        }
                        else {
                            if (!$(parentDiv).hasClass("dragable")) {
                                var str = $(parentDiv).attr("id");
                                if (str.indexOf("_Right") != -1) {
                                    str = str.replace("_Right", "");
                                    $("#" + str + " .gspot").addClass("circle");
                                    $("#" + str + " .gspot").removeClass("circleActive");
                                    $("#" + str).attr("dropped", "false");
                                }
                                else if (str.indexOf("_Left") != -1) {
                                    str = str.replace("_Left", "");
                                    $("#" + str + " .gspot").addClass("circle");
                                    $("#" + str + " .gspot").removeClass("circleActive");
                                    $("#" + str).attr("dropped", "false");
                                }
                                else if (str.indexOf("_Top") != -1) {
                                    str = str.replace("_Top", "");
                                    $("#" + str + " .gspot").addClass("circle");
                                    $("#" + str + " .gspot").removeClass("circleActive");
                                    $("#" + str).attr("dropped", "false");
                                }
                                else if (str.indexOf("_Bottom") != -1) {
                                    str = str.replace("_Bottom", "");
                                    $("#" + str + " .gspot").addClass("circle");
                                    $("#" + str + " .gspot").removeClass("circleActive");
                                    $("#" + str).attr("dropped", "false");
                                }
                                else if (str.indexOf("_TRight") != -1) {
                                    str = str.replace("_TRight", "");
                                    $("#" + str + " .gspot").addClass("circle");
                                    $("#" + str + " .gspot").removeClass("circleActive");
                                    $("#" + str).attr("dropped", "false");
                                }
                                else if (str.indexOf("_BRight") != -1) {
                                    str = str.replace("_BRight", "");
                                    $("#" + str + " .gspot").addClass("circle");
                                    $("#" + str + " .gspot").removeClass("circleActive");
                                    $("#" + str).attr("dropped", "false");
                                }
                                $(parentDiv).css("display", "none");
                            }
                        }
                        /////////
                        /*if($('#dropSpot_' + match).attr("dropPosition") === "_Left"){
                            id = "";
                            id= "#" +  ('#dropSpot_' + match) + "_Left"
                            $(id).css("left", -500);
                            setTimeout(() => {
                                var hotspotClass = $('#dropSpot_' + match)
                                var left = $('#dropSpot_' + match).position().left;
                                var top = $('#dropSpot_' + match).position().top;
                                //var width = this.dragDiv.width();
                                left = left - width - 35;
                                top = top - 7;
                               $(id).css("left", left);
                               $(id).css("top", top);
                               $(id).append(tempDragKey);
                                
                                console.log('Dropped for left, swapnil')
                            }, 100);
                        } else{
                            var hotspotClass = $('#dropSpot_' + match)
                            $(id).append(tempDragKey);
                            $('#dropSpot_' + match).attr("dropped", 'true');
                           
                        }*/
                        if ($('#dropSpot_' + match).attr("dropposition") === "_Left") {
                            setTimeout(function () {
                                var hotspotClass = $('#dropSpot_' + match);
                                console.log("using Accessibility");
                                var width = $(id).width();
                                $(id).css("left", -500);
                                var left = $('#dropSpot_' + match).position().left;
                                var top = $('#dropSpot_' + match).position().top;
                                $('#dropSpot_' + match).attr("dropped", 'true');
                                $(id).append(tempDragKey);
                                var width = $(id).width();
                                left = left - width - 15;
                                top = top - 7;
                                $(id).css("left", left);
                                $(id).css("top", top);
                                // $(id).css('left',10);
                            }, 100);
                        }
                        else {
                            var hotspotClass = $('#dropSpot_' + match);
                            $(id).append(tempDragKey);
                            $('#dropSpot_' + match).attr("dropped", 'true');
                        }
                        $(id).css("display", "block");
                        if ($(".callout:visible").length === myGlobals.draggableCount) {
                            $(".checkAnswer").removeClass("disabled").addClass("enabled tabindex");
                            $(".checkAnswer").attr("tabindex", 0);
                            setTimeout(function () {
                                $('.checkAnswer').focus();
                            }, 150);
                        }
                        //$(".dragbox").removeClass('tabindex').removeAttr("tabindex");
                        setTimeout(function () {
                            $(".dragable").css("left", "0");
                            $(".dragable div:first").focus();
                            $('#popup').remove();
                        }, 150);
                    }
                    else {
                        var id = tempDragKey.attr('id').split('_')[1];
                        $('#dragSpot_' + id + '_td').append(tempDragKey);
                    }
                    $(".dropspot, #dragContainer").removeAttr("aria-dropeffect");
                    $(".dragbox").attr("aria-grabbed", "false");
                    if (e.data.CorrectOptionArray.length == $('.droppables .dragbox').length) {
                        $('.check').addClass('tabindex').attr("tabindex", "0").attr("aria-hidden", "false").removeClass('disabled').css({
                            'pointer-events': 'auto'
                        });
                        setTimeout(function () {
                            $('.check').focus();
                        }, 200);
                    }
                    else {
                        $('.check').removeClass('tabindex').removeAttr("tabindex").attr("aria-hidden", "true").addClass('disabled').css({
                            'pointer-events': 'none'
                        });
                    }
                    setTimeout(function () {
                        $(".dragbase .dragbox:first").focus();
                        $('#popup').remove();
                    }, 150);
                    break;
            }
        };
        DragableHoder.prototype.setFoucs = function () {
        };
        return DragableHoder;
    }(eventdispatcher_6.EventDispatcher));
    exports.DragableHoder = DragableHoder;
});
define("nav", ["require", "exports", "global"], function (require, exports, myGlobals) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Nav = /** @class */ (function () {
        function Nav() {
            var rightCount = 0;
            var distanceBetweenArrrow = 0;
            // duration of scroll animation
            var scrollDuration = 300;
            var aItemSize = [];
            // paddles
            var leftPaddle = document.getElementsByClassName('left-paddle');
            var rightPaddle = document.getElementsByClassName('right-paddle');
            console.log(leftPaddle);
            // get items dimensions
            var itemsLength = $('.item').length;
            var itemSize = 0;
            //var itemSize = $('.dragBox').outerWidth(true);
            $('.dragBox').each(function (i, obj) {
                //console.log($(this).outerWidth(true))
                itemSize += 25;
                itemSize += $(this).outerWidth(true);
                aItemSize.push($(this).outerWidth(true) + 20);
            });
            if (myGlobals.count <= 3) {
                itemSize += 100;
            }
            console.log(aItemSize);
            $(".dragable").css("width", itemSize);
            console.log('nav', itemsLength, itemSize);
            // get some relevant size for the paddle triggering point
            var paddleMargin = 20;
            // get wrapper width
            var getMenuWrapperSize = function () {
                return $('.menu-wrapper').outerWidth();
            };
            var menuWrapperSize = getMenuWrapperSize();
            // the wrapper is responsive
            $(window).on('resize', function () {
                menuWrapperSize = getMenuWrapperSize();
            });
            // size of the visible part of the menu is equal as the wrapper size 
            var menuVisibleSize = menuWrapperSize;
            // get total width of all menu items
            var getMenuSize = function () {
                //return itemsLength * itemSize;
                return itemSize;
            };
            var menuSize = getMenuSize();
            // get how much of menu is invisible
            var menuInvisibleSize = menuSize - menuWrapperSize;
            // get how much have we scrolled to the left
            var getMenuPosition = function () {
                return $('.menu').scrollLeft();
            };
            var menuPosition = getMenuPosition();
            // finally, what happens when we are actually scrolling the menu
            if (menuSize < menuWrapperSize) {
                $(leftPaddle).addClass('hidden');
                $(rightPaddle).addClass('hidden');
            }
            $('.menu').on('scroll', function () {
                // get how much of menu is invisible
                menuInvisibleSize = menuSize - menuWrapperSize;
                // get how much have we scrolled so far
                menuPosition = getMenuPosition();
                var menuEndOffset = menuInvisibleSize - paddleMargin;
                // show & hide the paddles 
                // depending on scroll position
                if (menuPosition <= paddleMargin) {
                    $(leftPaddle).addClass('hidden');
                    $(rightPaddle).removeClass('hidden');
                }
                else if (menuPosition < menuEndOffset) {
                    // show both paddles in the middle
                    $(leftPaddle).removeClass('hidden');
                    $(rightPaddle).removeClass('hidden');
                }
                else if (menuPosition >= menuEndOffset) {
                    $(leftPaddle).removeClass('hidden');
                    $(rightPaddle).addClass('hidden');
                }
                // print important values
            });
            // scroll to left
            $(rightPaddle).on('click', function () {
                distanceBetweenArrrow = Math.abs($(".dragNext").position().left) - ($(".dragBack").position().left + $(".dragBack").outerWidth() + $(".dragNext").outerWidth());
                //distanceBetweenArrrow = Math.abs($(".dragNext").position().left) - ($(".dragBack").position().left)
                var scope = distanceBetweenArrrow;
                for (var i = 0; i <= rightCount; i++) {
                    scope += aItemSize[i];
                }
                console.log(scope, menuSize);
                if (scope < menuSize) {
                    var shiftLeft = 0;
                    for (var i = 0; i <= rightCount; i++) {
                        shiftLeft += aItemSize[i];
                    }
                    $('.menu').css('left', -1 * shiftLeft);
                    rightCount++;
                }
            });
            // scroll to right
            $(leftPaddle).on('click', function () {
                console.log("clicked left");
                var scope = 0;
                for (var i = 0; i < rightCount; i++) {
                    scope += aItemSize[i];
                }
                if (rightCount > 0)
                    rightCount--;
                scope -= aItemSize[rightCount];
                if (scope >= 0) {
                    $('.menu').css('left', -scope);
                    console.log(aItemSize[rightCount]);
                }
                console.log("navScroll", 'menuWrapperSize', menuWrapperSize);
                console.log("navScroll", 'menuSize', menuSize);
                console.log("navScroll", 'menuInvisibleSize', menuInvisibleSize);
                console.log("navScroll", 'menuPosition', menuPosition);
            });
        }
        return Nav;
    }());
    exports.Nav = Nav;
});
define("Controller", ["require", "exports", "model/model", "HeaderController", "PageSection", "BottomContainer", "JsonLoader", "HotSpotHolder", "DragableHolder", "nav", "global"], function (require, exports, model_4, HeaderController_1, PageSection_1, BottomContainer_1, JsonLoader_1, HotSpotHolder_1, DragableHolder_1, nav_1, myGlobals) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = /** @class */ (function () {
        //private courseraApi:CourseraConnect;
        function Controller($container) {
            this.oJsonLoader = new JsonLoader_1.JsonLoader();
            this.setFocous = false;
            this.oRef = this;
            this.modelRef = model_4.Model.Instance;
            this.modelRef.controllerRef = this;
            this.oJsonLoader = new JsonLoader_1.JsonLoader();
            this.oJsonLoader.addEventListener(JsonLoader_1.JsonLoader.LOADED, this.fnOnJSONLoaded, this);
            this.$container = $container;
            courseraApi.callMethod({
                type: 'GET_SESSION_CONFIGURATION',
                onSuccess: function (config) {
                    console.log("on success this", config);
                },
                onFailure: function (error) { console.error(error); }
            });
            courseraApi.callMethod({
                type: "GET_STORED_VALUES",
                data: ["lastLoadTime"],
                onSuccess: function (values) {
                    console.log("GET_STORED_VALUES");
                    courseraApi.callMethod({
                        type: "SET_STORED_VALUES",
                        data: {
                            lastLoadTime: Date.now()
                        }
                    });
                }
            });
            courseraApi.callMethod({
                type: 'SET_HEIGHT',
                data: {
                    height: '768px',
                },
            });
        }
        Controller.prototype.fnOnJSONLoaded = function (data, ref) {
            ref.scope.oDataObj = data;
            myGlobals.questionCount = data.length;
            this.bootStrapComponents();
        };
        Controller.prototype.setFocusChild = function () {
            $("#dragBox_1").focus();
            this.setFocous = false;
        };
        Controller.prototype.bootStrapComponents = function () {
            var _this = this;
            //for(var i = 0; i<this.oDataObj.length;  i ++ ){
            myGlobals.draggableCount = this.oDataObj[myGlobals.count].CorrectOptionArray.length;
            this.oHeaderController = new HeaderController_1.HeaderController(this.oDataObj[myGlobals.count], myGlobals.count, myGlobals.questionCount);
            this.oBottomContainer = new BottomContainer_1.BottomContainer();
            this.oBottomContainer.addEventListener("CHECK_ANSWER", this.checkAnswer, this);
            this.oBottomContainer.addEventListener("TRY_AGAIN", this.tryAgain, this);
            this.oBottomContainer.addEventListener("CLEAR_ANSWER", this.clearAnswer, this);
            this.oBottomContainer.addEventListener("NEXT_QUESTION", this.nextQuestion, this);
            this.oBottomContainer.addEventListener("PREVIOUS_QUESTION", this.previousQuestion, this);
            this.oPageSsection = new PageSection_1.PageSection(this.oDataObj[myGlobals.count]);
            this.oPageSsection.bootStrapGameObject();
            this.oPageSsection.addEventListener("UI_LOADED", this.alignHotspots, this);
            this.render();
            setTimeout(function () {
                _this.oPageSsection.setupImageDimentions();
            }, 1000);
            this.setDraggble(this.oDataObj[myGlobals.count]);
            this.oPageSsection.appendDraggable(this.oDragable);
            setTimeout(function () {
                var myNav = new nav_1.Nav();
            }, 1000);
            if (this.setFocous) {
                if (myGlobals.count === 0) {
                    //setTimeout(this.setFocusChild, 500)
                }
                else {
                    $(".questionCount").focus();
                    $('body').removeClass('show-focus-outlines');
                }
            }
            window.addEventListener('resize', this.onWindowResize);
            setTimeout(function () {
                _this.setTabIndex;
            }, 1500);
            $(window).on('keydown', function (e) {
                if (e.keyCode === 9) {
                    $('body').addClass('show-focus-outlines');
                }
            });
            document.addEventListener('click', function (e) {
                $('body').removeClass('show-focus-outlines');
            });
        };
        Controller.prototype.onWindowResize = function () {
            var tempModelRef = model_4.Model.Instance;
            tempModelRef.controllerRef.oPageSsection.setupImageDimentions();
            if (tempModelRef.imageWidth > tempModelRef.originaleWidth) {
                tempModelRef.scale = 1;
            }
            else {
                tempModelRef.scale = (tempModelRef.imageWidth / tempModelRef.originaleWidth);
            }
            tempModelRef.controllerRef.oHotSpotHolder.invalidate();
        };
        Controller.prototype.setDraggble = function (data) {
            this.objDragable = new DragableHolder_1.DragableHoder(data);
            this.oDragable = this.objDragable.getHTML();
        };
        Controller.prototype.alignHotspots = function (data, ref) {
            console.log("Check DelayedCAll");
            ref.scope.oHotSpotHolder = new HotSpotHolder_1.HotSpotHolder(data);
            this.ohotSpots = ref.scope.oHotSpotHolder.getHTML();
            console.log("align HS::: ", this.ohotSpots);
            this.oPageSsection.appendHotspotHolder(this.ohotSpots);
        };
        Controller.prototype.checkAnswer = function (data, ref) {
            console.log($(".dragBox"));
            var correctCount = 0;
            var charCode = (data.which) ? data.which : data.keyCode;
            if ((data.type === 'keyup') && (charCode !== 13) && (charCode !== 32)) {
                return false;
            }
            data.stopPropagation();
            data.preventDefault();
            this.aInorrectOptions = new Array();
            for (var i = 0; i < ref.scope.oDataObj[myGlobals.count].CorrectOptionArray.length; i++) {
                var tempVal = ($("#dropSpot_" + i + "_" + ref.scope.oDataObj[myGlobals.count].DropPosition[i]).text());
                $("#dropSpot_" + i).find(".gspot").css("display", "none");
                if (tempVal != undefined && tempVal != "") {
                    if (ref.scope.oDataObj[myGlobals.count].CorrectOptionArray[i] == tempVal) {
                        $("#dropSpot_" + i).find(".correct").css("display", "block");
                        $("#dropSpot_" + i).addClass("correct");
                        $("#dropSpot_" + i).droppable({
                            drop: function (event, ui) {
                                $(this).droppable("option", "disabled", true);
                            }
                        });
                        $("#dropSpot_" + i).removeClass("ui-droppable");
                        correctCount++;
                    }
                    else {
                        this.aInorrectOptions.push($("#dropSpot_" + i).attr("id"));
                        $("#dropSpot_" + i).find(".incorrect").css("display", "block");
                    }
                }
                else {
                    $("#dropSpot_" + i).find(".incorrect").css("display", "block");
                }
            }
            for (var i = 0; i < ref.scope.oDataObj[myGlobals.count].CorrectOptionArray.length; i++) {
                $("#dragBox_" + (i + 1)).removeClass('tabindex ui-draggable ui-draggable-handle').removeAttr("tabindex");
                $("#dragBox_" + (i + 1)).css("pointer-events", "none");
            }
            if (correctCount < ref.scope.oDataObj[myGlobals.count].CorrectOptionArray.length) {
                $(".checkAnswer").css("display", "none");
                $(".tryAgain").css("display", "block");
                $(".tryAgain").addClass("tabindex");
                $(".tryAgain").attr("tabindex", 0);
                $(".tryAgain").focus();
            }
            else {
                if (this.oDataObj.length != myGlobals.count) {
                    myGlobals.count += 1;
                }
                if (this.oDataObj.length == myGlobals.count) {
                    courseraApi.callMethod({
                        type: "SET_COMPLETE",
                        onSuccess: function () {
                            // Progress updated
                            console.log(" Progress updated");
                        },
                        onError: function (error) { console.log(" Progress updated failed"); },
                    });
                    $(".clearAnswer").attr("aria-label", "Clear Answer, Your answers are correct. To clear answers, press the Enter or Space bar key.");
                }
                $(".checkAnswer").addClass("disabled");
                $(".checkAnswer").removeClass("enabled tabindex");
                $(".checkAnswer").removeAttr("tabindex");
                $(".checkAnswer").css("display", "none");
                $(".clearAnswer").removeClass("disabled");
                $(".clearAnswer").addClass("enabled tabindex");
                $(".clearAnswer").attr("tabindex", 0);
                $(".clearAnswer").css("display", "block");
                $('.clearAnswer').focus();
                $("#questionCount").attr("tabindex", "-1");
                if (this.oDataObj.length != myGlobals.count && myGlobals.count != 0) {
                    console.log($('.naviagtionNext').find("img"));
                    $('.naviagtionNext').find("img").attr("src", "assets/Next_button_Active.svg");
                    $('.naviagtionNext').addClass("tabindex").attr("tabindex", "0");
                    $('.naviagtionNext').css("pointer-events", "auto");
                    $('.naviagtionNext').css('cursor', 'pointer');
                    $('.naviagtionNext').attr("aria-label", "Next Button, press enter or space bar key to go to next question.");
                }
                else {
                    $('.naviagtionNext').find("img").attr("src", ref.scope.oDataObj[myGlobals.count].nextButtonPathDeactive);
                    $('.naviagtionNext').addClass("tabindex").attr("tabindex", "-1");
                    $('.naviagtionNext').css("pointer-events", "none");
                    $('.naviagtionNext').css('cursor', 'default');
                }
            }
            $(".dragBox").each(function (event, ui) {
                $(this).draggable('disable');
            });
        };
        Controller.prototype.tryAgain = function (data, ref) {
            var charCode = (data.which) ? data.which : data.keyCode;
            if ((data.type === 'keyup') && (charCode !== 13) && (charCode !== 32)) {
                return false;
            }
            for (var i = 0; i < this.aInorrectOptions.length; i++) {
                var childId = this.aInorrectOptions[i];
                var dropposition = $("#" + childId).attr("dropposition");
                $("#" + childId).attr("dropped", "false");
                $("#" + childId).find(".incorrect").css("display", "none");
                $("#" + childId).find(".gspot").css("display", "block");
                $("#" + childId).find(".gspot").removeClass("circleActive");
                $("#" + childId).find(".gspot").addClass("circle");
                $("#" + childId + dropposition).children().draggable('enable');
                $("#" + childId + dropposition).children().removeClass('dropDragBox');
                $("#" + childId + dropposition).children().addClass('tabindex');
                $("#" + childId + dropposition).children().attr('tabindex', '0');
                $("#" + childId + dropposition).children().removeAttr('style');
                $("#" + childId + dropposition).children().css({ position: 'relative', zindex: "0" });
                $(".dragable").append($("#" + childId + dropposition).children());
                $(".item").addClass("dragBox tabindex ui-draggable ui-draggable-handle");
                $(".item").css("cursor", "pointer");
                $("#" + childId + dropposition).children().remove();
                $("#" + childId + dropposition).css("display", "none");
                $(".tryAgain").css("display", "none");
                $(".checkAnswer").css("display", "block");
                $(".checkAnswer").addClass("disabled");
                $(".checkAnswer").removeClass("enabled tabindex");
                $(".checkAnswer").removeAttr("tabindex");
                setTimeout(function () {
                    $(".dragable .dragBox:first").focus();
                }, 300);
            }
        };
        Controller.prototype.clearAnswer = function (data, ref) {
            var charCode = (data.which) ? data.which : data.keyCode;
            if ((data.type === 'keyup') && (charCode !== 13) && (charCode !== 32)) {
                return false;
            }
            data.stopPropagation();
            data.preventDefault();
            this.setFocous = true;
            $("#mainContainer").empty();
            if (this.oDataObj.length != myGlobals.count) {
                myGlobals.count -= 1;
                this.bootStrapComponents();
                setTimeout(function () {
                    $(".dragable .dragBox:first").focus();
                }, 300);
            }
            else if (this.oDataObj.length == myGlobals.count) {
                myGlobals.count -= 1;
                this.bootStrapComponents();
                setTimeout(function () {
                    $(".dragable .dragBox:first").focus();
                }, 300);
            }
        };
        Controller.prototype.nextQuestion = function (data, ref) {
            var charCode = (data.which) ? data.which : data.keyCode;
            if ((data.type === 'keyup') && (charCode !== 13) && (charCode !== 32)) {
                return false;
            }
            data.stopPropagation();
            data.preventDefault();
            this.setFocous = true;
            $("#mainContainer").empty();
            if (this.oDataObj.length != myGlobals.count) {
                //myGlobals.count += 1;
                this.bootStrapComponents();
                setTimeout(function () {
                    $(".questionCount").focus();
                    $('body').removeClass('show-focus-outlines');
                }, 300);
            }
        };
        Controller.prototype.previousQuestion = function (data, ref) {
            var charCode = (data.which) ? data.which : data.keyCode;
            if ((data.type === 'keyup') && (charCode !== 13) && (charCode !== 32)) {
                return false;
            }
            data.stopPropagation();
            data.preventDefault();
            this.setFocous = true;
            $("#mainContainer").empty();
            if (myGlobals.count != 0) {
                myGlobals.count -= 1;
                this.bootStrapComponents();
                setTimeout(function () {
                    $(".questionCount").focus();
                    $('body').removeClass('show-focus-outlines');
                }, 300);
            }
        };
        Controller.prototype.render = function () {
            this.$container.append(this.oHeaderController.getHTML());
            this.$container.append(this.oPageSsection.getHTML());
            //this.$container.append(this.oHotSpot.getHTML());
            this.$container.append(this.oBottomContainer.getHTML());
        };
        Controller.prototype.setTabIndex = function () {
            $(".tabindex").each(function (index) {
                $(this).attr("tabindex", 0);
            });
        };
        Controller.prototype.removeTabIndex = function () {
            $(".tabindex").each(function (index) {
                $(this).attr("tabindex", -1);
            });
        };
        return Controller;
    }());
    exports.Controller = Controller;
});
define("Activity", ["require", "exports", "Controller"], function (require, exports, Controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var oController = new Controller_1.Controller($("#mainContainer"));
});
define("ObjectDiv", ["require", "exports", "events/eventdispatcher"], function (require, exports, eventdispatcher_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ObjectDiv = /** @class */ (function (_super) {
        __extends(ObjectDiv, _super);
        function ObjectDiv(str) {
            var _this = _super.call(this) || this;
            _this.objHTML = $("<div>");
            _this.myStr = "";
            _this.myStr = str;
            _this.createObject();
            return _this;
        }
        ObjectDiv.prototype.createObject = function () {
            this.objHTML.append(this.myStr);
            this.objHTML.draggable();
            this.addEvents();
        };
        ObjectDiv.prototype.onClick = function (e) {
            console.log(e.data.myStr, this.myStr, "on click");
            e.data.dispatchEvent(ObjectDiv.CREATED, { 'obj': e.data.myStr }); // example dispatch event to emit
        };
        ObjectDiv.prototype.addEvents = function () {
            console.log(this.myStr);
            this.objHTML.bind('click', this, this.onClick); // example to add events
        };
        ObjectDiv.prototype.getHTML = function () {
            return this.objHTML;
        };
        ObjectDiv.prototype.getStr = function () {
            return this.myStr;
        };
        ObjectDiv.CREATED = "ObjectsCreated";
        return ObjectDiv;
    }(eventdispatcher_7.EventDispatcher));
    exports.ObjectDiv = ObjectDiv;
});
/*
 * Injected into third party widgets to allow communication with Coursera.
 * Talks to coursera-connect-parent.js
 */
// eslint-disable-next-line
var courseraApi = (function () {
    var _messageToken;
    var _parentOrigin;
    var _isInitialized = false;
    var _isConnectedToParent = false;
    /**
     * Generates a random 10-character id.
     */
    function _generateId() {
        return Array(11)
            .join((Math.random().toString(36) + '00000000000000000').slice(2, 18))
            .slice(0, 10);
    }
    /**
     * Send an authenticated message to the parent frame.
     */
    function _sendMessageToParent(requestType, data) {
        if (!_isConnectedToParent || !_messageToken) {
            return '';
        }
        if (window && window.parent) {
            var requestId = _generateId();
            var messageData = {
                token: _messageToken,
                id: requestId,
                type: requestType,
                body: data,
            };
            window.parent.postMessage(messageData, _parentOrigin);
            return requestId;
        }
        return '';
    }
    /**
     * Listens for authentication from parent and sets the `_parentOrigin` and `_messageToken`
     * variables, which authenticate messages from the child frame.
     */
    function _listenForParentInit() {
        var onParentMessage = function (event) {
            var parentResponse = event.data;
            if (!parentResponse || !parentResponse.token || !parentResponse.id) {
                return;
            }
            switch (parentResponse.type) {
                case 'INIT_CHILD': {
                    if (!_isInitialized) {
                        _messageToken = parentResponse.token;
                        _parentOrigin = event.origin;
                        _isInitialized = true;
                        window.parent.postMessage(parentResponse, _parentOrigin);
                    }
                    else {
                        // This is an event meant for another plugin. This can happen when there are multiple
                        // plugins on a single page (such as quizzes), and usually when a second plugin is
                        // receiving an INIT_CHILD message before this plugin receives its INIT_COMPLETE
                        // message. Before adding _isInitialized, this would overwrite the first plugin's
                        // _messageToken, meaning it would never accept anymore messages because everything,
                        // most notably INIT_COMPLETE, checks for `parentResponse.token === _messageToken`.
                    }
                    break;
                }
                case 'INIT_COMPLETE': {
                    if (parentResponse.token === _messageToken) {
                        _isConnectedToParent = true;
                        window.removeEventListener('message', onParentMessage);
                    }
                    break;
                }
                case 'ERROR': {
                    window.removeEventListener('message', onParentMessage);
                    break;
                }
                default: {
                    break;
                }
            }
        };
        window.addEventListener('message', onParentMessage);
    }
    /**
     * Listen for a response with the specified `requestId` from the parent.
     * Pass the message to `callback` on receipt and de-register the listener.
     */
    function _listenForParentResponse(messageId, onSuccess, onError) {
        var onParentReply = function (event) {
            var parentResponse = event.data;
            if (!parentResponse) {
                onError('NO_DATA_RECEIVED');
                return;
            }
            if (parentResponse.token === _messageToken && parentResponse.id === messageId) {
                if (parentResponse.type === 'ERROR') {
                    if (parentResponse.body && parentResponse.body.errorCode) {
                        onError(parentResponse.body.errorCode);
                    }
                }
                else {
                    onSuccess(parentResponse.body);
                }
                window.removeEventListener('message', onParentReply);
            }
        };
        window.addEventListener('message', onParentReply);
    }
    // Public methods
    // TODO(Holly): Figure out standard for documenting Javascript functions (FLEX-10664)
    /**
     * Call allowed parent methods.
     * options {
     *  type string
     *  [onSuccess] (allowedMethods: Array<string>)
     *  [onError] (errorMessage: string)
     *  [data] any
     * }
     */
    function callMethod(options) {
        // eslint-disable-next-line prefer-destructuring
        var type = options.type;
        var onSuccess = options.onSuccess || function () { };
        var onError = options.onError || function () { };
        var data = options.data || {};
        if (!type) {
            onError('MESSAGE_TYPE_NOT_DEFINED');
        }
        else if (!_isConnectedToParent) {
            // Try again later, when initialization is hopefully done.
            setTimeout(function () {
                callMethod(options);
            }, 500);
        }
        else {
            var messageId = _sendMessageToParent(type, data);
            _listenForParentResponse(messageId, onSuccess, onError);
        }
    }
    // Establish communication with the container automatically.
    _listenForParentInit();
    return {
        callMethod: callMethod,
    };
})();

//# sourceMappingURL=Activity.js.map
