import { Ingredient } from "../shared/ingredient.model";

/**
 * Okay: apparently the course leader does not want to use getters / setters.
 * 
 * Functionality:
 * - The imagePath will contain a url to an image.
 */
export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}