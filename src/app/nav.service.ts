import {Injectable} from '@angular/core';

@Injectable({
providedIn: 'root'
})

export class NavService {
private navIsActive: boolean;
public wasHome = false;
private toggle = 0;
constructor() {
}

  public get getNavi(): boolean {
    return this.navIsActive;
  }
  public set setNavi(boo: boolean) {
    this.navIsActive = boo;
  }
  public get Toggle(): number {
    return this.toggle;
  }
  public set Toggle(toogle: number) {
    this.toggle = toogle;
  }
}


