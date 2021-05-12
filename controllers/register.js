const handleRegister = (req, res, db, bcrypt) => {
    const saltRounds = 10;
    const { name, password, email } = req.body;
    if (!name || !password || !email) {
        return res.status(400).json('incorrect form submission');
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx("users")
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => {
            res.status(400).json('unable to register')
        })
    }

    module.exports = {
        handleRegister
    }