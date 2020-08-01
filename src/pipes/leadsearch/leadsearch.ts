import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the LeadsearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'leadsearch',
})
export class LeadsearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if(!terms) return items;
    let filteredList = [];
    terms = terms.toLowerCase();
    items.forEach(item=>{
      let propValueList = Object.keys(item);
        for(let i=0;i<propValueList.length;i++)
        {
          if (propValueList[i]) {
            if (propValueList[i].toString().toLowerCase().indexOf(terms) > -1)
            {
              filteredList.push(item);
              break;
            }
          }
        }
      });
    
    return filteredList;
   
    
  }
}
