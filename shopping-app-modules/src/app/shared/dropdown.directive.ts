import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
/**
 * Purpose:
 * Add a certain css class to the element it sits on once it is clicked and remove it if it is clicked again.
 * So:
 * - Implement clicks
 * - Toggle via a caret
 * - Choose one of the items.
 * 
 * In this case no @Input() variable needs to be defined.
 */
export class DropdownDirective {
  /**
   * HostBinding functionality:
   * We can pass a string, defining to which (css) property of the hosting element we want to bind.
   * We are binding to the DOM property.
   * 
   * Of course the element should be available on the element.
   * The variable isOpen should be bound to class.open.
   * - If true: the dropdown list will switch open.
   * - If false: the dropdown list will close.
   * Example:
   * <div class="btn-group open"> in recipe-detail.component.html.
   */
  @HostBinding('class.open') isOpen: boolean = false;

  constructor() { }

  /**
   * Purpose:
   * The @HostListener is triggered when an element is clicked. This will cause the boolean isOpen to be (re)set.
   * 
   * Functionality:
   * @HostListener is triggered when some event occurs. This is specified as input parameter.
   * In this case 'click' is used as event.
   * 
   * Note: isOpen is via @HostBinding linked to class.open. See above code.
   */
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }

}
