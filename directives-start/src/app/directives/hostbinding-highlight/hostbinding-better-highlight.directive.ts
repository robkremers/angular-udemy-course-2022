import { Directive, OnInit, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appHostbindingBetterHighlight]'
})
/**
 * 97. Using HostListener to Listen to Host Events.
 * 98. Using HostBinding to Bind to Host Properties.
 */
export class HostbindingBetterHighlightDirective implements OnInit {
  @Input() defaultBackgroundColor: string = 'transparent';
  @Input() highlightBackgroundColor: string = 'blue';

  @Input() defaultLetterColor: string = 'black';
  @Input() highlightLetterColor: string = 'yellow';
  /**
   * HostBinding functionality:
   * We can pass a string, defining to which property of the hosting element we want to bind.
   * We are binding to the DOM property.
   * 
   * Of course the element should be available on the element.
   */
  @HostBinding('style.backgroundColor') backgroundColor: string;
  @HostBinding('style.color') letterColor: string  = 'black';

  constructor() { }

  ngOnInit(): void {
    this.backgroundColor = this.defaultBackgroundColor;
    this.letterColor = this.defaultLetterColor;
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
    this.backgroundColor = this.highlightBackgroundColor;
    this.letterColor = this.highlightLetterColor;
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
    this.backgroundColor = this.defaultBackgroundColor;
    this.letterColor = this.defaultLetterColor;
  }
}
