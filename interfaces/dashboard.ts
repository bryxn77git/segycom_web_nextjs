import { IVisitas } from './visitas';

export interface DashboardSummaryResponse {
    numeroOrdenes      :number;
    ordenesPendientes  :number;
    ordenesEnProceso   :number;
    ordenesFinalizadas :number;
    clientes           :number;
    numeroVisitas      :IVisitas[];
}