import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

/**
 * 301. Reflecting the Auth State in the UI.
 * Here and in the html functionality is added in order to enable login.
 * 
 */
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated: boolean = false;
    private userSub: Subscription;

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            // this.isAuthenticated = !user ? false : true;
            this.isAuthenticated = !!user; // double negation.
        });
    }

    /**
     * 282. Storing Recipes.
     */
    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    /**
     * 283. Fetching Recipes.
     * 
     * 285. Resolving Data Before Loading.
     * Due to using the RecipesResolver class now 
     * this.dataStorageService.fetchRecipes() should be this.dataStorageService.fetchRecipes().subscribe();
     * However this is redundant.
     */
    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}