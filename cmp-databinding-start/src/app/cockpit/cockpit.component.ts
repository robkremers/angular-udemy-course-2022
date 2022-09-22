import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  /**
   * EventEmitter is a generic type, indicated by the diamond '<>'.
   * 
   * Here the event data will be sent out of the component to the parent component. 
   * An @Output() must have the type of EventEmitter.
   * The @Output() content will be sent to the parent, i.e. app.component.
   * 
   * In the second attribute 'bpCreated' is an alias used in cockpit.component.ts.
   */
  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  // newServerName = '';
  // newServerContent = '';

  /**
   * The use of @ViewChild.
   * This gives access to the DOM and the variables / attributes in the html-template.
   * Circumvents the use of input parameters for the class methods.
   */
  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;

  constructor() {}

  ngOnInit() { }

  onAddServer(nameInput: HTMLInputElement) {
    /**
     * The input will be: serverNameInput: [object HTMLInputElement]
     * See The Developer Tool | Console for the log result.
     */
    // console.log("serverNameInput: " + nameInput);
    // console.log("serverNameInput.value: " + nameInput.value);
    /**
     * serverContentInput is of type: Object.
     */
    // console.log("serverContentInput: " + this.serverContentInput);
    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }
}