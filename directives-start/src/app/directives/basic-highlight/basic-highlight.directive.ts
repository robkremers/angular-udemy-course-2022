import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]'
})
/**
 * This class will provide a static color.
 */
export class BasicHighlightDirective implements OnInit {

  /**
   * 
   * @param elementRef The element the directive is placed on.
   */
  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
    this.elementRef.nativeElement.style.color = 'yellow';
  }

}
