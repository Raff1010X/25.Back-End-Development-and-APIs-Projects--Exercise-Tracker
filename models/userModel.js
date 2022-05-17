const mongoose = require('mongoose');

//+ Schema for user model
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'A user must have a name'],
            unique: true,
            trim: true,
            maxlength: [
                40,
                'A user name must have less or equal then 40 characters',
            ],
            minlength: [
                4,
                'A user name must have more or equal then 10 characters',
            ],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

userSchema.set('toJSON', {
    virtuals: true,
    strictPopulate: false,
    transform: (doc, ret) => {
        delete ret.id;
        delete ret.__v;
    },
});

// add virtual Log property populated from Exercise collection
userSchema.virtual('log', {
    ref: 'Exercise',
    localField: '_id',
    foreignField: 'user_id',
    justOne: false,
    options: {
        select: 'description duration date -user_id',
    },
});

// filter log by date range and limit
userSchema.methods.filterLogByQuery = function (query) {
    let { from, to, limit } = query;

    if (from) from = new Date(from);
    else from = new Date(0);

    if (to) to = new Date(new Date(to).getTime() + 86400000);
    else to = Date.now();

    if (limit) limit = limit * 1;
    else limit = 1000000;

    this.log = this.log
        .filter((log) => {
            return log.date >= from && log.date <= to;
        })
        .slice(0, limit);
    return this;
};

// add virtual count property based on Log collection length
userSchema.virtual('count').get(function () {
    if (this.log) return this.log.length;
    else return undefined;
});

userSchema.pre(/^findOne/, function (next) {
    this.populate('log');
    next();
});

module.exports = mongoose.model('User', userSchema);
