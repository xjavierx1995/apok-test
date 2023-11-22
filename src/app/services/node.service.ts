import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http: HttpClient) { }

  getParentNodes() {
    return this.http.get(`${environment.apiUrl}/nodes`);
  }

  getChildNodes(parent: number) {
    return this.http.get(`${environment.apiUrl}/nodes?parent=${parent}`);
  }

  getNode(nodeId: number, locale: string) {
    return this.http.get(`${environment.apiUrl}/nodes/${nodeId}?locale=${locale}`);
  }

  getLocales() {
    return this.http.get(`${environment.apiUrl}/locales`);
  }

  createNode(parent: number, locales: string[]) {
    return this.http.post(`${environment.apiUrl}/node`, { parent, locales });
  }

  deleteNode(nodeId: number) {
    return this.http.delete(`${environment.apiUrl}/node/${nodeId}`);
  }
}
