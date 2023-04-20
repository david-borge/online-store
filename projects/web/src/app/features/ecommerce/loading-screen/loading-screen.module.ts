import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingScreenComponent } from './pages/loading-screen/loading-screen.component';



@NgModule({
  declarations: [
    LoadingScreenComponent
  ],
  imports: [
    CommonModule,
  ],

  // Exports: permite incluir un módulo dentro de otro. Exports se pone en el módulo que quiero insertar, no en el que lo voy a insertar.
  // Incluye los componentes del módulo que quiero insertar que deben estar disponibles en el módulo donde los voy a insertar.
  // IMPORTANTE: los módulos de Angular funcionan de manera independiente, es decir, no se comunican entre sí. Por ejemplo, si importo un Component en un Module, solo puedo usar ese Component en ese Module, pero no en otros Modules.
  // IMPORTANTE: si tengo un nombreModulo-routing.module.ts con las rutas de este módulo, no hace falta exportar los componentes definidos en los imports.
  exports: [
    LoadingScreenComponent,  // Esto hace que LoadingScreenComponent esté disponible en EcommerceModule. A su vez, en EcommerceModule, lo vuelvo a exportar para que esté disponible en AppModule.
  ],

})
export class LoadingScreenModule { }
