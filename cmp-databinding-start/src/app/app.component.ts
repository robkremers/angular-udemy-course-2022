import { Component, ViewEncapsulation } from '@angular/core';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // encapsulation: ViewEncapsulation.ShadowDom

})
export class AppComponent {
  /**
   * The square brackets indicate an array.
   */
  serverElements = [ {type: 'server', name: 'TestServer', content: 'Just a test'} ];

  onServerAdded(serverData: {serverName: string, serverContent: string}): void {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}): void {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }

  onChangeFirst(): void {
    this.serverElements[0].name = 'Changed';
  }

  /**
   * Due to refresh of the webpage the server name + content will be removed from the screen.
   */
  onDestroyFirst(): void {
    this.serverElements.splice(0, 1);
  }
}
