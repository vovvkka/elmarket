const mongoose = require('mongoose');
const {compare, genSalt, hash} = require('bcrypt');
const {nanoid} = require('nanoid');

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const validateUnique = async value => {
    const user = await User.findOne({email: value});

    if (user) return false;
};

const validateEmail = (email) => {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
};

const validateUsernameLength = username => {
    return username.length < 50;
};

const validatePasswordLength = password => {
    return password.length > 7;
};

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        validate: {
            validator: validateUsernameLength,
            message: "Максимальная длина символов - 50"
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [{
            validator: validateUnique,
            message: 'Пользователь с такой почтой уже зарегистрирован',
        }, {
            validator: validateEmail,
            message: 'Некорректный почтовый адрес'
        }]
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: validatePasswordLength,
            message: "Длина пароля должна быть больше 8 символов"
        }
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
    history: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    isActivated: {
        type: Boolean,
        required: true,
        default: false
    },
    activationLink: {
        type: String,
        required: true,
    },
    phone: String,
    additionalPhone: String,
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