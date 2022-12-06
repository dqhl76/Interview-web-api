import express = require('express');
import cors from 'cors';
import dotenv = require('dotenv');
import validator from 'email-validator';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Server } from 'socket.io';
import http from 'http';
import url from 'url';

dotenv.config();

import { User, Room } from './db';

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

app.post('/create_room', async (req, res) => {
    const header = req.headers.authorization?.split(' ').pop();
    let user = null;
    try {
        const payload: JwtPayload = jwt.verify(
            header as string,
            secret,
        ) as JwtPayload;
        user = await User.findById(payload.id);
    } catch (err) {
        return res.json({ success: false, data: 'Wrong Token' });
    }
    if (user == null) {
        return res.json({ success: false, data: 'Wrong Token' });
    }
    const { start, duration, interviewed } = req.body;
    const interviewed_user = await User.findOne({ email: interviewed });
    if (interviewed_user == null) {
        return res.json({ success: false, data: 'User not found' });
    }
    const room_id = Math.random().toString().slice(-6);
    const room = await Room.create({
        start,
        duration,
        created_id: user._id,
        interviewed_id: interviewed_user._id,
        room_id,
    });
    res.json({ success: true, data: room });
});

app.get('/get_rooms', async (req, res) => {
    const header = req.headers.authorization?.split(' ').pop();
    let user = null;
    try {
        const payload: JwtPayload = jwt.verify(
            header as string,
            secret,
        ) as JwtPayload;
        user = await User.findById(payload.id);
    } catch (err) {
        return res.json({ success: false, data: 'Wrong Token' });
    }
    if (user == null) {
        return res.json({ success: false, data: 'Wrong Token' });
    }
    let rooms = await Room.find({ created_id: user._id });
    if (rooms == null) {
        rooms = await Room.find({ interviewed_id: user._id });
    }
    interface IResult {
        start?: string;
        duration?: number;
        room_id?: string;
        created_id?: string;
        interviewed_id?: string;
        created_email?: string;
        interviewed_email?: string;
    }
    const results: IResult[] = [];
    if (rooms != null) {
        // iterate through rooms and get the user
        for (let i = 0; i < rooms.length; i++) {
            const created_user = await User.findById(rooms[i].created_id);
            const interviewed_user = await User.findById(
                rooms[i].interviewed_id,
            );
            const result: IResult = {
                start: rooms[i].start,
                duration: rooms[i].duration,
                room_id: rooms[i].room_id,
                created_id: rooms[i].created_id,
                interviewed_id: rooms[i].interviewed_id,
                created_email: created_user?.email,
                interviewed_email: interviewed_user?.email,
            };
            results.push(result);
        }
    }
    const rooms_len = rooms.length;
    res.json({ success: true, data: results, len: rooms_len });
});

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`);
});

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    const room_id = url.parse(socket.request.url as string, true).query.room_id;
    socket.join(room_id as string);
    console.log(room_id);
    socket.on('message', function (data) {
        console.log(data);
        socket.broadcast.to(room_id as string).emit('message', data as string);
    });
});
