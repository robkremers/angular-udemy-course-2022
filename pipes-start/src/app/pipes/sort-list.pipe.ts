import { Pipe, PipeTransform } from '@angular/core';

/**
 * Purpose:
 * Sort a List, consisting of elements of type Server.
 * 
 * Example of use: *ngFor="let server of servers | filter: filteredStatus: 'status' | sortList"
 */
@Pipe({
  name: 'sortList',
  pure: false
})
export class SortListPipe implements PipeTransform {

  /**
   * 
   * @param value: any      : the server list to be sorted.
   * @param propertyName    : the name of the Server item used for sorting.
   * @returns               : the server list sorted based on server.name
   */
  transform(value: any, propertyName: string): unknown {
    if (value.length === 0) {
      console.log('SortListPipe: The value lenghth = 0')
      return value;
    }

    // This works.
    // value.sort(this.compareName);

    // Works too.
    value.sort( (a, b) => {
      if (a[propertyName] > b[propertyName]) {
        return 1;
      } else if (a[propertyName] < b[propertyName]) {
        return -1;
      } else {
        return 0;
      }
    });

    return value;
  }


 compareName(a: any,b: any) {
    if (a.name < b.name )
      return -1;
    if (a.name  > b.name )
     return 1;
    return 0;
 }

}
