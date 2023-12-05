export interface Imovel {
  id: number;
  nirf: string;
  areatotal: string | number;
  codigoincra: string;
  nomeimovelrural: string;
  situacaoimovel: number;
  endereco: string;
  distrito: string;
  uf: string;
  municipio: string;
  cep: string;
  codigoimune: number;
  sncr: number;
}

export interface PaginacaoMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  previous_page_url: string | null;
}

export interface RespostaPaginada {
  meta: PaginacaoMeta;
  data: Imovel[];
}
