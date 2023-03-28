import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { AgmCoreModule} from '@agm/core';
import { ScrollingModule} from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './shared/material.module';
import { AppComponent } from './app.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { ListeRestaurantComponent } from './restaurant/liste-restaurant/liste-restaurant.component';
import { AdminRestaurantComponent } from './restaurant/admin-restaurant/admin-restaurant.component';
import { ListeReservationComponent } from './restaurant/liste-reservation/liste-reservation.component';
import { MatTableModule} from '@angular/material/table';
import { PageAccueilRestaurantComponent } from './restaurant/page-accueil-restaurant/page-accueil-restaurant.component';
import { LogoRestaurantComponent } from './restaurant/logo-restaurant/logo-restaurant.component';
import { ContactRestaurantComponent } from './restaurant/contact-restaurant/contact-restaurant.component';
import { HorairesRestaurantComponent } from './restaurant/horaires-restaurant/horaires-restaurant.component';
import { DescriptionRestaurantComponent } from './restaurant/description-restaurant/description-restaurant.component';
import { MenuRestaurantComponent } from './restaurant/menu-restaurant/menu-restaurant.component';
import { HeaderComponent } from './header/header.component';
import { AjoutHoraireComponent } from './restaurant/ajout-horaire/ajout-horaire.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SideComponent } from './side/side.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';

import { MatFormFieldModule} from '@angular/material/form-field';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserCacheLocation, InteractionType, IPublicClientApplication, LogLevel, PublicClientApplication} from '@azure/msal-browser';

import { MsalGuard, MsalBroadcastService,
  MsalInterceptorConfiguration, MsalService,
   MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG,   
    MsalGuardConfiguration
    } from '@azure/msal-angular';

