Router.configure({
    layoutTemplate: 'application'
});

Router.map(function() {
    this.route('home', {path: '/'});

    this.route('writedown', {path: '/write'});

    this.route('notes', {
        waitOn: function() {
            return Meteor.subscribe('notes');
        }
    });

    this.route('preview', {
        path: '/notes/:_id',
        data: function() {
            return Notes.findOne(this.params._id);
        },
        waitOn: function() {
            return Meteor.subscribe('notes');
        }
    });

    this.route('edit', {
        path: '/notes/:_id/edit',
        data: function() {
            return Notes.findOne(this.params._id);
        },
        waitOn: function(pause) {
            if (!Meteor.user()) {
                    console.log('not');
                if (Notes.find().count()) {
                    console.log('not');
                    this.render('accessDenaid');
                    pause();
                }
            } else {
                return Meteor.subscribe('notes');
            }
        }
    });
});

// User checking
var requireLogin = function(pause) {
    if(!Meteor.user()) {
        this.render('accessDenaid');
        pause();
    }
};

Router.onBeforeAction(requireLogin, {only: ['writedown', 'edit', 'notes' ]});
