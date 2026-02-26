import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';
import { SharedModule } from '@shared/shared.module';

@Component({
    standalone: true,
    imports: [SharedModule],
    template: `
        <img appImageLoadDirective src="" alt="" />
    `,
})
class TestHostComponent {}

describe('ImageLoadDirective', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
        }).compileComponents();
    });

    it('should create an instance', () => {
        const fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('img')).toBeTruthy();
    });
});
