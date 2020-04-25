import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore
  ) { }

  public subirArchivo(name, file) {
    return this.storage.upload(name, file);
  }

  public obtenerReferencia(name) {
    return this.storage.ref(name);
  }

  public obtenerDocumentos() {
    return this.firestore.collection('Documentos').snapshotChanges();
  }

  public updateDocumento(documentId: string, data: any) {
    return this.firestore.collection('Documentos').doc(documentId).set(data);
  }

  public obtenerDocumento(documentId: string) {
    return this.firestore.collection('Documentos').doc(documentId).snapshotChanges();
  }
}
