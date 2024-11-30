import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { CodeExecResponse } from '../Model/CodeExecResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExecuteCodeService {

  execCodeUrl = environment+"/codeExec"
  private output:BehaviorSubject<string> = new BehaviorSubject<string>("");
  private _isLoading:BehaviorSubject<boolean> = new BehaviorSubject(false);
  stdin:string ="";

  constructor(private httpClient:HttpClient,
  ) { }

  executeCode(source_code:string,lang_id:number){
    const payload = { 
      source_code: btoa(source_code),
      language_id: lang_id,
      stdin: btoa(this.stdin)
    }
    console.log(payload);
    
    this.httpClient.post<CodeExecResponse>(this.execCodeUrl+"/execute",payload)
    .pipe(
      catchError(error => {
        this._isLoading.next(false);
        let errorMessage = 'An error occurred. Please try again later.';
        if (error.status === 404) {
          errorMessage = 'Resource not found. Please check the URL.';
        } else if (error.status === 500) {
          errorMessage = 'Internal server error. Please try again later.';
        }
        this.output.next(errorMessage);
        // Return an empty observable or default value if needed
        return of(null);
      })
    )
    .subscribe(response =>{

      console.log(response);
      
      if(response.stdout!=null){
        this.output.next(atob(response.stdout))
      }
      else if(response.compile_output!=null){
        this.output.next(atob(response.compile_output))

      }
      if(response.stderr!=null){
        this.output.next(this.output.getValue()+atob(response.stderr))
      }
    });
  }


  public getOutput(){
    return this.output.asObservable();
  }

  get isLoading(){
    return this._isLoading.asObservable();
  }
}
