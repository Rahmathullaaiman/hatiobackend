const bcrypt = require('bcrypt');
const users = require('../SCHEMAS/userschema');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    console.log('inside register controller');
    const { username, email, password } = req.body;

    try {
        const existuser = await users.findOne({ email });

        if (existuser) {
            res.status(406).json('Account already exists... please login');
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newuser = new users({
                username,
                email,
                password: hashedPassword,
                profile: ""
            });
   await newuser.save();

            res.status(200).json(newuser);
        }
    } catch (err) {
        res.status(401).json(`Register request failed due to ${err}`);
    }
};

exports.login = async (req, res) => {
    console.log('inside login controller');

    const { email, password } = req.body;

    try {
        const existuser = await users.findOne({ email });

        if (existuser) {
            const isMatch = await bcrypt.compare(password, existuser.password);

            if (isMatch) {
                const token = jwt.sign({ userId: existuser._id }, "supersecretkey");

                res.status(200).json({
                    existuser,
                    token
                });
     } else {
                res.status(404).json('Invalid email or password');
            }
        } else {
            res.status(404).json('Invalid email or password');
        }
    } catch (err) {
        res.status(401).json(`Login request failed due to ${err}`);
    }
};
