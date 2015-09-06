# sails_chat

Sample Chat App of [Sails](http://sailsjs.org).
As my own notes for when I make something in the sails.js.


## create project

sudo npm i -g sails
(v.0.11.0)

sails new sails_chat

cd sails_chat
sails generate api message

## Configuration UnitTest
[http://sailsjs.org/documentation/concepts/testing](http://sailsjs.org/documentation/concepts/testing)

npm i --save-dev supertest

vi test/bootstrap.test.js
vi test/unit/controllers/MessageController.test.js
vi test/unit/models/Message.test.js
>> prepare empty unit test files.

vi package.json
>> appending npm test

vi config/appconfig.js
>> Prepare configuration file. (なんとなく)


## MongoDB

run MongoDB (ex. OSX)

```
brew update

brew install mongodb

mongod --config /usr/local/etc/mongod.conf
```


## Configration Model
[http://sailsjs.org/documentation/concepts/models-and-orm/model-settings](http://sailsjs.org/documentation/concepts/models-and-orm/model-settings)

vi config/model.js

```
connection: 'someMongodbServer',
migrate: 'alter'
```

npm i --save sails-mongo


## Page

>> modify assets/favicon.ico

vi views/layout.ejs
>> modify browser title




