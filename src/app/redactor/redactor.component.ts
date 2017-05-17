import { AfterContentChecked, Component, ElementRef, forwardRef, HostBinding, ViewEncapsulation, Output, Input, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { RedactorService } from './redactor.service';


@Component({
  selector: 'app-redactor',
  templateUrl: './redactor.component.html',
  styleUrls: ['./redactor.component.scss'],
  host: { 'class': 'redactor' },
  encapsulation: ViewEncapsulation.None
})
export class RedactorComponent {

  public redactorElement: JQuery;

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

  public constructor(
    private _elementRef: ElementRef,
    private _redactorService: RedactorService,
  ) { }

  public activateRedactor(idOfElement: string): void {
    this.redactorElement = $(this._elementRef.nativeElement).find(`#${idOfElement}`);
    this._redactorService.activateRedactor(this.redactorElement);
    this._redactorService.changeEditingItem$
      .subscribe((resultDataFromRedactor: string) => {
        // debugger;
        // console.log(resultDataFromRedactor);
        this.editor = resultDataFromRedactor;
      });
  }


}
