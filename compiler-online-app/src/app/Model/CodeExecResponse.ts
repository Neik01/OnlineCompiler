export interface CodeExecResponse {
    stdout: string | null;
    time: string | null;
    memory: number | null;
    stderr: string | null;
    token: string | null;
    compile_output: string | null;
    message: string | null;
    status: Status;
  }
  
export interface Status {
    id: number;
    description: string;
}
  