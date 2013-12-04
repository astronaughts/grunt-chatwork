###
# grunt-chatwork
# https://github.com/astronaughts/grunt-chatwork/
#
# Copyright (c) 2013 astronaughts
# Licensed under the MIT license.
###
module.exports = (grunt) ->
    'use strict'

    grunt.initConfig
        chatwork:
            message:
                token: process.env.CHATWORK_API_TOKEN
                type: 'message'
                message: '(*)grunt-chatwork から投稿テスト'
                roomId: 1234567890
            task:
                token: process.env.CHATWORK_API_TOKEN
                type: 'task'
                message: '(*)grunt-chatwork から投稿テスト'
                limit: 'today'
                roomId: 1234567890
                members: [ 1234567890 ]

    grunt.loadTasks 'tasks'
    grunt.registerTask 'message', 'chatwork:message'
    grunt.registerTask 'task', 'chatwork:task'