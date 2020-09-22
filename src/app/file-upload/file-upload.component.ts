import { Component, OnInit } from '@angular/core';
import {UploadService} from '../file-upload/upload.service'
import {PerformTasksService} from '../file-upload/perform-tasks.service'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileToUpload: File = null;
  
  hasUploadFailedBool: Boolean = false;
  taskOneFile:String = null;
  taskTwoFile:String = null;
  taskThreeFile:String = null;
  uploadedFile:String = null;
  errorMessage:String = null;
  lastSentFile:String = null;

  taskOneError:String = null;
  taskTwoError:String = null;
  taskThreeError:String = null;

  constructor(private fileUploadService: UploadService, private performTasksService: PerformTasksService) { }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}
private getZipFile(data: any) {
  const blob = new Blob([data], {'type':"application/octet-stream"});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = "filename.zip";
  a.click();
}
isSuccess(){
  console.log("uploaded file is ", this.uploadedFile)
  return this.uploadedFile !== null
}
hasUploadFailed(){
  return this.hasUploadFailedBool
}
uploadFileToActivity(event) {
  console.log(this.fileToUpload)
  this.fileUploadService.upload(this.fileToUpload).subscribe(data => {
    this.hasUploadFailedBool = false;
    this.uploadedFile = data.filename;
    this.taskOneFile = data.filename;
    this.taskTwoFile = data.filename;
    this.taskThreeFile = data.filename;
    this.lastSentFile = this.fileToUpload.name;

    // do something, if upload success
    console.log(data);
    
    }, error => {
      this.uploadedFile = null;
      this.hasUploadFailedBool = true;
      this.errorMessage = null;
      // console.log("file upload compononet upload error")
      console.log(error);
    }); 
    
}
  taskOne(val:string){
    this.taskOneFile = val;
  }
  doTaskOne(event){
    event.preventDefault();
    console.log("task 1 file name" + this.taskOneFile)
    this.performTasksService.perform({
      "filename": this.taskOneFile, 
      "id":1
    }).subscribe(data => {
    // do something, if upload success
    console.log(data);
    this.getZipFile(data);
    this.errorMessage = "You have successfully completed task 1";
    setTimeout(() => {
      this.errorMessage = null;
     }, 3000);
     
    
    }, error => {
      console.log("task 1 compononet upload error")
      console.log(error['message'])
      if (error['status'] == 422){
        this.errorMessage = "The file doesn't exist. Please upload the file first!"
        
      } else if (error['status'] == 423){
        this.errorMessage = "This file doesn't have appropriate column names. Please check your file"  
      }
      setTimeout(() => {
        this.errorMessage = null;
       }, 3000);
      
    });
  }

  taskTwo(val:string){
    this.taskTwoFile = val;
  }
  doTaskTwo(event){
    event.preventDefault();
    this.performTasksService.perform({
      "filename": this.taskTwoFile, 
      "id":2
    }).subscribe(data => {
    // do something, if upload success
    this.errorMessage = "You have successfully completed task 2";
    setTimeout(() => {
      this.errorMessage = null;
     }, 3000);
    console.log(data);
    this.getZipFile(data);
    
    }, error => {
      if (error['status'] == 422){
        this.errorMessage = "The file doesn't exist. Please upload the file first!"
      }
        else if (error['status'] == 423){
          this.errorMessage = "This file doesn't have appropriate column names. Please check your file"  
        }
        setTimeout(() => {
          this.errorMessage = null;
         }, 3000);
    });
  }

  taskThree(val:string){
    this.taskThreeFile = val;
  }
  doTaskThree(event){
    event.preventDefault();
    console.log(this.taskThreeFile)
    this.performTasksService.perform({
      "filename": this.taskThreeFile, 
      "id":3
    }).subscribe(data => {
    // do something, if upload success
    this.errorMessage = "You have successfully completed task 3";
    setTimeout(() => {
      this.errorMessage = null;
     }, 3000);
    console.log(data);
    this.getZipFile(data);
    
    }, error => {
      if (error['status'] == 422){
        this.errorMessage = "The file doesn't exist. Please upload the file first!"
      } else if (error['status'] == 432){
        this.errorMessage = "Task 2 of this file hasn't been completed yet! Please complete task two first to do the third task."
      } else if (error['status'] == 423){
        this.errorMessage = "This file doesn't have appropriate column names. Please check your file"  
      }
      setTimeout(() => {
        this.errorMessage = null;
       }, 3000);
    });
  }
  showStatus(){
    return this.errorMessage !== null
  }
  ngOnInit(): void {
    
  }

}
