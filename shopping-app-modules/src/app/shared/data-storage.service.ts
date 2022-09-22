import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

/**
 * 281. Setting Up the DataStorage Service.
 * 
 * @Injectable is normally optional, but it is required if injecting another service.
 */
@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    private firebaseUrl: string = 'https://ng-course-recipe-book-375da-default-rtdb.europe-west1.firebasedatabase.app/';
    private firebasePostEndpoint: string = 'recipes.json';

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ) { }

    /**
     * 282. Storing Recipes.
     * In this case no response will be set up: the website user is not interested in this information.
     * Also not post but put is used because all saved data will be updated.
     */
    storeRecipes() {
        const recipes: Recipe[] = this.recipeService.getRecipes();
        this.http.put(
            this.firebaseUrl + this.firebasePostEndpoint,
            recipes)
            .subscribe(
                response => {
                    console.log(response);
                }
            );
    }

    /**
     * 283. Fetching Recipes.
     * 
     * If now button 'Fetch Data' is clicked we see an array with the saved recipes in Developer Tool | Console.
     * 
     * 284. Transforming Response Data.
     * Now a potential bug is fixed:
     * If for a given recipe no ingredients have been given the recipe in the Firebase db will have no ingredients array.
     * This will be fixed by passing on an empty Ingredients array.
     * For this rxjs map() and not tap() is used since the data will be changed.
     * The result of the action is that the presented recipes will always have an ingredients array.
     * 
     * 302. Adding the Token to Outgoing Requests.
     * 
     * 303. Attaching the token with an interceptor.
     * 
     * Before this functionality is executed Interceptor AuthInterceptorService will add the authentication token
     * that has been provided by Firebase when logging in.
     * 
     */
    fetchRecipes() {
        return this.http.get<Recipe[]>(
            this.firebaseUrl + this.firebasePostEndpoint
        ).pipe(
            // The map operator will apply a function to that data and return the result
            map(recipes => {

                return recipes.map(recipe => {
                    // Below the JS spread operator is used.
                    console.log('DataStorageService.fetchRecipes:')
                    console.log(recipe);
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),
            // The tap operator takes a data, apply a function to that data but returns the original data, 
            // if the function bothered to return a result, tap just ignores it
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        );
    }
}