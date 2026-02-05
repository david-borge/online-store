import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { AccountCardComponent } from './account-card.component';

describe('AccountCardComponent', () => {
    let component: AccountCardComponent;
    let fixture: ComponentFixture<AccountCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccountCardComponent],
            imports: [RouterModule.forRoot([])],
        }).compileComponents();

        fixture = TestBed.createComponent(AccountCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
