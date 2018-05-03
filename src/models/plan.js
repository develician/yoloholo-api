const mongoose = require('mongoose');

const { Schema } = mongoose;

const DetailPlan = new Schema({
    numberOfDay: Number,
    destinationName: String,
    alarmTime: Date,
    latitude: String,
    longitude: String,
    placeID: String
});

const Plan = new Schema({
    username: String,
    title: String,
    departDate: Date,
    arriveDate: Date,
    numberOfDays: Number,
    selectedDateArray: [Date],
    createdAt: {
        type: Date,
        default: Date.now
    },
    detailPlan: [DetailPlan]
});






module.exports = mongoose.model('Plan', Plan);