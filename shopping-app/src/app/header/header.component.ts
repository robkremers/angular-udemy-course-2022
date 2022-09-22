import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    collapsed:boolean = true;

    // chosenItem will be used in parent component app.component via Property Binding.
    @Output() chosenItem = new EventEmitter<string>();

    onSelect(chosenItem: string ) {
        this.chosenItem.emit(chosenItem);
    }

}