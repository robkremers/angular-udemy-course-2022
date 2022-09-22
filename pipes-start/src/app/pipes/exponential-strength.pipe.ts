import { Pipe, PipeTransform } from '@angular/core';
/**
 * Example from: https://angular.io/guide/pipes
 *  
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 2.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 * 
 * This custom Pipe class has been declared in app.module.ts and is used in app.component.html.
*/
@Pipe({name: 'exponentialStrength'})
export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: number, exponent = 2): number {
    return Math.pow(value, exponent);
  }
}