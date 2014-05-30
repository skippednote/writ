Template.writedown.events({
  'keyup #content': function(e) {
    setTimeout(function(){
      e.preventDefault();
      var content = $(e.target).val();
      Session.set('content', '');
      Session.set('content', content);
    },100)
  }
});

Template.writedown.rendered = function() {
  $('section').each(function() {
    $(this).find('.fullscreen').click(function() {
      if($(this).parent().hasClass('editor')) {
        $('.markdown-area').removeClass('fullscreen-preview');
        $('.markdown-area').toggleClass('fullscreen-editor');
      } else {
        $('.markdown-area').removeClass('fullscreen-editor');
        $('.markdown-area').toggleClass('fullscreen-preview');
      }
    });
  });
}

Template.writedown.events({
    'click .post-note': function(e) {
        e.preventDefault();

        var noteEntry = {
            title: $(e.target).parent().parent().find('#title').val(),
            note: $('#content').val(),
            date: Date.now(),
            updated: Date.now(),
            public: $(e.target).parent().parent().find('#private:checked').length,
            author: Meteor.userId(),
            noteCall: function() {
                return this.note;
            }
        };

        Notes.insert(noteEntry);
        Router.go('notes');
        FlashMessages.sendSuccess("Post has been created.");
    }
});
