import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private elem: ElementRef) {
    console.log('Element we got ', this.elem.nativeElement);
    this.elem.nativeElement.style.color = 'yellow';
  }
}
