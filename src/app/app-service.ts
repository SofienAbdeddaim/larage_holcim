import { Injectable } from '@angular/core';

export class Employee {
  ID: number;
  EquipmentModel: string;
  EquipmentPlate: string;
  EquipmentSerial: string;
  EquipmentType: string;
  EquipmentTypeId: string;
  MakeYear: string;
  Maker: string;
  VinNumber: number;
}

export class State {
  ID: number;
  Name: string;
}

@Injectable()
export class Service {
  getEmployees() {
    // return employees;
  }
  getStates() {
    // return states;
  }
}
