import { Component, OnInit } from "@angular/core";

import { EmployeeService } from "../../services/employee.service";
import { NgForm } from "@angular/forms";
import { Employee } from "../../models/employee";
import { Router } from '@angular/router';

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
  providers: [EmployeeService],
})
export class EmployeeComponent implements OnInit {
  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.getEmployees();
  }

  addEmployee(form?: NgForm) {
    if (form.value._id) {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.getEmployees();
      });
    } else {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.getEmployees();
        this.resetForm(form);
      });
    }
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((res) => {
      this.employeeService.employees = res;
      console.log(this.employeeService.employees)
    });
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
  }

  deleteEmployee(_id: string, form: NgForm) {
    if (confirm("Are you sure you want to delete it?")) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.getEmployees();
        this.resetForm(form);
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }

  // Viene del botón que manda los parámetros
  // y esta función invoca a la ruta pasándole los valores
  irMapa(employee: Employee){
    // Para almacenar un objeto hay que pasarlo a json
    // En otro caso solo admite string
    localStorage.setItem("employee", JSON.stringify(employee))
    this.router.navigate(['/mapa']);
  }
    //this.router.navigate(['/mapa', employee.longitude, employee.latitude, employee.office]);
}
