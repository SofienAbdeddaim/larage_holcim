import { Injectable } from '@angular/core';

export class Equipment {
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

export class Inspections {
  ID: number;
  OperatorName: string;
  PlateNumber: string;
  Date: string;
}

