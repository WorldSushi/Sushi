import { TypeDirectory } from '../enum/typeDirectory';

export interface IColummn {
    id: number,
    nameTable: string,
    typeDirectory: TypeDirectory,
    optins: string,
    cellContacts: any[]
}
