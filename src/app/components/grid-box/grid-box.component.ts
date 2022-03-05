import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-grid-box',
  templateUrl: './grid-box.component.html',
  styleUrls: ['./grid-box.component.scss'],
})
export class GridBoxComponent {
  public feedbackForm = new FormGroup({
    feedback: new FormControl(''),
    email: new FormControl(''),
  });

  public onSubmitFeedbackForm() {
    console.log(this.feedbackForm.value);
  }
}
