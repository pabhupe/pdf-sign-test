import { Component, OnInit } from '@angular/core';
import { FirebaseStorageService } from '../firebase-storage.service'
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

const ELEMENT_DATA: any[] = [
  { id: 1, name: 'doc1' },
  { id: 2, name: 'doc2' },
  { id: 3, name: 'doc3' },

];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  documents: Observable<any>;;

  constructor(private firestore: FirebaseStorageService,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.documents = this.firestore.obtenerDocumentos()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          let pdfUrl = null;
          if (data['firma']) {
            const ref = this.storage.ref(data['nombre']);
            pdfUrl = ref.getDownloadURL();
            console.log(pdfUrl);
          }
          return { id, data, pdfUrl };
        }))
      )
  }

}
