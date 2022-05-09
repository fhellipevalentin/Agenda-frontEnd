import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private service: ContatoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group( {
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required])
    })
  }
submit () {
  const erroNomeRequired = this.formulario.get('nome')?.errors?.['required'];
  console.log('erroNomeRequired', erroNomeRequired)
  const erroEmailRequired = this.formulario.get('email')?.errors?.['required'];
  console.log('erroEmailRequired', erroEmailRequired)
  const erroEmailInvalid = this.formulario.get('email')?.errors?.['email'];
  console.log('erroEmailInvalid', erroEmailInvalid)
    /* this.service.save(c).subscribe( response => {
      console.log(response);
    }) */
  }
  
}
