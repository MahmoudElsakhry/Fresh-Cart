import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObjects : any[] , word : string): any[] {
    return arrayOfObjects.filter((item) => item.title.toLowerCase().includes(word.toLowerCase()))
  }

}
