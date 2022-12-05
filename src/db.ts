import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const mongodb_options = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
};
console.log(process.env.MONGODB_URL);
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017';
mongoose.connect(MONGODB_URL, mongodb_options);

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        set(val: string) {
            return bcrypt.hashSync(val, 10);
        },
    },
});

const RoomSchema = new mongoose.Schema({
    start: {
        type: String,
    },
    duration: {
        type: Number,
    },
    created_id: {
        type: String,
    },
    interviewed_id: {
        type: String,
    },
    room_id: {
        type: String,
    },
});

const Room = mongoose.model('Room', RoomSchema);

const User = mongoose.model('User', UserSchema);

// export User
export { User, Room };
