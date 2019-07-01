import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "clientTypeTranslate"})
export class ClientTypeTranslatePipe implements PipeTransform {
    transform(value: any):string {
        switch (value) {
            case 0:
                return 'Не указан';

            case 10:
                return 'Небольшой';

            case 20:
                return 'Средний 1';

            case 30:
                return 'Средний 2';

            case 40:
                return 'Крупный 1';

            case 50:
                return 'Крупный 2';

            case 60:
                return 'Крупный 3';

            case 90:
                return 'Очень крупный';
            
            default: 
                return 'Не определен';
                
            }
    }
}