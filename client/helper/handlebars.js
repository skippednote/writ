Handlebars.registerHelper('format_date', function(input) {
    return moment(input).fromNow();
});
