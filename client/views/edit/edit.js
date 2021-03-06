Template.edit.events({
  'keyup #content': function(e) {
    setTimeout(function(){
      e.preventDefault();
      var content = $(e.target).val();
      Session.set('content', '');
      Session.set('content', content);
    },100)
  }
});

Template.edit.rendered = function() {
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

  Meteor.startup(function() {
      setTimeout(function() {
          var content = $('#content').val();
          Session.set('content', content);
      }, 1000);
  });
};


Template.edit.events({
    'click .edit-note': function(e) {
        e.preventDefault();
        var thisNoteId = this._id;

        var noteEntry = {
            title  : $(e.target).parent().parent().find('#title').val(),
            note: $('#content').val(),
            updated: Date.now(),
            public : $(e.target).parent().parent().find('#private:checked').length
        };

        Notes.update(thisNoteId, {$set: noteEntry}, function(err) {
            if (err) {
                alert(err.reason);
            } else {
                Router.go('preview', {_id: thisNoteId});
                FlashMessages.sendInfo("Post has been updated.");
            }
        });
    },
    'click .delete-note': function(e) {
        e.preventDefault();
        if (confirm('Delete')) {
            var id = this
            Notes.remove(id._id, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    Router.go('notes');
                    FlashMessages.sendWarning("Post has been deleted.");
                }
            })
        }
    }
});
