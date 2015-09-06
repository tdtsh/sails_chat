# sails_chat

>> sails.js でchatサンプル

a [Sails](http://sailsjs.org) application


sudo npm i -g sails
(v.0.11.0)

sails new sails_chat

cd sails_chat
sails generate api message

## テストの準備
[http://sailsjs.org/documentation/concepts/testing](http://sailsjs.org/documentation/concepts/testing)

vi test/bootstrap.test.js
vi test/unit/controllers/MessageController.test.js
vi test/unit/models/Message.test.js
>> 空のユニットテスト準備

vi package.json
>> npm test追記

vi config/appconfig.js
>> なんとなく設定ファイル準備

