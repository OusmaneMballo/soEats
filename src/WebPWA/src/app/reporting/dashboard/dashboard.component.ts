import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { ReportingService } from '../reporting.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  report: any;
  ownerId: string;
  reportForm: FormGroup;
  totaux: any[];
  numberOfOrdersByMonth: number;
  amountOfDeliveries: number;
  turnover: number;
  turnoverWithPromotion: number;
  turnoverWithoutPromotion: number;
  commissionSoeat: number;
  budgetPromotion: number;
  constructor(private reportingService: ReportingService, private fb: FormBuilder, private router:ActivatedRoute, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.ownerId = this.activatedRoute.snapshot.paramMap.get('ownerId')!;

    this.reportForm=this.fb.group({
      dateDebut: ['',  Validators.required],
      dateFin: ['',  Validators.required],
    });

    let nextMonth = new Date();
    nextMonth.setMonth(new Date().getMonth()+1);

    this.getReports(this.ownerId, new Date().toISOString(), nextMonth.toISOString());
  }

  getReports(ownerId: string, startDate: any, endDate: any){
    this.reportingService.getReservation(ownerId, startDate, endDate).subscribe((data)=>{
      this.report=data;
      this.getTotaux();
    })
  }

  getTotaux(){

    this.totaux=[];
    this.numberOfOrdersByMonth=0;
    this.amountOfDeliveries=0;
    this.turnover=0;
    this.turnoverWithPromotion=0;
    this.turnoverWithoutPromotion=0;
    this.commissionSoeat=0;
    this.budgetPromotion=0;

    for(let j=0; j<this.report.length; j++){

      this.numberOfOrdersByMonth +=this.report[j].numberOfOrdersByMonth;
      this.amountOfDeliveries += this.report[j].amountOfDeliveries;
      this.turnover += this.report[j].turnover;
      this.turnoverWithPromotion += this.report[j].turnoverWithPromotion;
      this.turnoverWithoutPromotion += this.report[j].turnoverWithoutPromotion;
      this.commissionSoeat += this.report[j].commissionSoeat;
      this.budgetPromotion += this.report[j].budgetPromotion;
      
    }

  }

  getReportStartDateEndDate(event: MatDatepickerInputEvent<Date>){
    this.reportForm.controls.dateDebut.setValue(this.reportForm.controls.dateDebut.value.toISOString());
    this.reportForm.controls.dateFin.setValue(this.reportForm.controls.dateFin.value.toISOString());
    this.getReports(this.ownerId, this.reportForm.controls.dateDebut.value, this.reportForm.controls.dateFin.value);
  }

}
