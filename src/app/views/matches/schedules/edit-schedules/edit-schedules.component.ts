import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-edit-schedules',
  templateUrl: './edit-schedules.component.html',
  styleUrls: ['./edit-schedules.component.css']
})
export class EditSchedulesComponent implements OnInit{

  //editSchedulesForm: UntypedFormGroup;
  editSchedulesForm= new FormGroup({
    idSchedules: new FormControl(),
    'timeInit':new FormControl(''),
    'timeFinish':new FormControl(''),
  });

  constructor(private activeRouter:ActivatedRoute, private router:Router, private api:ApiService,private fb: FormBuilder, private datePipe:DatePipe){}
  ngOnInit(): void {
    let idSchedules = this.activeRouter.snapshot.paramMap.get('idSchedules');
    this.api.getSchedulesForId(idSchedules).subscribe(data=> {
      this.editSchedulesForm.setValue({
        idSchedules : data[0].idSchedules,
        'timeInit': this.datePipe.transform(data[0].timeInit, 'HH:mm'),// this.datePipe.transform(data[0].timeInit, 'yyyy-MM-ddTHH:mm:ss.SSS'),
        'timeFinish': this.datePipe.transform(data[0].timeFinish, 'HH:mm'),
      })
    })
    
  }

  postFormSchedules(){
    /*let todayWithPipe = null;
    console.log("---> "+this.newSchedulesForm.controls['dateProgram'].value+' '+this.newSchedulesForm.controls['timeInit'].value+':00')
    todayWithPipe = this.pipe.transform(this.newSchedulesForm.controls['dateProgram'].value+' '+this.newSchedulesForm.controls['timeInit'].value+':00', 'yyyy-MM-ddThh:mm:ss.SSSZ');
    console.log("---> "+todayWithPipe)
    //const fechaString = this.newSchedulesForm.controls['dateProgram'].value;
    const fechaString = this.newSchedulesForm.controls['timeInit'].value;
    console.log("---> "+fechaString)
    const fechaDate: Date = new Date(todayWithPipe); 2023-11-14T20:53:21.930Z
    console.log("---> "+fechaDate+fechaString)*/
    let today = new Date();
    let ChangedFormat = this.datePipe.transform(today, 'YYYY-MM-dd');
    this.editSchedulesForm.controls['timeInit'].setValue(this.datePipe.transform(ChangedFormat+' '+this.editSchedulesForm.controls['timeInit'].value+':00', 'yyyy-MM-ddTHH:mm:ss.SSS'))
    this.editSchedulesForm.controls['timeFinish'].setValue(this.datePipe.transform(ChangedFormat+' '+this.editSchedulesForm.controls['timeFinish'].value+':00', 'yyyy-MM-ddTHH:mm:ss.SSS'))
    this.api.updateSchedules(this.editSchedulesForm).subscribe(data=>{
      console.log(data.mensaje);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error: "+err.error.message);
        } else {
          console.log("Server-side error: "+err.error.message);
        }
      }
    );
    
  }

  back(){
    this.router.navigate(['schedules']);
  }

  setTimeFinish(){
    const minutes=40;
    const dateCurrent = '1988-06-30';
    const currentTimeFinish = this.editSchedulesForm.controls['timeInit'].value;
    const currentDate = new Date(`${dateCurrent}T${currentTimeFinish}`);

    // Agregar minutos a la hora
    currentDate.setMinutes(currentDate.getMinutes() + minutes);

    // Formatear la nueva hora como una cadena en el formato deseado
    const newTimeFinish = this.datePipe.transform(currentDate, 'HH:mm');

    console.log(newTimeFinish)
    // Actualizar el valor en el formulario
    this.editSchedulesForm.controls['timeFinish'].setValue(newTimeFinish);
    
    
  }
}
