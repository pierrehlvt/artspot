import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'listing',
        loadChildren: () => import('../pages/listing/listing.module').then(m => m.ListingPageModule)
      },
      {
        path: 'add',
        loadChildren: () => import('../pages/add/add.module').then(m => m.AddPageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('../pages/map/map.module').then(m => m.MapPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/listing',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/listing',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
