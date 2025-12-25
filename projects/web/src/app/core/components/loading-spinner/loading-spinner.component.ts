import { Component, Input } from '@angular/core';

@Component({
    standalone: false,
    selector: 'app-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent {
    @Input() imagesInThisPageLoaded: boolean = true;
    @Input() thisPagePreviouslyVisited: boolean = true;
    @Input() currentlyInThePageIEnteredFrom: boolean = true;

    @Input() showLoadingSpinnerExplanation: boolean = true;
    @Input() loadingSpinnerExplanation: string = 'Loading...';
}
