import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appScaleBlock]'
})
export class ScaleBlockDirective {

  constructor() { }

  @HostBinding('class.scaleBlock') isHover = false;
  @HostListener('mouseover') onMouseOver(){
    this.isHover=true;
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.isHover=false;
  }

}
