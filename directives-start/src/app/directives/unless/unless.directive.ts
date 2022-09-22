import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
/**
 * Purpose:
 * The UnlessDirective creates an embedded view from the Angular-generated <ng-template> 
 * and inserts that view in a view container adjacent to the directive's original <p> host element.
 * 
 * Functionality:
 * - TemplateRef      : allows access to the <ng-template> contents.
 *                      Represents an embedded template that can be used to instantiate embedded views. 
 *                      To instantiate embedded views based on a template, use the ViewContainerRef method createEmbeddedView().
 *                      - Determines what will be shown.
 * - ViewContainerRef : allows access to the view.
 *                      Represents a container where one or more views can be attached to a component.
 *                      - Determines how it will be shown.
 * 
 * Documentation:
 * - https://angular.io/guide/structural-directives#creating-a-structural-directive
 * - https://angular.io/guide/template-syntax
 * 
 */
export class UnlessDirective {
  hasView: boolean = false;

  constructor(
    /**
     * TemplaeRef gives access to a Template.
     */
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  /**
   * Angular sets the appUnless property whenever the value of the condition changes.
   * If the condition is false and Angular hasn't created the view previously, 
   * the setter causes the view container to create the embedded view from the template.
   * If the condition is true and the view is currently displayed, the setter clears the container, which disposes of the view.
   * 
   * 'set' turns the property into a method.
   * 
   * @Input() is used because Property Binding is being used.
   * The name of the method needs to be the same the name of the selector. Otherwise it will not be a known property.
   * Reason: we try to bind to the selector, via Property Binding.
   * 
   */
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
        this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
        this.viewContainer.clear();
    }
  }

}
