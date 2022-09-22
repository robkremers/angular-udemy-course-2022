import { Pipe, PipeTransform } from '@angular/core';

/**
 * 248. Example: Creating a Filter Pipe.
 * Input parameters:
 * - value: servers[] as defined in app.component.ts.
 * - filterString: the name of the servers (server.name) to be filtered.
 * - propertyName: the name of a property of a server.
 * 
 * Use: see app.component.html:
 * <li class="list-group-item" *ngFor="let server of servers | filter: filteredStatus: 'status'" [ngClass]="getStatusClasses(server)">
 * - In this case:
 *  - value: servers[]
 *  - filterString: e.g. stable
 *  - propertyName: 'status' --> server.status.
 * 
 * 249. Pure and Impure Pipes (or: How to "fix" the Filter Pipe)
 * 
 * By default it is not possible to dynamically reload the content of an array.
 * Reason: this would potentially be very damaging to the performance.
 * 
 * This default behaviour can be changed though.
 * That means: with every change in the page the array would be reloaded.
 * 
 * How to do this:
 * Add a decorator to the pipe definition: 
 * - pure: false
 * 
 * Now the pipe will be recalculated each time the data is changed.
 * This can be detrimental to the performance of the site!
 * 
 */
@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propertyName: string): unknown {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propertyName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
