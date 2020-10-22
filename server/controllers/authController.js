const bcrypt = require('bcrypt');
module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {username, firstName, lastName, phone, email, password} = req.body;

        const existingUser = await db.check_user(email)
        if (existingUser[0]) {
            return res.status(409).send('Email address belongs to an existing account.')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)
        const newUser = await db.create_user([username, firstName, lastName, phone, email, hash])
        req.session.user = {
        userId: newUser[0].user_id,
        username: newUser[0].user_name,
        firstName: newUser[0].first_name,
        lastName: newUser[0].last_name,
        phone: newUser[0].phone_number,
        email: newUser[0].email,
        message: newUser[0].message,
        totalLoot: newUser[0].total_loot,
        totalDrops: newUser[0].total_drops
    }
    res.status(200).send(req.session.user)
},
    login: async (req, res)=> {
        const db = req.app.get('db');
        const{email, password}= req.body;
        const user= await db.check_user(email)
        if(!user[0]){
            return res.status(401).send('Incorrect credentials');
        }else {
            const authenticated=bcrypt.compareSync(password, user[0].password);
            if(authenticated){
                req.session.user={
                    userId: user[0].user_id,
                    username: user[0].user_name,
                    firstName: user[0].first_name,
                    lastName: user[0].last_name,
                    phone: user[0].phone_number,
                    email: user[0].email,
                    message: user[0].message,
                    totalLoot: user[0].total_loot,
                    totalDrops: user[0].total_drops

                    }
                res.status(200).send(req.session.user)
            } else {
                res.status(403).send('Username or password incorrect')
            }
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.status(200).send('You are logged out!');
    },
    test: (req, res)=>{
        res.status(200).send('TEST!');
    },
    getUser: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.status(200).send('No active session at this time.')
        }
    }
    
}