const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema(
    {
        full_name: String,
        email: { type: String, unique: true, required: true, lowercase: true, trim: true },
        password: String,
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        google_id: String,
        phone: String,
        country: String,
    },
    { timestamps: true }
);

schema.pre('save', async function () {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

schema.methods.matchPassword = function (plain) {
    return this.password ? bcrypt.compare(plain, this.password) : false;
};

schema.set('toJSON', {
    transform: (_doc, ret) => {
        delete ret.password;
        return ret;
    },
});

module.exports = mongoose.model('User', schema);