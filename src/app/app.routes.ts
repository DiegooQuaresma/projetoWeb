import { Routes } from '@angular/router';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { CadastrarTarefas } from './components/pages/cadastrar-tarefas/cadastrar-tarefas';
import { ConsultarTarefas } from './components/pages/consultar-tarefas/consultar-tarefas';
import { EditarTarefas } from './components/pages/editar-tarefas/editar-tarefas';

//Configurar as rotas de navegação do projeto
export const routes: Routes = [
    {
        path: 'dashboard', /* criando a rota */
        component: Dashboard /* página que a rota irá abrir */
    },
    {
        path: 'cadastrar-tarefas', /* criando a rota */
        component: CadastrarTarefas /* página que a rota irá abrir */
    },
    {
        path: 'consultar-tarefas', /* criando a rota */
        component: ConsultarTarefas /* página que a rota irá abrir */
    },
    {
        path: 'editar-tarefas/:id', /* criando a rota */
        component: EditarTarefas /* página que a rota irá abrir */
    },
    {
        path: '', pathMatch: 'full', //mapear a página inicial
        redirectTo: 'dashboard' //redirecionar para a rota dashboard
    }
];
