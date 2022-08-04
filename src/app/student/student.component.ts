import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpDataService } from 'src/app/service/http-data.service';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
import { Student } from 'src/app/models/student';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  @ViewChild('studentFrom', { static: false })
  studentForm!: NgForm;
  studentData!: Student;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'age', 'mobile', 'email', 'address', 'actions'];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  isEditMode = false;
  constructor(private httpDataService: HttpDataService) {
    this.studentData = {} as Student;

  }
  ngOnInit(): void {
    // Initailising datatable pagination
    this.dataSource.paginator = this.paginator;
    // fetch all students on page load
    this.getAllStudents();
  }
  getAllStudents() {
    this.httpDataService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
    }
    );
    // throw new Error('Method not implemented.');
  }
  editItem(element: any) {
    this.studentData = _.cloneDeep(element);
    this.isEditMode = true;
  }
  cancelEdit() {
    this.isEditMode = false;
    this.studentForm.resetForm();
  }
  deleteItem(id: string) {
    this.httpDataService.deleteItem(id).subscribe((response: any) => {


      this.dataSource.data = this.dataSource.data.filter((o: any) => {
        return o.id !== id ? o : false;
      })
      console.log(this.dataSource.data);
    });
  }
}




