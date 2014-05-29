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
                if (Notes.find().count()) {
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
        if(Meteor.loggingIn()) {
            this.render('notes');
        } else {
            this.render('accessDenaid');
            pause();
            if(Meteor.loggingIn()) {
                this.render('notes');
            }
        }
    }
};

// Redirect
var redirect = function(pause) {
    if(Meteor.user()) {
        this.subscribe('notes');
    }
};

Router.onBeforeAction('loading');
Router.onBeforeAction(function(){
        $('body').scrollTop(0);
        Session.set('content', '');
});
Router.onBeforeAction(requireLogin, {only: ['writedown', 'edit', 'notes' ]});
