import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule, //biblioteca de funções comuns do Angular
    ChartModule //biblioteca de gráficos
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  //Gráficos
  graficoDonut = signal<Chart>(new Chart());
  graficoColunas = signal<Chart>(new Chart());
  graficoBarras = signal<Chart>(new Chart());

  //Atributo para fazer as requisições para o backend
  private http = inject(HttpClient);

  //função executada quando o componente é inicializado
  ngOnInit() {

    //consultar as tarefas por prioridade
    this.http.get('http://localhost:8081/api/v1/dashboard/tarefas-prioridade')
      .subscribe( //captura a resposta da API
        (dados) => {

          const conteudo: any[] = [];

          (dados as any[]).forEach((item) => {
            conteudo.push([item.prioridade, item.quantidade]);
          });

          this.graficoDonut.set(
            new Chart({
              chart: { type: 'pie' },
              title: { text: 'Tarefas por Prioridade' },
              subtitle: { text: 'Quantidade de tarefas por prioridade na agenda.' },
              plotOptions: {
                pie: { innerSize: '50%', dataLabels: { enabled: true } }
              },
              series: [{ data: conteudo, type: 'pie', name: 'Tarefas' }],
              credits: { enabled: false },
              legend: { enabled: false }
            }));

        }
      );

    //consultar as tarefas por finalizado
    this.http.get('http://localhost:8081/api/v1/dashboard/tarefas-finalizado')
      .subscribe( //captura a resposta da API
        (dados) => {

          const status: string[] = [];
          const quantidade: number[] = [];

          (dados as any[]).forEach((item) => {
            status.push(item.status);
            quantidade.push(item.quantidade);
          });

          this.graficoBarras.set(
            new Chart({
              chart: { type: 'bar' },
              title: { text: 'Tarefas por status' },
              subtitle: { text: 'Quantidade de tarefas finalizadas e pendentes.' },
              xAxis: {
                categories: status,
                crosshair: true,
                title: { text: 'Status da tarefa' }
              },
              yAxis: {
                min: 0,
                title: { text: 'Quantidade' }
              },
              plotOptions: {
                column: {
                  borderRadius: 5
                }
              },
              series: [{
                name: 'Tarefas',
                type: 'column',
                data: quantidade
              }],
              legend: { enabled: false, },
              credits: { enabled: false }
            }));

        }
      );

    //consultar as tarefas por categoria
    this.http.get('http://localhost:8081/api/v1/dashboard/tarefas-categoria')
      .subscribe( //captura a resposta da API
        (dados) => {

          const categoria: string[] = [];
          const quantidade: number[] = [];

          (dados as any[]).forEach((item) => {
            categoria.push(item.categoria);
            quantidade.push(item.quantidade);
          });

          this.graficoColunas.set(
            new Chart({
              chart: { type: 'column' },
              title: { text: 'Tarefas por categoria' },
              subtitle: { text: 'Quantidade de tarefas cadastradas para cada categoria na agenda.' },
              xAxis: {
                categories: categoria,
                crosshair: true,
                title: { text: 'Categoria da tarefa' }
              },
              yAxis: {
                min: 0,
                title: { text: 'Quantidade' }
              },
              plotOptions: {
                column: {
                  borderRadius: 5
                }
              },
              series: [{
                name: 'Tarefas',
                type: 'column',
                data: quantidade
              }],
              legend: { enabled: false, },
              credits: { enabled: false }
            }));
        }
      );

  }
}
