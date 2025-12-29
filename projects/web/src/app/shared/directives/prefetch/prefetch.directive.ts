// Apartado 20.9. Pre-fetch: hacer las llamadas HTTP lo antes posible, no justo cuando vaya a necesitar los datos: https://timdeschryver.dev/blog/making-your-application-feel-faster-by-prefetching-data-with-ngrx
// Proceso de carga de una página: Paso 2.1. Con pre-fetch, hacer una HTTP Request a la API de Backend para descargar datos desde la Base de Datos. Ver projects\web\src\app\shared\directives\prefetch.directive.ts, projects\web\src\app\core\components\footer\footer.component.ts, projects\web\src\app\core\components\footer\footer.component.html y projects\web\src\app\core\services\prefetch\prefetch.service.ts

import { isPlatformBrowser } from '@angular/common';
import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    InjectionToken,
    Input,
    OnDestroy,
    OnInit,
    Output,
    inject,
} from '@angular/core';
import { PLATFORM_ID } from '@angular/core';

@Directive({ standalone: false, selector: '[appPrefetch]' })
export class PrefetchDirective implements OnInit, AfterViewInit, OnDestroy {
    private elemRef = inject(ElementRef);
    private platformId = inject<InjectionToken<object>>(PLATFORM_ID);

    @Input() prefetchMode: ('LOAD' | 'HOVER' | 'VISIBLE')[] = ['VISIBLE'];
    @Output() appPrefetch = new EventEmitter<void>();

    observer = {} as IntersectionObserver;
    loaded = false;

    ngOnInit(): void {
        if (this.prefetchMode.includes('LOAD')) {
            this.prefetchData();
        }
    }

    ngAfterViewInit() {
        // Comprobar si estoy en el navegador (el código de dentro del if NO se ejecuta en el servidor para evitar errores en SSR o pre-render)
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.prefetchData();
                        this.observer.disconnect();
                    }
                });
            });

            this.observer.observe(this.elemRef.nativeElement);
        }
    }

    ngOnDestroy(): void {
        // Comprobar si estoy en el navegador (el código de dentro del if NO se ejecuta en el servidor para evitar errores en SSR o pre-render)
        if (isPlatformBrowser(this.platformId)) {
            if (this.observer) {
                this.observer.disconnect();
            }
        }
    }

    @HostListener('mouseenter')
    onMouseEnter() {
        if (!this.loaded && this.prefetchMode.includes('HOVER')) {
            this.loaded = true;
            this.prefetchData();
        }
    }

    prefetchData() {
        // Comprobar si estoy en el navegador (el código de dentro del if NO se ejecuta en el servidor para evitar errores en SSR o pre-render)
        if (isPlatformBrowser(this.platformId)) {
            // FIXME: Property 'connection' does not exist on type 'Navigator'. Aunque el pre-fetch funciona igual.
            // if (navigator.connection.saveData) {
            //     return undefined;
            // }

            this.appPrefetch.next();
        }
    }
}
