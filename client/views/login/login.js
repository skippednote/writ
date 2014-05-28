Template.login.events({
    'click .sign-out': function() {
        Meteor.logout();
        Router.go('home');
    },

    'click .sign-in': function() {
        Meteor.loginWithTwitter();
        Router.go('notes');
    }
});
