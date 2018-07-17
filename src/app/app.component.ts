import {Component, enableProdMode, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import { Equipment, Inspections} from "./models";
import {AngularFirestore} from "angularfire2/firestore";

if (!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    dataSourceEquip: Equipment[] = [];
    dataSourceInsp: Inspections[] = [];
    events: Array<string> = [];
    equipment: string = '/Equipment';
    inspections: string = '/Inspections';
    public itemsEquip: Observable<any[]>;
    public itemsInsp: Observable<any[]>;

    constructor(private db: AngularFirestore) {
        // this.dataSourceEquip = service.getEmployees();
        // this.states = service.getStates();
        this.itemsEquip = db.collection(this.equipment).snapshotChanges();
        this.itemsInsp = db.collection(this.inspections).snapshotChanges();
    }

    ngOnInit() {
        this.getEquipItems();
        this.getInspItems();
    }

    getEquipItems() {
        this.itemsEquip.subscribe(
            actions => {
                this.dataSourceEquip = [];
                actions.map(a => {
                    const id = a.payload.doc.id;
                    const item = a.payload.doc.data();
                    let equipment: Equipment = new Equipment;
                    equipment.ID = id;
                    equipment.EquipmentModel = item.EquipmentModel;
                    equipment.EquipmentPlate = item.EquipmentPlate;
                    equipment.EquipmentSerial = item.EquipmentSerial;
                    equipment.EquipmentType = item.EquipmentType;
                    equipment.Maker = item.Maker;
                    equipment.EquipmentTypeId = item.EquipmentTypeId;
                    equipment.MakeYear = item.MakeYear;
                    equipment.VinNumber = item.VinNumber || null;
                    this.dataSourceEquip.push(equipment);
                });
              console.log(this.dataSourceEquip);
            }
        );
    }

    getInspItems() {
      this.itemsInsp.subscribe(
        actions => {
          this.dataSourceInsp = [];
          actions.map(a => {
            const id = a.payload.doc.id;
            const item = a.payload.doc.data();
            let inspect: Inspections = new Inspections;
            inspect.ID = id;
            inspect.OperatorName = item.OperatorName;
            inspect.PlateNumber = item.PlateNumber;
            inspect.Date = item.Date;
            this.dataSourceInsp.push(inspect);
          })
        }
      );
    }

    logEvent(eventName, event) {
        this.events.unshift(eventName);
    }

    updateItem(data, grid) {
        let dataGrid = data.data;
        let dataDoc = {};
        for(var key in dataGrid) {
            if(dataGrid.hasOwnProperty(key)) {
                dataDoc[key] = dataGrid[key];
            }
        }
        let collection = (grid === 'insp') ? this.inspections : this.equipment;
        this.db.collection(collection).doc("/"+ data.key).update(dataDoc)
            .then(data => {
              console.log('done');
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    }

    addItem(event, grid) {
      let collection = (grid === 'insp') ? this.inspections : this.equipment;
      this.db.collection(collection).add(event.data)
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }

    toDeleteItem(event, grid) {
      let collection = (grid === 'insp') ? this.inspections : this.equipment;
      this.db.collection("/Equipment").doc(event.key).delete().then(function() {
        console.log("Document successfully deleted!");
      }).catch(function(error) {
        console.error("Error removing document: ", error);
      });
    }

    clearEvents() {
        this.events = [];
    }

}
