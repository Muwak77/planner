import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe implements PipeTransform {  
  transform(value: Date): string {
    
    if(typeof value=== "string") {
      value=new Date(value);
    }
    
    if (value && value instanceof Date) {
    

      const day = value.getDate();
      const month = value.getMonth() + 1; // Monate sind nullbasiert, daher +1
      const year = value.getFullYear();
      const hours = value.getHours();
      const minutes = value.getMinutes();

      // Stellen sicher, dass einstellige Werte mit einer führenden Null versehen werden
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      // Erzeugt das gewünschte Format "Tag.Monat.Jahr Stunde:Minute"
      return `${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}`;
    } else {
      return ''; // Für den Fall, dass das Datum null oder undefiniert ist
    }
  }
}
