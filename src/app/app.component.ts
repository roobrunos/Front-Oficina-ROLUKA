import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { PrimeIcons } from 'primeng/api'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MenubarModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Ordens de Serviço',
        icon: PrimeIcons.BRIEFCASE, // tipado
        items: [
          { label: 'Listar', icon: PrimeIcons.LIST, routerLink: '/ordens' },
          { label: 'Nova', icon: PrimeIcons.PLUS, routerLink: '/ordens/nova' }
        ]
      },
      {
        label: 'Clientes',
        icon: PrimeIcons.USERS,
        items: [
          { label: 'Listar', icon: PrimeIcons.LIST, routerLink: '/cliente-list' },
          { label: 'Novo', icon: PrimeIcons.PLUS, routerLink: '/cliente-form' }
        ]
      },
      {
        label: 'Veículos',
        icon: PrimeIcons.CAR,
        items: [
          { label: 'Listar', icon: PrimeIcons.LIST, routerLink: '/veiculo-list' },
          { label: 'Novo', icon: PrimeIcons.PLUS, routerLink: '/veiculo-form' }
        ]
      }
    ];
  }
}
