import express = require('express');
import cors from 'cors';
import dotenv = require('dotenv');
import validator from 'email-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

import { User } from './db';

const secret = process.env.JWT_SECRET || 'secret';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async function (req, res) {
    res.json({ success: true, data: 'Hello World!' });
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    // find if user exists
    const check_user = await User.findOne({ email });
    // console.log(check_user);
    if (!validator.validate(email)) {
        res.status(422).json({ success: false, message: 'Invalid email' });
    } else if (check_user) {
        res.status(422).json({ success: false, data: 'User already exists' });
    } else {
        const user = await User.create({ email, password });
        res.json({ success: true, data: user });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    let isPasswordValid = false;
    let token = '';
    if (user != null) {
        isPasswordValid = await bcrypt.compareSync(
            password,
            user.password as string,
        );
        token = jwt.sign({ id: user._id }, secret);
    }
    if (!validator.validate(email) || !user || !isPasswordValid) {
        res.status(422).json({
            success: false,
            message: 'Wrong email or password',
        });
    } else {
        res.json({ success: true, data: user, token: token });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`);
});
