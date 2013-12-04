grunt-chatwork
=================

[![NPM version](https://badge.fury.io/js/grunt-chatwork.png)](http://badge.fury.io/js/grunt-chatwork)
[![Dependency Status](https://david-dm.org/astronaughts/grunt-chatwork.png)](https://david-dm.org/astronaughts/grunt-chatwork)

## インストール

以下のコマンドでインストールできます。

```bash
$ npm install grunt-chatwork
```

## 使い方

### API Token

API Token は以下の公式サイトを参考に取得してください。

[ChatWork API ドキュメント - 認証方法](http://developer.chatwork.com/ja/authenticate.html)

取得したトークンは bash_profile などにセットします。

```bash
# ChatWork API
export CHATWORK_API_TOKEN=YOUR_TOKEN
```

### Gruntfile

メッセージを送るには `Gruntfile` に以下の様に記述してください。

```js
chatwork: {
    message: {
        token: process.env.CHATWORK_API_TOKEN
        type: 'message'
        message: 'Grunt のタスクが終わったよ'
        roomId: 1234567890
    }
}
```

#### token

型: `String` *必須*

API トークンの値をセットしてください。

#### type

型: `String` *必須*

通常のチャットメッセージの場合は `'message'` 、 タスクの場合は `'task'` をセットします。

#### message

型: `String` *必須*

送信するメッセージ内容をセットします。

#### roomId

型: `Number` *必須*

room ID を指定します。

###### *補足* :

簡単な room ID 調べ方ですが、ChatWork の画面をブラウザで開いて、メッセージを送りたいチャットの URL をコピーします。

```
https://www.chatwork.com/#!rid1234567890
```

`#!rid` よりも右側の数字が room ID です。

#### limit

型: `String` or `Number` *デフォルト値: null*

タスクの場合に期限を指定できます。当日の場合は `today` 、次の日の場合は `tomorrow` と指定できます。

または、当日から何日後という指定も可能です。`5` を指定すると、当日から５日後が期限になります。

#### members

型: `Array[Number]` *必須*

タスクの担当者の account ID を配列で指定します。

###### *補足* :

簡単な account ID 調べ方ですが、ChatWork をブラウザで開いて、メッセージ送信の際に送りたい人の To をクリックします。

```
[To:1234567890] てすとさん
```

`[To:xxxxxxxxx]` の中の数字が account ID です。

### サンプル

*Gruntfile.coffee*

```coffee
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
```