import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey= environment.apikey
const apiUrl= environment.apiUrl
const headers =new HttpHeaders({
  'X-Api-key':apiKey
})
@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinePage=0

  CategoriaActual='';
  categoriaPage=0;

  constructor(private http:HttpClient) { }

  private ejecutarquery<T>(query:string){
    query= apiUrl + query;
    return this.http.get<T>(query,{headers})

  }

  gettopHeadLines(){
    this.headlinePage ++;
    return this.ejecutarquery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinePage}`)
    // return this.http.get<RespuestaTopHeadlines>('https://newsapi.org/v2/top-headlines?country=us&apiKey=0e8fa143a631411ba84a4e401522a264')
  }

 
  getCategoria( categorias: string){
    if(this.CategoriaActual=== categorias){
      this.categoriaPage++
    }else{
      this.categoriaPage=1;
      this.CategoriaActual=categorias
    }
    return this.ejecutarquery<RespuestaTopHeadlines>( `/top-headlines?country=us&category=${categorias}&page=${this.categoriaPage}`)
     // return this.http.get<RespuestaTopHeadlines>('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0e8fa143a631411ba84a4e401522a264')
  }

}
