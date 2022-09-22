import { Directive, OnInit, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appEvenBetterHighlight]'
})
/**
 * This class will provide a color dynamically when the mouse hovers over the element.
 * Used: Renderer2 and HostListener.
 * 
 */
export class EvenBetterHighlightDirective implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    // this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'yellow');
  }

  /**
   * Purpose:
   * Change the background color when a mouse hovers over the element.
   * 
   * Functionality:
   * @HostListener is triggered when some event occurs. This is specified as input parameter.
   * In this case 'mouseenter' is used as event.
   */
  @HostListener('mouseenter') mouseOver(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'yellow');
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'black');
  }

}
