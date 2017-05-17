import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public object = {
    body: '',
    answer: 'Answer',
    feedback: 'Fedddfg'
  };

  public constructor() { }

  public showObject(): void {
    console.log(this.object);
  }
}


