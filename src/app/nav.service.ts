import {Injectable} from '@angular/core';

@Injectable({
providedIn: 'root'
})

export class NavService {
private navIsActive: boolean;
public wasHome = false;
constructor() {
}

  public get getNavi(): boolean{
    return this.navIsActive;
  }
  public set setNavi(boo: boolean) {
    this.navIsActive = boo;
  }
}


