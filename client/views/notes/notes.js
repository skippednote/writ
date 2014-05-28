Template.notes.helpers({
    notes: function() {
        var users = Meteor.userId();
        return Notes.find({author: users});
    }
});
