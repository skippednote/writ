Notes = new Meteor.Collection('notes');

Notes.allow({
    'insert': function(userId, doc) {
        return !!userId;
    },
    'update': function(userId, doc) {
        return !!userId;
    },
    'remove': function(userId, doc) {
        return !!userId;
    }
});
