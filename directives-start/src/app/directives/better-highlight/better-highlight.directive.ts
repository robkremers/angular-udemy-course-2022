import { Directive, OnInit, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
/**
 * This class will provide a static color, but using a better method: using Renderer2.
 */
export class BetterHighlightDirective implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'yellow');
  }
}
