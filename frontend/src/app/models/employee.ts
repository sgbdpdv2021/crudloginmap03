export class Employee {
  constructor(_id = "", name = "", position = "", office = "", longitude = 0, latitude = 0, salary = 0, ) {
    this._id = _id;
    this.name = name;
    this.position = position;
    this.office = office;
    this.salary = salary;
    this.longitude = longitude;
    this.latitude = latitude;
    //this.location[0] = 0 //longitude;
    //this.location[1] = 0 //latitude
  }

  _id: string;
  name: string;
  position: string;
  office: string;
  salary: number;
  longitude: number;
  latitude: number;
  //location: Array<number>;
}
