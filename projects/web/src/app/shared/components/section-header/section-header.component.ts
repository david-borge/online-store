import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
  encapsulation: ViewEncapsulation.None,  // Para que el CSS se aplique correctamente a sectionHeaderTitleInnerHTML
})
export class SectionHeaderComponent {

  // Propiedades - Section Header - Title
  @Input() sectionHeaderTitleTag   :string = '';
  @Input() sectionHeaderTitleClass :string = '';
  @Input() sectionHeaderTitleText  :string = '';
  sectionHeaderTitleInnerHTML      :string = '';

  // Propiedades - Section Header - Right Side - Carousel Icons
  @Input() sectionHeaderCarouselIcons :boolean = false;

  // Propiedades - Section Header - Link
  @Input() sectionHeaderLink     :boolean = false;
  @Input() sectionHeaderLinkURL  :string  = '';
  @Input() sectionHeaderLinkText :string  = '';
  
  // Propiedades - Section Header - Button
  @Input() sectionHeaderButton     :boolean = false;
  @Input() sectionHeaderButtonURL  :string  = '';
  @Input() sectionHeaderButtonText :string  = '';

  // TODO:
  numberOfOrders :number = 2;


  constructor(
    public router: Router,
  ) {}
  ngOnInit(): void {
    this.sectionHeaderTitleInnerHTML = '<' + this.sectionHeaderTitleTag + ' class="' + this.sectionHeaderTitleClass + '">' + this.sectionHeaderTitleText + '</' + this.sectionHeaderTitleTag + '>';
  }

}
