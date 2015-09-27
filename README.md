# sails_chat

Sample Chat App of [Sails](http://sailsjs.org) v0.11.0.
As my own notes for when I make something in the sails.js.

## Install MongoDB

run MongoDB (ex. OSX)

```
brew update

brew install mongodb

mongod --config /usr/local/etc/mongod.conf
```


## Install and Run sails

sudo npm install -g sails
npm install

sails lift


## Run Unit Test

npm test



## MyNote

### create project

sails new sails_chat

cd sails_chat
sails generate api message
sails generate api thread

### Configuration UnitTest
[http://sailsjs.org/documentation/concepts/testing](http://sailsjs.org/documentation/concepts/testing)

npm install --save-dev supertest

vi test/bootstrap.test.js
vi test/unit/controllers/MessageController.test.js
vi test/unit/models/Message.test.js
>> prepare empty unit test files.

vi package.json
>> appending npm test

vi config/appconfig.js
>> Prepare configuration file. (なんとなく)


### Configration Model
[http://sailsjs.org/documentation/concepts/models-and-orm/model-settings](http://sailsjs.org/documentation/concepts/models-and-orm/model-settings)

vi config/model.js

```
connection: 'someMongodbServer',
migrate: 'alter'
```

npm install --save sails-mongo


### Prepare View

>> modify assets/favicon.ico

vi views/layout.ejs
>> modify browser title




