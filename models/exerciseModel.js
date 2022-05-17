const mongoose = require('mongoose');

//+ Schema for user model
const exerciseSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'An exercise must belong to a user'],
        },
        description: {
            type: String,
            trim: true,
            required: [true, 'A exercise must have a description'],
            maxlength: [
                200,
                'A exercise description must have less or equal then 200 characters',
            ],
            minlength: [
                2,
                'A exercise description must have more or equal then 2 characters',
            ],
        },
        duration: {
            type: Number,
            required: [true, 'A exercise must have a duration'],
            min: [1, 'A exercise durration must be more or equal then 1'],
            max: [1000, 'A exercise durration must be less or equal then 1000'],
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
exerciseSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        if (ret.username) ret.username = ret.username.username;
        ret.date = ret.date.toDateString();
        ret._id = ret.user_id;
        delete ret.user_id;
        delete ret.id;
        delete ret.__v;
    },
});

// virtual username property populated from User collection using user_id
exerciseSchema.virtual('username', {
    ref: 'User',
    localField: 'user_id',
    foreignField: '_id',
    justOne: true,
});

// pre create populate username property
exerciseSchema.pre('save', async function (next) {
    await this.populate('username');
    next();
});

module.exports = mongoose.model('Exercise', exerciseSchema);
