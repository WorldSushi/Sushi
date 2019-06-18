import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "businessTripCompleteTypeTranslate"})
export class BusinessTripPlanCompleteTypeTranslatePipe implements PipeTransform {
    transform(value: any):string {
        switch (value) {
            case 0:
                return '0';

            case 10:
                return '0.3';

            case 20:
                return '0.5';

            case 30:
                return '1';

            default: 
                return 'Не определен';              
            }
    }
}