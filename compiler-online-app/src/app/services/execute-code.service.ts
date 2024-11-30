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
    
    this.httpClient.post<CodeExecResponse>(this.execCodeUrl+"/execute",payload).subscribe(response =>{

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
}
