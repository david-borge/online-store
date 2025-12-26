import { Component, Input } from '@angular/core';

@Component({
    standalone: false,
    selector: 'app-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent {
    @Input() imagesInThisPageLoaded = true;
    @Input() thisPagePreviouslyVisited = true;
    @Input() currentlyInThePageIEnteredFrom = true;

    @Input() showLoadingSpinnerExplanation = true;
    @Input() loadingSpinnerExplanation = 'Loading...';
}
