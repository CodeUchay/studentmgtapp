import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { StudentService } from './student.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

// implement use effect
export class AppComponent implements OnInit {
  public students: Student[] | undefined;

  constructor(private studentService: StudentService){}


  // use effect 
  ngOnInit() {
      this.getStudents();
  }

  public getStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (response: Student[]) => {
         this.students = response;
         },
      error: (error: HttpErrorResponse) => {
         alert(error.message);
         }
         
    })}
    public onOpenModal(employee: Student, mode: string): void {
      const container = document.getElementById('main-container') ;
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'add') {
        button.setAttribute('data-target', '#addStudentModal');
      }
      if (mode === 'edit') {
        button.setAttribute('data-target', '#updateStudentModal');
      }
      if (mode === 'delete') {
        button.setAttribute('data-target', '#deleteStudentModal');
      }
      container?.appendChild(button);
      button.click();
    }
  }
