if (!RedactorPlugins) var RedactorPlugins = {};

(function($)
{
  RedactorPlugins.video = function()
  {
    return {
      insert: function()
      {
        var data = $('#redactor-insert-video-area').val();
        this.selection.restore();
        this.modal.close();

        var current = this.selection.getBlock() || this.selection.getCurrent();

        if (current) {
          $(current).after(data);
        }
        else
        {
          this.insert.html(data);
        }

        this.code.sync();
      }

    };
  };
})(jQuery);
