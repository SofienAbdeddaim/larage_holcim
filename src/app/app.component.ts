import {Component, enableProdMode, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import { Service, Employee, State } from "./app-service";
import {AngularFirestore} from "angularfire2/firestore";

if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Service]
})
export class AppComponent implements OnInit{
  dataSource: Employee[] = [];
  states: State[];
  events: Array<string> = [];
  public items: Observable<any[]>;

  constructor(service: Service, db: AngularFirestore) {
    // this.dataSource = service.getEmployees();
    // this.states = service.getStates();
    this.items = db.collection('/Equipment').snapshotChanges();
  }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.items.subscribe(
      actions => {
        actions.map( a => {
          const id = a.payload.doc.id;
          const item = a.payload.doc.data();
          let employee: Employee = new Employee;
          employee.ID = id;
          employee.EquipmentModel = item.EquipmentModel;
          employee.EquipmentPlate = item.EquipmentPlate;
          employee.EquipmentSerial = item.EquipmentSerial;
          employee.EquipmentType = item.EquipmentType;
          employee.Maker = item.Maker;
          employee.EquipmentTypeId = item.EquipmentTypeId;
          employee.MakeYear = item.MakeYear;
          employee.VinNumber = item.VinNumber || null;
          this.dataSource.push(employee);
        })
      }
    );
  }

  logEvent(eventName, event) {
    this.events.unshift(eventName);
    console.log(event);
  }

  clearEvents() {
    this.events = [];
  }
}
