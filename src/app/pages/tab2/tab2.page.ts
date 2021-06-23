import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment, { static: true }) segment: IonSegment;


  categorias=[ 'business', 'entertainment', 'general', 'healths', 'cience', 'sports', 'technology']
  
  noticias: Article[]=[];
  constructor( private noticiasSerc:NoticiasService) {}

  ngOnInit(){
    this.segment.value = this.categorias[0];
    this.cargaNoticias(this.categorias[0])
  }

  cambioCategoria(event){
    this.noticias=[];
    this.cargaNoticias(event.detail.value)
  }

  cargaNoticias(categoria:string,event?){


    this.noticiasSerc.getCategoria(categoria).subscribe( res=>{
      console.log(res);
      this.noticias.push(...res.articles);
      if(event){
        event.target.complete()
      }
    })
  }


  loadData(event){
    this.cargaNoticias(this.segment.value,event);
  }

}
