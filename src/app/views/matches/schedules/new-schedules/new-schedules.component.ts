import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-new-schedules',
  templateUrl: './new-schedules.component.html',
  styleUrls: ['./new-schedules.component.css']
})
export class NewSchedulesComponent {
  newSchedulesForm: UntypedFormGroup;

  constructor(private activeRouter:ActivatedRoute, private router:Router, private api:ApiService,private fb: FormBuilder, private datePipe:DatePipe){}
  ngOnInit(): void {
    this.initializeForm();
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
    this.newSchedulesForm.controls['timeInit'].setValue(this.datePipe.transform('1988-06-30'+' '+this.newSchedulesForm.controls['timeInit'].value+':00', 'yyyy-MM-ddTHH:mm:ss.SSS'))
    this.newSchedulesForm.controls['timeFinish'].setValue(this.datePipe.transform('1988-06-30'+' '+this.newSchedulesForm.controls['timeFinish'].value+':00', 'yyyy-MM-ddTHH:mm:ss.SSS'))
    this.api.createSchedules(this.newSchedulesForm).subscribe(data=>{
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

  initializeForm() {
    this.newSchedulesForm= this.fb.group({
      //'idTeam': new UntypedFormControl(this.idTeam, Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern(Helper.OnlyAlphabeticPattern)])),
      'dateProgram': new UntypedFormControl(),
      'timeInit': new UntypedFormControl(),//
      'timeFinish': new UntypedFormControl()
    })
  }

  back(){
    this.router.navigate(['schedules']);
  }

  setTimeFinish(){
    const minutes=40;
    const dateCurrent = '1988-06-30';
    const currentTimeFinish = this.newSchedulesForm.controls['timeInit'].value;
    const currentDate = new Date(`${dateCurrent}T${currentTimeFinish}`);

    // Agregar minutos a la hora
    currentDate.setMinutes(currentDate.getMinutes() + minutes);

    // Formatear la nueva hora como una cadena en el formato deseado
    const newTimeFinish = this.datePipe.transform(currentDate, 'HH:mm');

    console.log(newTimeFinish)
    // Actualizar el valor en el formulario
    this.newSchedulesForm.controls['timeFinish'].setValue(newTimeFinish);
    
    
  }
}
