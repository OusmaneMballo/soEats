import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutmenuphotoComponent } from './restaurant/ajoutmenuphoto/ajoutmenuphoto.component';
import { ListeRestaurantComponent} from './restaurant/liste-restaurant/liste-restaurant.component';
import { PageAccueilRestaurantComponent } from './restaurant/page-accueil-restaurant/page-accueil-restaurant.component';
import { ReservationComponent } from './reservation/reservation/reservation.component';
import { CreationRestoComponent } from './restaurant/creation-resto/creation-resto.component';
import { DetailRestaurantComponent} from 'src/app/restaurant/detail-restaurant/detail-restaurant.component';
import { ReservationClientComponent } from './reservation/reservation-client/reservation-client.component';
import { SecurityGuard } from 'src/app/security.guard';
import { ListProduitComponent } from './restaurant/produit/list-produit/list-produit.component';
import { ListeMenuComponent } from './menu/liste-menu/liste-menu.component';
import { ClientMenuComponent } from './menu/client-menu/client-menu.component';
import { ListeCommandesComponent } from './commande/liste-commandes/liste-commandes.component';
import { DetailsCommandeComponent } from './commande/details-commande/details-commande.component';
import { AProposComponent } from './footer/a-propos/a-propos.component';
import { ContactFormComponent } from './footer/contact-form/contact-form.component';
import { VoirCardComponent } from './card/voir-card/voir-card.component';
import { ConfidentialiteComponent } from './footer/confidentialite/confidentialite.component';
import { AjoutCommandeComponent } from './commande/ajout-commande/ajout-commande.component';
import { ConditionsComponent } from './footer/conditions/conditions.component';
import { ListPromotionComponent } from './promotion/list-promotion/list-promotion.component';
import { DashboardComponent } from './reporting/dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { PageAccueilSupermarcheComponent } from './supermarche/page-accueil-supermarche/page-accueil-supermarche.component';
import { CreationSupermarcheComponent } from './supermarche/creation-supermarche/creation-supermarche.component';
import { ListCommandeComponent } from './supermarche/commandes/list-commande/list-commande.component';
import { DetailCommandeComponent } from './supermarche/commandes/detail-commande/detail-commande.component';
import { ListProduitSupermarcheComponent } from './supermarche/list-produit-supermarche/list-produit-supermarche.component';
import { ListRayonsComponent } from './supermarche/rayon/list-rayons/list-rayons.component';
import { ListPromotionSupermarcheComponent } from './supermarche/promotion/list-promotion-supermarche/list-promotion-supermarche.component';


const routes: Routes = [
  { path: '',
  redirectTo: '/restaurants',
  pathMatch: 'full' 
},
{
  path: "restaurants",
  component: HeaderComponent
},
{
  path: "restaurant/:slugId",
  redirectTo: '/restaurants',
},
{
  path: "restaurant/:slugId/edit/:reservationId",
  component: DetailRestaurantComponent
},
{
  path: "apropos",
  component: AProposComponent
},
{
  path: "confidentialite",
  component: ConfidentialiteComponent
},
{
  path: "conditions",
  component: ConditionsComponent
},
{
  path: "restaurant/:slugId/menus",
  redirectTo: '/restaurants',
},
{
  path: "contact",
  component: ContactFormComponent
},
{
  path: "restaurateur/:ownerId/:slugId/reservations",
  component: ReservationComponent,
  canActivate: [SecurityGuard]
},
{
  path: "restaurateur/:ownerId/reports",
  component: DashboardComponent,
  canActivate: [SecurityGuard]
},
{
  path: "restaurateurs/:ownerId/:slugId/commandes",
  component: ListeCommandesComponent,
  canActivate: [SecurityGuard]
},
{
  path: "restaurant/:slugId/commande",
  redirectTo: '/restaurants',
},
{
  path: "restaurateurs/:ownerId/:slugId/commandes/details/:commandeId",
  component: DetailsCommandeComponent,
  canActivate: [SecurityGuard]
},
{
  path: "restaurants/client/:slugId/commande/details/:commandeId",
  component: DetailsCommandeComponent,
},
{
  path: "restaurateur/:ownerId/:slugId/produits",
  component: ListProduitComponent,
  canActivate: [SecurityGuard]
},
{
  path: "restaurateur/:ownerId/:slugId/promotions",
  component: ListPromotionComponent,
  canActivate: [SecurityGuard]
},
{
  path: "restaurateurs/:ownerId",
  component: CreationRestoComponent,
  canActivate: [SecurityGuard]
},
{
  path: "restau/reservation",
  redirectTo: '/restaurants',
},
{
  path: "ajoutmenuphoto",
  component: AjoutmenuphotoComponent,
  canActivate: [SecurityGuard]
},
{
  path: "restaurateurs/:ownerId/:slugId",
  component: PageAccueilRestaurantComponent,
  canActivate: [SecurityGuard]
},
{
  path: "restaurateurs/:ownerId/:slugId/menus",
  component: ListeMenuComponent,
  canActivate: [SecurityGuard]
},
{
  path: "restaurant/:slugId/carte",
  redirectTo: '/restaurants',
},
{
  path: "supermarketmanager/:ownerId",
  component: CreationSupermarcheComponent,
  canActivate: [SecurityGuard]
},
{
  path: "manager/:ownerId/:slugId/commandes",
  component: ListCommandeComponent,
  canActivate: [SecurityGuard]
},
{
  path: "manager/:ownerId/:slugId/commandes/details/:commandeId",
  component: DetailCommandeComponent,
  canActivate: [SecurityGuard]
},
{
  path: "manager/:ownerId/:slugId/produits",
  component: ListProduitSupermarcheComponent,
  canActivate: [SecurityGuard]
},
{
  path: "manager/client/:slugId/commande/details/:commandeId",
  component: DetailCommandeComponent,
},
{
  path: "manager/:slugId/commande",
  redirectTo: '/restaurants',
},
{
  path: "manager/:ownerId/:slugId",
  component: PageAccueilSupermarcheComponent,
  canActivate: [SecurityGuard]
},
{
  path: "manager/:ownerId/:slugId/rayons",
  component: ListRayonsComponent,
  canActivate: [SecurityGuard]
},
{
  path: "manager/:ownerId/:slugId/promotions",
  component: ListPromotionSupermarcheComponent,
  canActivate: [SecurityGuard]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
