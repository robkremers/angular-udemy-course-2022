import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private id: number;
  paramsSubscription: Subscription;
  /**
   * Purpose:
   * - Informs whether the instance is used for a new recipe or whether an existing recipe is to be edited.
   */
  editMode: boolean = false;
  // Rx = require('rxjs/Rx');

  constructor(private route: ActivatedRoute) { }

  /**
   * Again:
   * - id is the dynamic parameter in the route, as defined in app-routing.module.ts.
   * - this.editMode: the id will only be defined if the recipe exists and therefore has an id.
   *  - If the id exists this component will be used to edit the recipe with the id.
   *  - If the id is undefined this component will be used to create a new recipe.
   * 
   * this.editMode = params['id'] != null; // The choice of the course leader. Note '!=' vs '!=='
   */
  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] !== undefined;
        console.log('RecipeEditComponent.ngOnInit: edit mode = ' + this.editMode);
        // console.log(this.Rx.rev);   // undefined
        // console.log(this.Rx.version);
      }
    );
  }

  /**
   * For now Angular can take care about ending a subscription.
   * In future situations it will be necessary to do so as done below.
   */
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