import { b2cPolicies, apiConfig, isIE, protectedResources, environment, } from 'src/environments/environment';
import { AjoutmenuphotoComponent } from './restaurant/ajoutmenuphoto/ajoutmenuphoto.component';
import { ReservationComponent } from './reservation/reservation/reservation.component';
import { AjoutLogoRestaurantComponent } from './restaurant/logo-restaurant/ajout-logo-restaurant/ajout-logo-restaurant.component';
import { AjoutMenuRestaurantComponent } from './restaurant/menu-restaurant/ajout-menu-restaurant/ajout-menu-restaurant.component';
import { CreationRestoComponent } from './restaurant/creation-resto/creation-resto.component';
import { FormCreationRestoComponent } from './restaurant/form-creation-resto/form-creation-resto.component';
import { MessageComponent } from './message/message.component';
import { DetailRestaurantComponent } from './restaurant/detail-restaurant/detail-restaurant.component';
import { ReservationClientComponent } from './reservation/reservation-client/reservation-client.component';
import { AffichageImageComponent } from './restaurant/menu-restaurant/affichage-image/affichage-image.component';
import { FooterComponent } from './footer/footer.component';
import { MapsComponent } from 'src/app/maps/maps.component';
import { MessageReservComponent } from './message-reserv/message-reserv.component';
import { VariablesGlobales } from 'src/app/shared/globale';
import { ImagesRestaurantComponent } from './restaurant/images-restaurant/images-restaurant.component';
import { AjourImagesRestaurantComponent } from './restaurant/images-restaurant/ajour-images-restaurant/ajour-images-restaurant.component';
import { ModifModalComponent } from './modif-modal/modif-modal.component';
import { AjoutProduitComponent } from './restaurant/produit/ajout-produit/ajout-produit.component';
import { ComposerMenuComponent } from './menu/composer-menu/composer-menu.component';
import { ListProduitComponent } from './restaurant/produit/list-produit/list-produit.component';
import { ListeMenuComponent } from './menu/liste-menu/liste-menu.component';
import { EditProduitComponent } from './restaurant/produit/edit-produit/edit-produit.component';
import { ModifMenuComponent } from './menu/modif-menu/modif-menu.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ClientMenuComponent } from './menu/client-menu/client-menu.component';
import { ChoixMenuComponent } from 'src/app/menu/client-menu/choix-menu/choix-menu.component';
import { VoirCardComponent } from './card/voir-card/voir-card.component';
import { OptionPaiementComponent } from './restaurant/option-paiement/option-paiement.component';
import { ListeCommandesComponent } from './commande/liste-commandes/liste-commandes.component';
import { AjoutCommandeComponent } from './commande/ajout-commande/ajout-commande.component';
import { DetailsCommandeComponent } from './commande/details-commande/details-commande.component';
import { AProposComponent } from './footer/a-propos/a-propos.component';
import { AuthintercepteurService } from './authintercepteur.service';
import { DetailsMenuComponent } from './menu/details-menu/details-menu.component';
import { ContactFormComponent } from './footer/contact-form/contact-form.component';
import { ShowProductsMenuComponent } from './commande/show-products-menu/show-products-menu.component';
import { PanierComponent } from './commande/panier/panier.component';
import { DetailsMenuClientComponent } from './card/details-menu-client/details-menu-client.component';
import { EditReservationComponent } from './reservation/edit-reservation/edit-reservation.component';
import { RaisonDannulationComponent } from './reservation/raison-dannulation/raison-dannulation.component';
import { InterceptorService } from './loader/interceptor.service';
import { ConfidentialiteComponent } from './footer/confidentialite/confidentialite.component';
import { ConditionsComponent } from './footer/conditions/conditions.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { TypeProductComponent } from './restaurant/produit/type-product/type-product.component';
import { AjoutPromoComponent } from './promotion/ajout-promo/ajout-promo.component';
import { AddTypeComponent } from './restaurant/produit/add-type/add-type.component';
import { AddCategorieComponent } from './restaurant/add-categorie/add-categorie.component';
import { ListPromotionComponent } from './promotion/list-promotion/list-promotion.component';
import { EditerPromoComponent } from './promotion/editer-promo/editer-promo.component';
import { UpdateCategoryComponent } from './restaurant/update-category/update-category.component';
import { DashboardComponent } from './reporting/dashboard/dashboard.component';
import { FormCreationSuperMarcheComponent } from './supermarche/form-creation-super-marche/form-creation-super-marche.component';
import { PageAccueilSupermarcheComponent } from './supermarche/page-accueil-supermarche/page-accueil-supermarche.component';
import { LogoSupermarcheComponent } from './supermarche/logo-supermarche/logo-supermarche.component';
import { AjoutLogoSupermarcheComponent } from './supermarche/logo-supermarche/ajout-logo-supermarche/ajout-logo-supermarche.component';
import { DescriptionSupermarcheComponent } from './supermarche/description-supermarche/description-supermarche.component';
import { ModifModalSupermarcheComponent } from './supermarche/modif-modal-supermarche/modif-modal-supermarche.component';
import { ContactSupermarcheComponent } from './supermarche/contact-supermarche/contact-supermarche.component';
import { MenuSupermarcheComponent } from './supermarche/menu-supermarche/menu-supermarche.component';
import { AjoutHoraireSupermarcheComponent } from './supermarche/ajout-horaire-supermarche/ajout-horaire-supermarche.component';
import { HorairesSupermarcheComponent } from './supermarche/horaires-supermarche/horaires-supermarche.component';
import { ImagesSupermarcheComponent } from './supermarche/images-supermarche/images-supermarche.component';
import { AjoutImagesSupermarcheComponent } from './supermarche/images-supermarche/ajout-images-supermarche/ajout-images-supermarche.component';
import { AjoutRayonComponent } from './supermarche/ajout-rayon/ajout-rayon.component';
import { AjoutCategorieComponent } from './supermarche/ajout-categorie/ajout-categorie.component';
import { AjoutImageRayonComponent } from './supermarche/ajout-image-rayon/ajout-image-rayon.component';
import { AjoutProduitSupermarcheComponent } from './supermarche/ajout-produit-supermarche/ajout-produit-supermarche.component';
import { CreationSupermarcheComponent } from './supermarche/creation-supermarche/creation-supermarche.component';
import { ListCommandeComponent } from './supermarche/commandes/list-commande/list-commande.component';
import { DetailCommandeComponent } from './supermarche/commandes/detail-commande/detail-commande.component';
import { ListProduitSupermarcheComponent } from './supermarche/list-produit-supermarche/list-produit-supermarche.component';
import { ListRayonsComponent } from './supermarche/rayon/list-rayons/list-rayons.component';
import { ListProduitRayonComponent } from './supermarche/rayon/list-produit-rayon/list-produit-rayon.component';
import { AjoutPromotionSupermarcheComponent } from './supermarche/promotion/ajout-promotion-supermarche/ajout-promotion-supermarche.component';
import { ListPromotionSupermarcheComponent } from './supermarche/promotion/list-promotion-supermarche/list-promotion-supermarche.component';
import { EditPromotionSupermarcheComponent } from './supermarche/promotion/edit-promotion-supermarche/edit-promotion-supermarche.component';

