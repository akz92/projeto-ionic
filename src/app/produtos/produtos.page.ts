import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  private produtos: any;

  constructor(public api: ProdutosService, public loadingCtrl: LoadingController) {
    this.getProdutos();
  }

  ngOnInit() {}

  async getProdutos() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading'
    });

    await loading.present();
    await this.api.getProdutos()
      .subscribe(res => {
        console.log(res);
        this.produtos = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  async deletarProduto(id: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Apagando'
    });
    await loading.present();
    await this.api.deleteProdutos(id)
      .subscribe(res => {
        console.log(res);
        this.getProdutos();
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
}
