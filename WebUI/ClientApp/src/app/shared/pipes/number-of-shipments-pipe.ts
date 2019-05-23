import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "numberOfShipmentsTranslate"})
export class NumberOfShipmentsTranslatePipe implements PipeTransform {
    transform(value: any):string {
        switch (value) {
            case 0:
                return 'Не указан';

            case 10:
                return '1 раз в месяц';

            case 20:
                return '1 раз в 2 недели';

            case 30:
                return '3 раза в месяц';

            case 40:
                return '1 раз в неделю';

            case 50:
                return '5 раз в месяц';

            case 60:
                return '6 раз в месяц';

            case 90:
                return '2 раза в неделю';
            
            default: 
                return 'Не определен';
                
            }
    }
}