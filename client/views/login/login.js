Template.login.events({
    'click .sign-out': function() {
        Meteor.logout();
        Router.go('home');
        FlashMessages.sendWarning("You have signed out.");
    },

    'click .sign-in': function() {
        Meteor.loginWithTwitter(function() {
            Router.go('notes');
            FlashMessages.sendSuccess("You have signed in.");
        });
    }
});
