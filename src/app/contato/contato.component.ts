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
  contatos: Contato[] = [];
  colunas : string[] = ['id', 'nome', 'email', 'favorito'];

  constructor(
    private service: ContatoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.listarContatos();
  }

  montarFormulario() {
    this.formulario = this.fb.group( {
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required])
    })
  }

  listarContatos() {
    this.service.list().subscribe (response => {
      this.contatos = response;
    })
  }

  submit () {
    const formValues = this.formulario.value
    const contato: Contato = new Contato(formValues.nome, formValues.email)
      this.service.save(contato).subscribe( resposta => {
        let lista: Contato[] = [...this.contatos, resposta]
        this.contatos = lista
        console.log(this.contatos)
      }) 
    }

  favoritar(contato: Contato) {
    this.service.favorite(contato).subscribe(response => {
      contato.favorito = !contato.favorito;
    })
  }
  
}
