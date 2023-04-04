import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  // Propiedades - Footer - Navigation CTAs & Copy
  @Input() navigationShowCtasAndCopy :boolean = false;
  
  // Propiedades - Footer - Navigation CTAs & Copy - Navigation Copy
  @Input() navigationCopyLabel :string = '';
  @Input() navigationCopyPrice :string = '';
  
  // Propiedades - Footer - Navigation CTAs & Copy - Navigation Button Right
  @Input() navigationButtonRightText :string = '';

}
