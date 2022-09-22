import { 
    Component, 
    OnInit, 
    Input, 
    OnChanges, 
    SimpleChanges, 
    DoCheck, 
    AfterContentInit, 
    AfterContentChecked, 
    AfterViewInit, 
    AfterViewChecked, 
    OnDestroy, 
    ViewChild, 
    ElementRef,
    ContentChild} from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, 
OnChanges, 
DoCheck, 
AfterContentInit, 
AfterContentChecked,
AfterViewInit,
AfterViewChecked,
OnDestroy {
  /**
   * {}: JS for defining the element to enforce that an element may only have this type.
   * 
   * The decorator @Input will make the property receive data from the parent component.
   * Here also an alias is used: 'srvElement', because this is the name of the element in app.component.html.
   */
  @Input('srvElement') public element: { type: string, name: string, content: string };
  @Input() name: string;
  // 76. Getting Access to the Template & DOM with @ViewChild
  @ViewChild('heading', {static: true}) header: ElementRef;
  // 82. Getting Access to ng-content with @ContentChild.
  @ContentChild('contentParagraph') paragraph: ElementRef;

  constructor() {
    console.log('ServerElementComponent constructor() called.');
   }

   /**
    * This is the only LifeCycle hook that receives an argument.
    * In this case changes, of type SimpleChanges, contains the above declared element.
    */
   ngOnChanges(changes: SimpleChanges) {
    console.log('ServerElementComponent ngOnChanges() called.');
    console.log(changes);
   }

   /**
    * Check on emptiness of a value:
    * https://flaviocopes.com/how-to-check-undefined-property-javascript/
    * 
    */
  ngOnInit(): void {
    console.log('ServerElementComponent ngOnit() called.');
    console.log("ServerElementComponent: ngOnInit()): Textcontent: " + this.header.nativeElement.textContent);
    if (typeof this.paragraph === 'undefined' ) {
      console.log('ServerElementComponent: ngOnInit()): Textcontent of paragraph: Empty');
    } else {
      console.log('ServerElementComponent: ngOnInit()): Textcontent of paragraph: ' + this.paragraph.nativeElement.textContent);
    }
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called.');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called.');
    console.log('ServerElementComponent: ngOnInit()): Textcontent of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called.');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called.');
    console.log("ServerElementComponent: ngAfterViewInit()): Textcontent: " + this.header.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called.');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called.');
  }
}
