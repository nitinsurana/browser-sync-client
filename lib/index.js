"use strict";

var socket    = require("./socket");
var notify    = require("./notify");
var codeSync  = require("./code-sync");
var ghostMode = require("./ghostmode");
var emitter   = require("./emitter");
var utils     = require("./browser.utils");

/**
 * @constructor
 */
var BrowserSync = function () {
    this.socket  = socket;
    this.emitter = emitter;
    this.utils   = utils;
};

/**
 * Helper to check if syncing is allowed
 * @param data
 * @returns {boolean}
 */
BrowserSync.prototype.canSync = function (data) {
    return data.url === window.location.pathname;
};

var bs;

/**
 * @param opts
 */
function init(opts) {

    bs      = new BrowserSync();
    bs.opts = opts;

    if (opts.notify) {
        notify.init(bs);
        notify.flash("Connected to BrowserSync :)");
    }
    if (opts.ghostMode) {
        ghostMode.init(bs);
    }

    codeSync.init(bs);
}

socket.on("connection", init);

/**debug:start**/
if (window.__karma__) {
    window.__bs_emitter__ = emitter;
    window.__bs_scroll__  = require("./ghostmode.scroll");
    window.__bs_notify__  = notify;
}
/**debug:end**/