import { Pipe, PipeTransform } from '@angular/core';

/**
 * 246. Creating a Custom Pipe.
 * The class ShortenPipe has been declared in app.module.ts.
 * 
 * 247. Parameterizing a Custom Pipe.
 * 
 * In app.component.html:
 * - use:
 *      - {{ server.name | shorten: 4 }}
 *      - {{ server.name | shorten }}       !! The second input parameter is optional!!
 * 
 */
@Pipe({name: 'shorten'})
export class ShortenPipe implements PipeTransform {
    
  transform(value: string, limit: number): string {
      if (value.length > limit) {
        return value.substring(0, limit) + ' ...';
      }
      return value;
  }
}