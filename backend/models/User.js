const mongoose = require('mongoose');
const {compare, genSalt, hash} = require('bcrypt');
const {nanoid} = require('nanoid');

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const validateUnique = async value => {
    const user = await User.findOne({username: value});

    if (user) return false;
};

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validateUnique,
            message: 'Этот пользователь уже зарегистрирован',
        }
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: "user"
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await genSalt(SALT_WORK_FACTOR);
    this.password = await hash(this.password, salt);

    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});

UserSchema.methods.checkPassword = function(password) {
    return compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
    this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;