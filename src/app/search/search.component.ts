import { Component, OnInit } from '@angular/core';
import {SearchService} from '../service/search.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {
  NUMERIC_PATTREN = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
  constructor(private searchService: SearchService, private fb: FormBuilder) {
    this.validateForm();
  }
  page: number;
  result: any;
  form: FormGroup;
  errorMessage: string;
  minSalary: string;
  maxSalary: string;
  sortbycolumn: string;
  sortbyorder: string;
  ngOnInit(): void {
    this.page = 0;
  }
  validateForm(): any{
    this.form = this.fb.group({
      minSalary: [{value: 0}, [Validators.required, Validators.pattern(this.NUMERIC_PATTREN)]],
      maxSalary: [{value: 0}, [Validators.required, Validators.pattern(this.NUMERIC_PATTREN)]],
      sortbycolumn: ['',  [Validators.required]],
      sortbyorder: ['Select Order',  [Validators.required]]
    });
  }


  onSubmit(event: any): any {
    this.result = null;
    this.minSalary = event.target.minSalary.value;
    this.maxSalary = event.target.maxSalary.value;
    this.sortbycolumn = event.target.sortbycolumn.value;
    this.sortbyorder = event.target.sortbyorder.value;
    this.searchService.searchemployees(event.target.minSalary.value, event.target.maxSalary.value,
      event.target.sortbycolumn.value, event.target.sortbyorder.value, 0, 30).subscribe(data => {
        this.result = data;
        if (this.result.length === 0) {
          this.errorMessage = 'No record retrieved.';
        }
      },
      response => {
        if (response.status !== 200) {
          this.errorMessage = 'Error retrieving records';
        }
      }
    );
  }

  public onClickNextPage(): void {
    if (this.result != null) {
      if (this.result.length === 30) {
        this.page = this.page + 1;
        this.searchService.searchemployees(this.minSalary, this.maxSalary, this.sortbycolumn,
          this.sortbyorder, this.page * 30, 30).subscribe(data => {
          this.result = data;
        });
      }
    }

  }

  public onClickPreviousPage(): void {
    if (this.page !== 0) {
      this.page = this.page - 1;
      this.searchService.searchemployees(this.minSalary, this.maxSalary, this.sortbycolumn,
        this.sortbyorder, this.page * 30, 30).subscribe(data => {
        this.result = data;
      });
    }
  }


}
