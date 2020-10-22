module.exports = {
    newMessage:(req,res)=>{
        const db = req.app.get('db');
        const {message, sender, receiver, latitude, longitude} = req.body;
        db.create_message([
            message,
            sender,
            receiver,
            latitude,
            longitude
        ]).then(message=>{
            res.status(200).send(message)
        }).catch(err => {console.log(err)});
    },
    deleteMsg:(req, res)=>{
        const db = req.app.get('db');
        const {message_id}= req.params
        db.delete_message([
            message_id
        ]).then(message=>{
            console.log(message)
            res.status(200).send(message)
        }).catch(err=>{console.log(err)});
    },
    getLoot:(req, res)=>{
        const db = req.app.get('db');
        const { userId } = req.params
        db.message_recipient([userId]).then(messages=>{
            res.status(200).send(messages)
        }).catch(err=>{console.log(err)});

    },
    getMsg:(req, res)=>{
        const db = req.app.get('db');
        const {lootId} = req.params
        db.user_message([lootId]).then(message => {
            res.status(200).send(message[0])
        }).catch(err => console.log(err))
    },
    getDrops: (req, res) => {
        const db = req.app.get('db');
        const {userId} = req.params
        db.message_sender([userId]).then(messages => {
            res.status(200).send(messages)
        }).catch(err => console.log(err))
    },
    messageMatch:(req, res)=>{
        const db= req.app.get('db');
        const {lootId, latitude, longitude}=req.params
        db.message([lootId, latitude, longitude]).then(message=>{
            res.status(200).send(message)
        }).catch(err=> console.log(err))
    },
    activeLoot:(req, res)=>{
        const db= req.app.get('db');
        const {userId}=req.params
        db.active_drops(userId).then(messages=>{
            res.status(200).send(messages)
        }).catch(err=>console.log(err))
    },
    activeDrop:(req,res)=>{
        const db = req.app.get('db');
        const{userId}=req.params
        db.active_drops(userId).then(messages=>{
            res.status(200).send(messages)
        }).catch(err=>console.log(err))
    },
    totalLoot:(req,res)=>{
        const db = req.app.get('db');
        const{userId, newTotal}=req.body
        db.total_loots([userId, newTotal]).then(user=>{
            req.session.user.totalLoot = user[0].total_loot
            res.status(200).send(user)
        }).catch(err=>console.log(err))
    },
    totalDrops:(req,res)=>{
        const db = req.app.get('db');
        const{userId, newTotal}=req.body
        db.total_drops([userId, newTotal]).then(user=>{
            req.session.user.totalDrops = user[0].total_drops
            res.status(200).send(user)
        }).catch(err=>console.log(err))
    }

}