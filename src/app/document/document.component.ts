import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FirebaseStorageService } from '../firebase-storage.service'
import * as CryptoJS from 'crypto-js';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Document } from '../models/doc.model'

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  number;
  key = "testkey"
  signDoc;
  doc = {
    id: '',
    nombre: '',
    firma: null
  };
  constructor(private route: ActivatedRoute
    , private storage: FirebaseStorageService, private loader: NgxUiLoaderService) { }

  ngOnInit() {
    this.number = this.route.snapshot.paramMap.get("id");
    this.storage.obtenerDocumento(this.number).subscribe(ddata => {
      console.log(ddata);
      this.doc.id = ddata.payload.id
      this.doc.nombre = ddata.payload.data()['nombre'],
        this.doc.firma = ddata.payload.data()['firma']
    })
    console.log(this.doc);
  }

  sign() {
    const bytes = CryptoJS.AES.encrypt(this.doc.nombre, this.key);
    this.signDoc = bytes;
    this.doc.firma = bytes.toString();
    this.loader.start();
    setTimeout(() => {
      this.loader.stop();
      this.createBlob();
    }, 3000);
  }

  createBlob() {
    console.log('blob');
    html2canvas(document.querySelector('#document')).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var pdf = new jsPDF('p', 'mm', 'a4');
      var imgData = canvas.toDataURL("image/jpeg");
      pdf.addImage(imgData, 'jpeg', 0, 0, imgWidth, imgHeight);
      const file = pdf.output("blob");
      const filename = this.doc.nombre;
      this.storage.updateDocumento(this.doc.id, this.doc);
      this.storage.subirArchivo(filename, file);
    })
  }

}
