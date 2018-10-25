var Note = require("../models/note");
var makeDate = require("../scripts/data");

module.exports = {
    get: function(data, cb) {
        Note.find({
            _headlineId: date._id
        }, cb);
    },
    save: function(date, cb) {
        var newNote = {
            _headlineId: date._id,
            date: makeDate(),
            noteText: data.noteText
        };
        Note.create(newNote, function e(rr, doc) {
           if (err) {
               console.log(err);
           }
           else {
               console.log(doc);
               cb(doc);
           }
        });
    },
    delete: function(data, cb) {
        Note.remove({
            _id: data._id
        }, cb);
    }
};  