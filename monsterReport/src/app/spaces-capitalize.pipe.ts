import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spacesCapitalize'
})
export class SpacesCapitalizePipe implements PipeTransform {

    transform(text:string): string {
        if (text) {
            text = text.replace(/_/g, ' ')
            text = text.charAt(0).toUpperCase() + text.slice(1)
        }
        return text;
    }

}
