import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from '../../servicio/formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  formulario:any;
  datos_formulario = {
    campo1:null,
    campo2:null
  }
  registro:any;
  registros:any;

  constructor(private fb:FormBuilder, 
              private formularioSrv: FormularioService ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      campo1:['',[Validators.required]],
      campo2:[''],
    });
  }

  //obtener los las validaciones
  get formularioReactivo(){
    return this.formulario.controls;
  }

  botonEnviar(){

    this.datos_formulario.campo1 = this.formularioReactivo.campo1.value;
    this.datos_formulario.campo2 = this.formularioReactivo.campo2.value;

    this.formularioSrv.crear_registro(this.datos_formulario).subscribe(
      (response:any) => {
          this.registro = response.registro;
          console.log(this.registro);
      }, error => {
        console.log(error);
      }
      )
  }

  obtener_registros(){
      this.formularioSrv.obtener_registro().subscribe(
        (response:any) => {
          this.registros = response.registros;
          console.log(this.registros);
        }, error =>{
            console.log(error);
        }
      )
      
  }

  eliminar(){
    
  }
}
