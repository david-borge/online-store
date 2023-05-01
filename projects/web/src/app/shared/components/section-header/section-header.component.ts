import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
  encapsulation: ViewEncapsulation.None,  // Para que el CSS se aplique correctamente a los elementos del DOM que son generados dinámicamente (sectionHeaderTitleInnerHTML)
})
export class SectionHeaderComponent implements OnChanges {

  // Propiedades - Section Header - Title
  @Input() sectionHeaderTitleTag     :string = '';
  @Input() sectionHeaderTitleClasses :string = '';
  @Input() sectionHeaderTitleText    :string = '';
  sectionHeaderTitleInnerHTML        :string = '';

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
  
  // ngOnChanges Lifecycle hook: se ejecuta al crear una instancia del Componente, y también, cuando cambie una de las propiedades con (@output) o con @Input. Es el único Lifecycle hook que recibe un parámetro
  ngOnChanges(): void {

    // IMPORTANTE: esto tiene que estar en ngOnChanges(), no en ngOnInit() para que se detecten los cambios a sectionHeaderTitleText
    this.sectionHeaderTitleInnerHTML = '<' + this.sectionHeaderTitleTag + ' class="' + this.sectionHeaderTitleClasses + '">' + this.sectionHeaderTitleText + '</' + this.sectionHeaderTitleTag + '>';

    // Comprobacion
    // console.log('sectionHeaderTitleText: ' + this.sectionHeaderTitleText);

  }

}
