Handlebars.registerHelper('session', function(input) {
    return Session.get(input);
});
