import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the GroupchatusersPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'groupchatusers',
})
export class GroupchatusersPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toLowerCase();
    return items.filter( it => {
      return it.chatroom.toLowerCase().includes(terms); // only filter country name
      
    });
  }
}
