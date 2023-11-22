import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Node } from '../store/node/node.state';
import { Observable } from 'rxjs';
import { Ilocale } from '../store/locale/locale.state';
@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http: HttpClient) { }

  getParentNodes(): Observable<Node[]> {
    return this.http.get<Node[]>(`${environment.apiUrl}/nodes`);
      
  }

  getChildrenNodes(parentId: string): Observable<Node[]> {
    return this.http.get<Node[]>(`${environment.apiUrl}/nodes?parent=${parentId}`);
  }

  getNode(nodeId: string, locale: string): Observable<Node> {
    return this.http.get<Node>(`${environment.apiUrl}/node/${nodeId}?locale=${locale}`);
  }

  getLocales(): Observable<Ilocale[]> {
    return this.http.get<Ilocale[]>(`${environment.apiUrl}/locales`);
  }

  createNode(parent: number, locales: string[]) {
    return this.http.post(`${environment.apiUrl}/node`, { parent, locales });
  }

  deleteNode(nodeId: number) {
    return this.http.delete(`${environment.apiUrl}/node/${nodeId}`);
  }
}
