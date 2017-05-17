if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.imageLibrary = function() {
  return {
    init: function () {
      // remove original 'image' button
      this.button.remove('image');

      var button = this.button.add('image', 'Image Library');
      this.button.addCallback(button, this.imageLibrary.showImageUploadModal);

      this.image.setFloating = function ($image) {
        var floating = $('#redactor-image-align').val();

        $image.removeClass();

        switch (floating) {
          case 'left':
            $image.addClass('move-left');
            break;
          case 'right':
            $image.addClass('move-right');
            break;
          case 'center':
            $image.addClass('move-center');
            break;
        }
      };
    },
    showImageUploadModal: function() {
      var self = this;

      this.selection.save();

      this.modal.addTemplate('modal-image', this.imageLibrary.getTemplateModalImage());
      this.modal.load('modal-image', 'Image Library', 610);
      this.modal.show('modal-image');

      this.upload.init('#redactor-file-area', this.opts.imageUpload, function(result) {
        // error callback
        if (result.error) {
          self.modal.close();
          self.selection.restore();
          alertify.error('Error during upload. ' + result.error);
          return;
        }

        self.imageLibrary.insertImage(result.large, result.big, '');
      });
    },
    insertImage: function (path_img_show, path_img_link, title) {
      var html =  this.imageLibrary.getTemplateImage();
      html = html.replace('{path_img_show}', path_img_show);
      html = html.replace('{path_img_link}', path_img_link);
      html = html.replace('{title}', title);
      if (this.opts.paragraphy) html = '<p>' + html + '</p>';
      this.selection.restore();
      this.insert.html(html);

      //alertify.log(' Your image is being processed.<br/>This may take several minutes depending on the length of the image.');

      this.modal.close();
    },
    getTemplateModalImage: function() {
      return '<section>'
          + '<form id="redactorInsertImageForm" method="post" action="" enctype="multipart/form-data">'
          + '<div id="redactor_tab1" class="redactor-tab redactor-tab1">'
          + '<div id="redactor-file-area"></div>'
          + '</div>'
          + '</form>';
    },

    getTemplateImage: function() {
      return '<a class="fancybox" href="{path_img_link}"> <img src="{path_img_show}" alt="{title}"/></a>';
    }

  };
};
