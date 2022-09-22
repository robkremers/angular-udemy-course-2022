import { Component } from "@angular/core";

/**
 * Instead of Commponent | styles stylesUrl referring to a separate file server.component.css can be used.
 * I have added such a file.
 */

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.css']
    // styles: [`
    // .online {
    //     color: white;
    // }
    // `]
})

export class ServerComponent {
    /**
     * The type is inferred from the value, but is present for demo-purpose.
     * Apparently I can not use 'var' here.
     */
  serverId: number = 10;
  serverStatus: string = 'offline';

  constructor() {
      this.serverStatus = Math.random() > 0.5 ? 'online' : 'ofline';
  }

  getServerStatus(): string {
      return this.serverStatus;
  }

  getColor() {
      return this.serverStatus === 'online' ? 'green' : 'red';
  }
}