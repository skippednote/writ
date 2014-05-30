Template.accessDenaid.events({
    'click .login-in': function() {
        Meteor.loginWithTwitter();
        Router.go('home');
    }
});
