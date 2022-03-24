import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { Admininfo } from '../admininfo';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
 
  taskId: any;
  listId: any;
  datasaved = false;
  message: any;
  status:any;
  selectedlistId:any;
  ToDoEditForm =new FormGroup({
    task: new FormControl(''),
    description: new FormControl('')
  })
  
  constructor(private fB: FormBuilder, private aS:ServiceService,private rT:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        if(params.listId){
          this.selectedlistId=params.listId;
        }
        else{
          this.selectedlistId = undefined;
        }
        
      }
    )

    console.log(this.route.snapshot.params.listId,this.route.snapshot.params.taskId);
    
    this.aS.getCurrentData(this.route.snapshot.params.listId,this.route.snapshot.params.taskId).subscribe((data)=>{
      this.ToDoEditForm=new FormGroup({
        task: new FormControl(data['task']), 
        description: new FormControl(data['description'])
      })
      console.log(data)
    })
  }


  updateTask() {
   
    this.aS.updatedTask(this.route.snapshot.params.listId,this.route.snapshot.params.taskId,this.ToDoEditForm.value).subscribe((res:any) => {
      console.log(res,"Data updated successfully..!!!");
      this.rT.navigate(['/users', this.selectedlistId,'new-task']);
    })
    alert("Updated Successfully");
  }
  
  
}
