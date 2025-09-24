import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-tarefas',
  imports: [
    CommonModule, /* Funções básicas do Angular */
    FormsModule, /* Tratamento de formulários */
    ReactiveFormsModule /* Tratamento de formulários */
  ],
  templateUrl: './cadastrar-tarefas.html',
  styleUrl: './cadastrar-tarefas.css'
})
export class CadastrarTarefas {

  //Atributos
  categorias = signal<any[]>([]); //array vazio
  mensagem = signal<string>(''); //texto vazio

  //Criando um objeto do tipo HttpClient
  private http = inject(HttpClient);

  //função para, ao abrir a página, consultar as categorias na API
  ngOnInit() {
    //fazendo uma chamada para o serviço de consulta de categorias
    this.http.get('http://localhost:8081/api/v1/categorias')
             .subscribe((dados) => this.categorias.set(dados as any[]));
  }

  //Estrutura do formulário
  formulario = new FormGroup({
    nomeTarefa: new FormControl('', [Validators.required]),
    dataTarefa: new FormControl('', [Validators.required]),
    prioridadeTarefa: new FormControl('', [Validators.required]),
    idCategoria: new FormControl('', [Validators.required])
  });

  //função para executar o cadasto da tarefa
  cadastrarTarefa() {

    //fazendo uma requisição para o serviço de cadastro da API
    this.http.post('http://localhost:8081/api/v1/tarefas', this.formulario.value, { responseType: 'text' })
      .subscribe((resposta) => { //capturando o retorno da API
        //guardar o valor da variável resposta no atributo mensagem da classe
        this.mensagem.set(resposta);
        //limpar os campos do formulário
        this.formulario.reset();
      });
  }

}
