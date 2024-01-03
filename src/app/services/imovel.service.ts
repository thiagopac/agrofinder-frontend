import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Imovel, RespostaPaginada } from 'src/app/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ImovelService {
  constructor(private http: HttpClient) {}

  getForId(id: number): Observable<Imovel> {
    return this.http.get<Imovel>(`${environment.apiUrl}/imoveis/id/${id}`);
  }

  buscarComFiltros(
    uf?: string,
    municipio?: string,
    nirf?: string,
    codigoincra?: string,
    nomeimovelrural?: string,
    areaminima?: number,
    areamaxima?: number,
    colunaOrdenacao?: string,
    direcaoOrdenacao?: string,
    page: number = 1,
    size: number = 30
  ): Observable<RespostaPaginada> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (uf) {
      params = params.set('uf', uf);
    }
    if (municipio) {
      params = params.set('municipio', municipio);
    }
    if (nirf) {
      params = params.set('nirf', nirf);
    }
    if (codigoincra) {
      params = params.set('codigoincra', codigoincra);
    }
    if (nomeimovelrural) {
      params = params.set('nomeimovelrural', nomeimovelrural);
    }

    if (areaminima !== undefined) {
      params = params.set('areaminima', areaminima.toString());
    }
    if (areamaxima !== undefined) {
      params = params.set('areamaxima', areamaxima.toString());
    }

    if (colunaOrdenacao) {
      params = params.set('colunaOrdenacao', colunaOrdenacao);
    }

    if (direcaoOrdenacao) {
      params = params.set('direcaoOrdenacao', direcaoOrdenacao);
    }

    return this.http.get<RespostaPaginada>(
      `${environment.apiUrl}/imoveis/busca`,
      { params }
    );
  }
}
