import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({ selector: '[appWindowTab]', standalone: true, exportAs: 'appWindowTab' })
export class WindowTabDirective {
  @Input('appWindowTab') title!: string;
  constructor(public template: TemplateRef<any>) {}
}
