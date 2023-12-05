import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { Imovel } from 'src/app/models/interfaces';
import { ImovelService } from 'src/app/services/imovel.service';

@Component({
  selector: 'app-imoveis',
  templateUrl: './imoveis.component.html',
  styleUrls: ['./imoveis.component.scss'],
})
export class ImoveisComponent implements OnInit {
  imoveis: Imovel[] | undefined;
  totalRecords: number | undefined;
  loading: boolean | undefined;

  selectedUf: string = '';
  nirf: string | undefined;
  municipio: string | undefined;
  codigoincra: string | undefined;
  nomeimovelrural: string | undefined;

  ufs = [
    { sigla: '', value: 'Estado' },
    { sigla: 'AC', value: 'Acre' },
    { sigla: 'AL', value: 'Alagoas' },
    { sigla: 'AP', value: 'Amapá' },
    { sigla: 'AM', value: 'Amazonas' },
    { sigla: 'BA', value: 'Bahia' },
    { sigla: 'CE', value: 'Ceará' },
    { sigla: 'DF', value: 'Distrito Federal' },
    { sigla: 'ES', value: 'Espírito Santo' },
    { sigla: 'GO', value: 'Goiás' },
    { sigla: 'MA', value: 'Maranhão' },
    { sigla: 'MT', value: 'Mato Grosso' },
    { sigla: 'MS', value: 'Mato Grosso do Sul' },
    { sigla: 'MG', value: 'Minas Gerais' },
    { sigla: 'PA', value: 'Pará' },
    { sigla: 'PB', value: 'Paraíba' },
    { sigla: 'PR', value: 'Paraná' },
    { sigla: 'PE', value: 'Pernambuco' },
    { sigla: 'PI', value: 'Piauí' },
    { sigla: 'RJ', value: 'Rio de Janeiro' },
    { sigla: 'RN', value: 'Rio Grande do Norte' },
    { sigla: 'RS', value: 'Rio Grande do Sul' },
    { sigla: 'RO', value: 'Rondônia' },
    { sigla: 'RR', value: 'Roraima' },
    { sigla: 'SC', value: 'Santa Catarina' },
    { sigla: 'SP', value: 'São Paulo' },
    { sigla: 'SE', value: 'Sergipe' },
    { sigla: 'TO', value: 'Tocantins' },
  ];

  situacoesImovel: { [key: number]: string } = {
    2: 'Ativo',
    83: 'Inconsistência de Dados Cadastrais-Área Superior a 1,5 milhão de ha',
    88: 'Inconsistência de Dados Cadastrais-Indicativo de Duplicidade',
    93: 'Inconsistência de Dados Cadastrais-Indicativo de Inconsistência',
    94: 'Inconsistência de Dados Cadastrais-Contribuinte não Encontrado no CPF/CNPJ',
    95: 'Inconsistência de Dados Cadastrais-Município de Localização do Imóvel Inválido',
    96: 'Inconsistência de Dados Cadastrais-CPF ou CNPJ inválido',
    98: 'Inconsistência de Dados Cadastrais - CPF Cancelado, Nulo ou Suspenso ou CNPJ Baixado/Inapto Inex. Fato, Nulo ou Suspenso',
    46: 'Perda de propriedade decorrente de usucapião',
    47: 'Arrematação em Hasta Pública',
    48: 'Renúncia de Propriedade',
    49: 'Decisão Administrativa',
    50: 'Cancelamento por Processo/SRL',
    51: 'Transformação em Imóvel Urbano',
    52: 'Anexação Total',
    55: 'Inscrição Indevida',
    56: 'Desapropriação pelo Poder Público',
    57: 'Desapropriação por PJ de Direito Privado',
    58: 'Duplicidade',
    59: 'Determinação Judicial',
  };

  isentoImune: { [key: number]: string } = {
    0: 'Não',
    1: 'Sim',
  };

  sncrDescricoes: { [key: number]: string } = {
    1: 'Vinculação Provisória Realizada',
    2: 'Vinculação Confirmada',
    3: 'Desvinculado',
    4: 'Descaracterização de Destinação Rural',
  };

  colunas: any[] = [
    { nome: 'NIRF', campo: 'nirf' },
    { nome: 'Área (ha)', campo: 'areaTotal' },
    { nome: 'Cód. imóvel rural (INCRA)', campo: 'codigoIncra' },
    { nome: 'Sit. do Imóvel', campo: 'situacaoImovel' },
    { nome: 'Distrito', campo: 'distrito' },
    { nome: 'Nome do Imóvel', campo: 'nomeImovelRural' },
    { nome: 'Endereço', campo: 'endereco' },
    { nome: 'Município', campo: 'municipio' },
    { nome: 'UF', campo: 'uf' },
    { nome: 'CEP', campo: 'cep' },
    { nome: 'Imune/Isento', campo: 'isentoImune' },
    { nome: 'Cód. SNCR', campo: 'codigoSncr' },
    { nome: 'Dt. da Inscrição', campo: 'dataInscricao' },
  ];

  colunasSelecionadas: string[] = this.colunas.map((c) => c.campo);

  constructor(
    private imovelService: ImovelService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.loading = true;
    this.primengConfig.ripple = true;
    this.loadImoveis({ first: 0, rows: 10 });
  }

  loadImoveis(event: TableLazyLoadEvent) {
    this.filtrarImoveis(event.first, event.rows!);
  }

  filtrarImoveis(first: number = 0, rows: number = 10) {
    this.loading = true;
    const page = first / rows + 1;
    const size = rows;

    this.imovelService
      .buscarComFiltros(
        this.selectedUf,
        this.municipio,
        this.nirf,
        this.codigoincra,
        this.nomeimovelrural,
        page,
        size
      )
      .subscribe((response) => {
        this.imoveis = response.data;
        this.totalRecords = response.meta.total;
        this.loading = false;
      });
  }

  getSituacaoImovel(codigo: number): string {
    return this.situacoesImovel[codigo] || 'Desconhecido';
  }

  getIsentoImune(codigo: number): string {
    return this.isentoImune[codigo] || 'Desconhecido';
  }

  getDescricaoSncr(codigo: number): string {
    return this.sncrDescricoes[codigo] || 'Desconhecido';
  }

  clear() {
    this.selectedUf = '';
    this.nirf = '';
    this.municipio = '';
    this.codigoincra = '';
    this.nomeimovelrural = '';
    this.filtrarImoveis();
  }
}
