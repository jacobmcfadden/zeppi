require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authCtrl= require('./controllers/authController');
const msgCtrl= require('./controllers/messageController');
const friendCtrl= require('./controllers/friendController');

const app = express();

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT}=process.env;

app.use(express.json())
app.use( express.static( `${__dirname}/../build` ) );
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24},
    secret: SESSION_SECRET
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    console.log('Connected to db')
    db.init().catch(err=>console.log(err))
}).catch(err => console.log(err));


// authentication
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.post('/auth/test', authCtrl.test)
app.post('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)

//message
app.post('/msg/newMsg', msgCtrl.newMessage)
app.delete('/msg/delete/:message_id', msgCtrl.deleteMsg)
app.get('/msg/loot/:userId', msgCtrl.getLoot)
app.get('/msg/drops/:userId', msgCtrl.getDrops)
app.get('/msg/view/:lootId', msgCtrl.getMsg)
app.get('/msg/match/:lootId/:latitude/:longitude', msgCtrl.messageMatch)
app.get('/msg/activeLoot/:userId', msgCtrl.activeLoot)
app.get('/msg/activeDrops/:userId', msgCtrl.activeDrop)
app.put('/msg/totalLoot', msgCtrl.totalLoot)
app.put('/msg/totalDrops', msgCtrl.totalDrops)

//Connections(friend's List) 
app.post('/friends/newFriend', friendCtrl.addFriend)
app.get('/friends/all/:userId', friendCtrl.allFriends)
app.put('/friends/accept/:friendId/:userId', friendCtrl.acceptRequest)
app.get('/friends/request/:userId', friendCtrl.getRequest)
app.put('/friends/deny/:friendId/:userId', friendCtrl.denyRequest)
app.get('/friends/find/:userId', friendCtrl.findFriend)

//


app.listen(SERVER_PORT, () => console.log(`Connected to port ${SERVER_PORT}`));