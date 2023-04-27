import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {

  @Input() imagesInThisPageLoaded        : boolean = true;
  @Input() thisPagePreviouslyVisited     : boolean = true;
  @Input() currentlyInThePageIEnteredFrom: boolean = true;

}
