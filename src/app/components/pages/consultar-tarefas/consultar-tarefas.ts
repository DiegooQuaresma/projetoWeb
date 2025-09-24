import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar-tarefas',
  imports: [
    CommonModule,  // Funções básicas do Angular
    RouterLink //Permite criar links para outras páginas(neste caso,para chamar a página de edição)
  ],
  templateUrl: './consultar-tarefas.html',
  styleUrl: './consultar-tarefas.css'
})
export class ConsultarTarefas {

  tarefas = signal<any[]>([]);

  // Declarar um atributo do tipo HttpCliente
  private http = inject(HttpClient);


  //Função executada ao abrir a páigina
  ngOnInit(){
    this.http.get('http://localhost:8081/api/v1/tarefas')
    .subscribe((dados) =>{
     
      this.tarefas.set(dados as any[]);
    })

  }
  //Função para excluir uma tarefa
  excluirTarefa(id : string){
    //Abrir uma janela de confirmação
    if(confirm('Deseja realmente excluir esta tarefa?')){
      this.http.delete('http://localhost:8081/api/v1/tarefas/' + id, {responseType: 'text'})
      .subscribe( (resposta) =>{ //capturando a resposta do backend

        alert(resposta);
        
        //executar uma nova consulta no backend
        this.ngOnInit();
           


      });

      
    }

  }

}

