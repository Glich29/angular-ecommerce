import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public getImgSrc(imageUrl: string): string {
    const pattern: RegExp = new RegExp("^(http://localhost:4200/)category(/.*)$");
    var result: string = imageUrl.replace(pattern, '$1Makar$2');
    return result;
}
}
