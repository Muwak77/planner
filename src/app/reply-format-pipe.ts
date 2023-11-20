
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replyFormat'
})
export class ReplyFormatPipe implements PipeTransform {  
  transform(value: string): string {
    
    switch(value.toLowerCase() ) {
        case "yes":
            return "Zusage";
            break;
        case "no":
            return "Absage";
            break;
        case "yes":
            return "Vorläufig";
            break;
        default:
            return value;
            
    }

    
    
  }
}
