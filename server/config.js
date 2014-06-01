Meteor.startup(function() {
    Accounts.loginServiceConfiguration.remove({
        service: 'twitter'
    });

    Accounts.loginServiceConfiguration.insert({
        service: 'twitter',
        consumerKey: 'add consumerKey here',
        secret: 'add secret here'
    });
});
