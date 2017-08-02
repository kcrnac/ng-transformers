import { Directive, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';

declare var $: any

@Directive({
    selector: '[ui-select-data]'
})
export class SemanticUIMultiselectDataInitDirective implements OnInit, OnDestroy {

    constructor(private el: ElementRef) {}

    @Input('ui-select-data') options: string[];

    public ngOnInit() {
        
        $('.ui.dropdown').dropdown('set selected', this.options);
    }

    ngAfterContentChecked(): void {
        $('.ui.dropdown').dropdown('set selected', this.options);
    }

    public ngOnDestroy() {
    }

}


declare var componentHandler : any;

@Directive({ selector: '[upgrade-components]' })
export class UpgradeComponentsDirective{

    @Input('upgrade-components')
    set upgradeComponents(upgrade : boolean){
        
        $('.ui.dropdown').dropdown('set selected', ['sword']);
    }
}