if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.videoLibrary = function() {

  var VIMEO_IFRAME_TEMPLATE = '<p class="player"><iframe id="player_{rid}" src="//player.vimeo.com/video/{id}" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></p>',
    INSERT_VIDEO_MODAL_TEMPLATE = '<section>'
      + '<form id="redactorInsertVideoForm" method="post" action="" enctype="multipart/form-data">'
      + '<div id="redactor_tab1" class="redactor-tab redactor-tab1">'
      + '<label>Title</label>'
      + '<input id="title" class="redactor_input">'
      + '<label>Video</label>'
      + '<div id="redactor-file-area"></div>'
      + '</div>'
      + '</form>'

      + '<div id="redactor_tab2" class="redactor-tab redactor-tab2" style="display: none;">'
      + '<p><strong>{description}<br/>All other sources will be removed when saving this item.</strong><p>'
      + '<div class="cgroup cgroup--stacked">'
      + '<label class="cgroup__label">Video Embed Code</label>'
      + '<textarea id="redactor-insert-video-area" style="width: 100%; height: 160px;"></textarea>'
      + '</div>'
      + '<div class="cgroup is-right-aligned">'
      + '<button name="upload" class="button" id="redactor-upload-btn">Insert</button>'
      + '</div>'
      + '</div>'
      + '</section>';


  return {
    description: 'You can only embed code from youtube.com, vimeo.com, dailymotion.com, and prezi.com',

    init: function () {
      var button = this.button.add('video', 'Video Library');
      this.button.addCallback(button, this.videoLibrary.showVideoUploadModal);
    },

    showVideoUploadModal: function() {
      var self = this;

      this.selection.save();

      this.modal.addTemplate('modal-video', INSERT_VIDEO_MODAL_TEMPLATE.replace('{description}', this.videoLibrary.description));
      this.modal.load('modal-video', 'Video Library', 610);
      this.modal.show('modal-video');

      var $modal = this.modal.getModal();
      this.modal.createTabber($modal);
      this.modal.addTab(1, 'Upload video', 'active');
      this.modal.addTab(2, 'Embed Video Code');

      var $tabBox1 = $('<div class="redactor-tab redactor-tab1">');
      var $tabBox2 = $('<div class="redactor-tab redactor-tab2">').hide();

      $modal.append($tabBox1);
      $modal.append($tabBox2);

      this.upload.init('#redactor-file-area', this.opts.videoUpload, function(result) {
        // error callback
        if (result.error) {
          self.modal.close();
          self.selection.restore();
          alertify.error('Error during upload. ' + result.error);
          return;
        }

        self.videoLibrary.insertVideo(result.videoId);
      });

      $('#title').change(function() {
        self.uploadOptions.uploadFields.title = $(this).val();
      });

      $('#redactor-upload-btn').click(function() {
        $.proxy(self.video.insert, self)();
      });

    },

    insertVideo: function(vimeo_video_id) {
      var html = VIMEO_IFRAME_TEMPLATE.replace('{id}', vimeo_video_id);
      this.selection.restore();
      this.insert.html(html);

      alertify.log(' Your video is being processed.<br/>This may take several minutes depending on the length of the video.');

      this.modal.close();
    }
  };
};
