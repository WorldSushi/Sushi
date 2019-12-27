import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { IColummn } from '../../shared/models/colummn.model';
import { TypeDirectory } from '../../shared/enum/typeDirectory';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.sass']
})
export class DirectoryComponent implements OnInit {

    colummns: IColummn[] = [];

    getColummns() {
        this.http.get<IColummn[]>('api/admin/Directory/').subscribe((data: IColummn[]) => {
            this.colummns = data;
            console.log(this.colummns);
        });
    }

    setNameTable(nametable: string, id: number) {
        this.colummns.find(c => c.id == id).nameTable = nametable;
        this.http.get('api/admin/Directory/nameTable?idTable=' + id + "&nametable=" + nametable).subscribe();
    }

    setOptions(options: string, id: number) {
        this.colummns.find(c => c.id == id).optins = options;
        this.http.get('api/admin/Directory/options?idTable=' + id + "&options=" + options).subscribe();
    }

    setType(type: TypeDirectory, id: number) {
        this.http.get('api/admin/Directory/type?idTable=' + id + "&type=" + type).subscribe();
    }

    constructor(public dialog: MatDialog,
        private http: HttpClient,
        private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.getColummns();
  }

}
