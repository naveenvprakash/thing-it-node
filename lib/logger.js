module.exports = {
    create: function () {
        return new Logger();
    }
};

var moment = require("moment");

function Logger() {
    /**
     *
     * @param content
     */
    Logger.prototype.getTimestamp = function () {
        return moment().format("l") + " " + moment().format("LTS");
    };

    /**
     *
     * @param content
     */
    Logger.prototype.prefix = function (level) {
        return "" + this.getTimestamp() + " " + level + " " + (this.class ? this.class : "") +
            (this.label ? ("[" + this.label + "]") : "");
    };

    /**
     *
     * @param content
     */
    Logger.prototype.logDebug = function () {
        if (this.logLevel === "debug") {
            var args = [this.prefix("DEBUG")];

            args.push.apply(args, arguments);

            console.log.apply(console, args);
        }
    };

    /**
     *
     * @param content
     */
    Logger.prototype.logInfo = function () {
        if (!this.logLevel || this.logLevel === "info" || this.logLevel === "debug") {
            var args = [this.prefix("INFO")];

            args.push.apply(args, arguments);

            console.log.apply(console, args);

            if (this.publishMessage) {
                this.publishMessage.apply(this, args);
            }
        }
    };

    /**
     *
     * @param content
     */
    Logger.prototype.logError = function () {
        if (this.logLevel == "error" || this.logLevel === "info" || this.logLevel === "debug") {
            var args = [this.prefix("ERROR")];

            args.push.apply(args, arguments);

            console.error.apply(console, args);

            if (this.publishMessage) {
                this.publishMessage.apply(this, args);
            }
        }
    };
};