import { Component, Input, Output, EventEmitter } from "@angular/core";

/**
 * 311. Adding an Alert Modal Component.
 * 313. Using ngIf.
 */
@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {
    // @Input() because it needs to be set from outside. 
    // In this case 
    // - auth.compoonent.ts: error declared and receiving a value.
    // - auth.component.html: uses the <app-alert> and here the property 'error' is used as input for the component.
    // Will contain a message shown via this alert.
    @Input() message: string;
    // @Output() because it needs to be listenable from the outside.
    // Data can be transmitted in this way but now it only needs to send that the alert needs to be closed.
    @Output() close = new EventEmitter<void>();

    onClose() {
        console.log('AlertComponent.onClose: emitting');
        this.close.emit();
    }
}