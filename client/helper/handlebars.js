Handlebars.registerHelper('format_date', function(newDate, updatedDate) {
    if ( newDate > updatedDate) {
        return moment(newDate).fromNow();
    } else {
        return moment(updatedDate).fromNow();
    }
});
