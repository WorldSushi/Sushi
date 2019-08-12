import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "clientGroupPipeTranslate"})
export class ClientGroupTranslatePipe implements PipeTransform {
    transform(value: any):string {
        switch (value) {
            case 0:
                return 'Неопределенные';

            case 10:
                return 'Актуальные';

            case 20:
                return 'С редкой отгрузкой';

            case 30:
                return 'Новые или востановленные';

            case 40:
                return 'Рестораны';
            
            case 50:
                return 'Другие';

            default: 
                return 'Неопределенные';              
            }
    }
}