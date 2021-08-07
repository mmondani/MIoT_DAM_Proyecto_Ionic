import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: string): string {
    let fecha = new Date(value);
    
    let day = fecha.getDate().toString().padStart(2, "0");
    let month = (fecha.getMonth() + 1).toString().padStart(2, "0");
    let year = fecha.getFullYear();

    let hour = fecha.getHours().toString().padStart(2, "0");
    let minutes = fecha.getMinutes().toString().padStart(2, "0");
    let seconds = fecha.getSeconds().toString().padStart(2, "0");
    
    
    return `${day}/${month}/${year} - ${hour}:${minutes}:${seconds}`;
  }

}
