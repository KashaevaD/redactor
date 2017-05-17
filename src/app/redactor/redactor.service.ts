import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class RedactorService {

  public changeEditingItem$: Observable<string>;
  public textPlaceholder: string = 'Type possibility text here';

  private _isActiveRedactor: boolean = false;
  private _isModalOpen: boolean = false;
  private _changeEditingItem$$: Subject<string>;


  public constructor() {
    this._changeEditingItem$$ = new Subject();
    this.changeEditingItem$ = this._changeEditingItem$$.asObservable();
  }

  public activateRedactor(redactorElement: JQuery): void {
    const self: RedactorService = this;

    if (!this._isActiveRedactor) {
      this._isActiveRedactor = true;
      /* tslint:disable */
      redactorElement.redactor({
        initCallback: function () {
          if (!this.focus.isFocused()) {
            this.focus.setEnd();
          }
        },
        modalOpenedCallback: function (event) {
          self._isActiveRedactor = false;
        },
        modalClosedCallback: function () {
          self._isActiveRedactor = true;
        },
        blurCallback: function (event) {
          self._changeEditingItem$$.next(this.code.get());
          self._deactivateRedactor(redactorElement);
        },
        lang: 'en',
        buttons: ['html', 'bold', 'italic', 'unorderedlist', 'orderedlist', 'link', 'file', 'video', 'image'],
        plugins: ['video', 'videoLibrary', 'imageLibrary', 'file'],
        placeholder: self.textPlaceholder,
        imageUpload: 'https://api.studytube-dev.nl/authoring-tool/courses/511/images.json',

        imageGetJson: 'https://api.studytube-dev.nl/authoring-tool/courses/511/images.json',
        fileUpload: 'https://api.studytube-dev.nl/authoring-tool/courses/511/attachments.json',
        videoUpload: 'https://api.studytube-dev.nl/authoring-tool/courses/511/videos.json',

        uploadFileFields: { 'X-Token': 'bddb48bfa8d11e5c68d8d4e6a62b88' },
        uploadImageFields: { 'X-Token': 'bddb48bfa8d11e5c68d8d4e6a62b88' },
        focus: false
      });
      /* tslint:enable */
    }
  }

  private _deactivateRedactor(redactorElement: JQuery): void {
    if (this._isActiveRedactor) {
      this._isActiveRedactor = false;
      redactorElement.redactor('core.destroy');
    }
  }
}