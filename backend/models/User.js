const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    password: { type: String, required: true },
    bio: { type: String, default: "This user has not set a bio yet.", trim: true },
    skillsToTeach: [{ type: String, trim: true }],
    skillsToLearn: [{ type: String, trim: true }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);