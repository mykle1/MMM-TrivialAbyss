/* Magic Mirror
 * Module: MMM-TrivialAbyss
 *
 * By Mykle1
 *
 */
Module.register("MMM-TrivialAbyss", {

    // Module config defaults.
    defaults: {
        useHeader: false, // false if you don't want a header
        header: "Trivial Trivia", // Any text you want
        maxWidth: "300px",
        animationSpeed: 3000, // fade in and out speed
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 5 * 60 * 1000,

    },

    getStyles: function() {
        return ["MMM-TrivialAbyss.css"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);


        // Set locale.
        this.Triv = {};
        this.scheduleUpdate();
    },

    getDom: function() {

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded) {
            wrapper.innerHTML = "This is not worth it!";
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }

        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright", "light", "header");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }

        var info = document.createElement("div");
        info.classList.add("small", "bright", "info");
        info.innerHTML = this.Triv;
        wrapper.appendChild(info);

        return wrapper;
    },



    processTriv: function(data) {
        this.Triv = data.text;
        //  console.log(this.Triv); // checking my data
        this.loaded = true;
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getTriv();
        }, this.config.updateInterval);
        this.getTriv(this.config.initialLoadDelay);
        var self = this;
    },

    getTriv: function() {
        this.sendSocketNotification('GET_TRIV', this.url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "TRIV_RESULT") {
            this.processTriv(payload);
            if (this.rotateInterval == null) {}
            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});
