import { AfterContentChecked, Component, ElementRef, forwardRef, HostBinding, ViewEncapsulation, Output, Input, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-redactor',
  templateUrl: './redactor.component.html',
  styleUrls: ['./redactor.component.scss'],
  host: { 'class': 'redactor' },
  encapsulation: ViewEncapsulation.None
})
export class RedactorComponent {

  public editorValue: string = "";
  @Output()
  public editorChange: EventEmitter<string> = new EventEmitter();

  @Input()
  get editor() {
    return this.editorValue;
  }

  set editor(val) {
    this.editorValue = val;
    this.editorChange.emit(this.editorValue);
  }

  private _isActiveRedactor: boolean = false;

  public activateRedactor(redactorElement: HTMLElement): void {
    const $redactorElement: JQuery = $(redactorElement);
    let self = this;
    if (!this._isActiveRedactor) {

      this._isActiveRedactor = true;
      /* tslint:disable */
      $redactorElement.redactor({
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
          self.editor = this.code.get();
          self._deactivateRedactor($redactorElement);
        },
        lang: 'en',
        buttons: ['html', 'bold', 'italic', 'unorderedlist', 'orderedlist', 'link', 'file', 'video', 'image'],
        plugins: ['video', 'videoLibrary', 'imageLibrary', 'file'],
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
    const $redactorElement: JQuery = $(redactorElement);

    if (this._isActiveRedactor) {
      this._isActiveRedactor = false;
      $redactorElement.redactor('core.destroy');
    }
  }
}
