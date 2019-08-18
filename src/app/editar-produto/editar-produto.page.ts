import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ProdutosService } from '../produtos.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.page.html',
  styleUrls: ['./editar-produto.page.scss'],
})
export class EditarProdutoPage implements OnInit {
  private produto: Produto;
  private title: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private api: ProdutosService,
    private loadingCtrl: LoadingController
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (parseInt(id, 10) !== 0 && id !== null) {
      this.getProduto(id);
      this.title = 'Editar Produto';
    } else {
      this.produto = new Produto();
      this.title = 'Criar Produto';
    }
  }

  ngOnInit() {}

  async getProduto(id: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading'
    });

    await loading.present();
    await this.api.getProdutosById(id)
      .subscribe(res => {
        console.log(res);
        this.produto = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  async salvar() {
    await this.api.postProdutos(this.produto)
      .subscribe(res => {
        this.router.navigateByUrl('/produtos');
      }, (err) => {
        console.log(err);
      });
  }
}
