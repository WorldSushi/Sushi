import { Injectable } from "@angular/core";



@Injectable()
export class DateExtensionsService {

    private months: string[] = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

    getTitleOfCurrentMonth(){
        return this.months[new Date().getMonth()];
    }

    constructor(){}
}