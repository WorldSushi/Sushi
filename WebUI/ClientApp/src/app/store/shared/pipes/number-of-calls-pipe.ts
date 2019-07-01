import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "numberOfCallsTranslate"})
export class NumberOfCallsTranslatePipe implements PipeTransform {
    transform(value: any):string {
        switch (value) {
            case 0:
                return 'Не указан';

            case 10:
                return '1 в мес';

            case 20:
                return '1 в 2 нед';

            case 30:
                return '3 в мес';

            case 40:
                return '1 в нед';

            case 50:
                return '5 в мес';

            case 60:
                return '6 в мес';

            case 90:
                return '2 в нед';
            
            default: 
                return 'Не определен';
                
            }
    }
}