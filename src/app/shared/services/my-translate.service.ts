import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { dir } from 'console';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private readonly _TranslateService = inject(TranslateService);
  // private readonly _Renderer2 = inject(Renderer2)  // pervent dealing directly with DOM

  //it will make error cause Render2 can't deal with server (it's okay with Component) so you shall make an instane from Render2 

  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(null , null)

  constructor(@Inject(PLATFORM_ID) private platId: object) {
    //logic
    //

    if (isPlatformBrowser(this.platId)) {
      this._TranslateService.setDefaultLang('en');

      this.setLanguage();
    }
  }

  setLanguage(): void {
    let savedlang = localStorage.getItem('lang');

    if (savedlang !== null) {
      // 3 - use the language in the local
      this._TranslateService.use(savedlang!);
    }

    // Change Direction
    if (savedlang === 'en') {
      // document.documentElement.dir = 'ltr'
      this._Renderer2.setAttribute(document.documentElement , 'dir' , 'ltr')
      ;
      this._Renderer2.setAttribute(document.documentElement , 'lang' , 'en')

    } else if (savedlang === 'ar') {
      // document.documentElement.dir = 'rtl';
      this._Renderer2.setAttribute(document.documentElement , 'dir' , 'rtl')

      this._Renderer2.setAttribute(document.documentElement , 'lang' , 'ar')

    }
  }

  changeLanguage(lang: string): void {
    localStorage.setItem('lang', lang); //set language in localStorage (ar , en)
    // this._TranslateService.use(lang); //set language in translate service
    this.setLanguage();
  }
}
