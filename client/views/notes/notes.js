Template.notes.helpers({
    notes: function() {
        var users = Meteor.userId();
        return Notes.find({author: users}, {sort: {updated: -1}});
    }
});

Template.notes.events({
    'click .note-delete': function(e) {
        e.preventDefault();
        if (confirm('Delete')) {
            var id = this
            Notes.remove(id._id, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    Router.go('notes');
                    FlashMessages.sendWarning("Post has been deleted.");
                }
            })
        }
    }
});
