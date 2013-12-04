module.exports = function (grunt) {
    'use strict';

    var CW = require('simple-cw-node');
    require('date-utils');

    grunt.registerMultiTask('chatwork', 'chatwork', function () {
        var client  = CW(),
            task    = this,
            type    = task.data.type,
            members = task.data.members,
            limit   = task.data.limit,
            done    = task.async();

        client.init({ token: task.data.token });

        var endpoint = 'rooms/' + task.data.roomId,
            params = { body: task.data.message };

        if (type === 'task') {
            endpoint += '/tasks';
            params.to_ids = members.join(',');

            if (typeof limit === 'string') {
                params.limit = Date[limit]().getTime() / 1000;
            } else if (typeof limit === 'number') {
                params.limit = Date.today().addDays(limit).getTime() / 1000;
            }

        } else {
            endpoint += '/messages';
        }

        client
            .post(endpoint, params)
            .done(done)
            .fail(function (err) {
                grunt.log.error(err);
            });
    });
};