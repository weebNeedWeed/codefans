import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  private _show = new BehaviorSubject<boolean>(false);

  getStatus() {
    return this._show;
  }

  setStatus(status: boolean) {
    this._show.next(status);
  }
}
