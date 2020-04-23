/* Magic Mirror
 * Module: MMM-TrivialAbyss
 *
 * By Mykle1
 *
 */
const NodeHelper = require('node_helper');
const request = require('request');



module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getTriv: function(url) {
        request({
            url:  'https://uselessfacts.jsph.pl/random.json?language=en',
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body); // Parsing an array. In this case, an object.
				// console.log(response.statusCode + result);
                    this.sendSocketNotification('TRIV_RESULT', result);

            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_TRIV') {
            this.getTriv(payload);
        }
    }
});