export function loggerCallback(logLevel: LogLevel, message: string) {
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientId,
      authority: b2cPolicies.authorities.signIn.authority,
      knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
      redirectUri: environment.REDIRECT_URI,
      postLogoutRedirectUri: environment.REDIRECT_URI,
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(protectedResources.Api.endpoint, protectedResources.Api.scopes);

  protectedResourceMap.set(apiConfig.webApi, apiConfig.b2cScopes);
  protectedResourceMap.get;
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...apiConfig.b2cScopes],
    },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ListeRestaurantComponent,
    AdminRestaurantComponent,
    ListeReservationComponent,
    PageAccueilRestaurantComponent,
    LogoRestaurantComponent,
    ContactRestaurantComponent,
    HorairesRestaurantComponent,
    DescriptionRestaurantComponent,
    MenuRestaurantComponent,
    HeaderComponent,
    AjoutHoraireComponent,
    NavbarComponent,
    SidenavComponent,
    SideComponent,
    AjoutLogoRestaurantComponent,
    AjoutmenuphotoComponent,
    ReservationComponent,
    AjoutMenuRestaurantComponent,
    CreationRestoComponent,
    FormCreationRestoComponent,
    MessageComponent,
    DetailRestaurantComponent,
    ReservationClientComponent,
    AffichageImageComponent,
    FooterComponent,
    MapsComponent,
    MessageReservComponent,
    ImagesRestaurantComponent,
    AjourImagesRestaurantComponent,
    ModifModalComponent,
    AjoutProduitComponent,
    ComposerMenuComponent,
    ListProduitComponent,
    ListeMenuComponent,
    EditProduitComponent,
    ModifMenuComponent,
    ClientMenuComponent,
    ChoixMenuComponent,
    VoirCardComponent,
    OptionPaiementComponent,
    ListeCommandesComponent,
    AjoutCommandeComponent,
    DetailsCommandeComponent,
    AProposComponent,
    DetailsMenuComponent,
    ContactFormComponent,
    ShowProductsMenuComponent,
    PanierComponent,
    DetailsMenuClientComponent,
    EditReservationComponent,
    RaisonDannulationComponent,
    ConfidentialiteComponent,
    ConditionsComponent,
    TypeProductComponent,
    AjoutPromoComponent,
    AddTypeComponent,
    AddCategorieComponent,
    ListPromotionComponent,
    EditerPromoComponent,
    UpdateCategoryComponent,
    DashboardComponent,
    FormCreationSuperMarcheComponent,
    PageAccueilSupermarcheComponent,
    LogoSupermarcheComponent,
    AjoutLogoSupermarcheComponent,
    DescriptionSupermarcheComponent,
    ModifModalSupermarcheComponent,
    ContactSupermarcheComponent,
    MenuSupermarcheComponent,
    AjoutHoraireSupermarcheComponent,
    HorairesSupermarcheComponent,
    ImagesSupermarcheComponent,
    AjoutImagesSupermarcheComponent,
    AjoutRayonComponent,
    AjoutCategorieComponent,
    AjoutImageRayonComponent,
    AjoutProduitSupermarcheComponent,
    CreationSupermarcheComponent,
    ListCommandeComponent,
    DetailCommandeComponent,
    ListProduitSupermarcheComponent,
    ListRayonsComponent,
    ListProduitRayonComponent,
    AjoutPromotionSupermarcheComponent,
    ListPromotionSupermarcheComponent,
    EditPromotionSupermarcheComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
    AgmCoreModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatToolbarModule,
    MatTableModule,
    HttpClientModule,
    MatFormFieldModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgSelectModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthintercepteurService,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    MaterialModule,
    VariablesGlobales,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
