import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, Injectable, Input, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';

function ShimmerLoaderComponent_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 5);
    ɵngcc0.ɵɵelement(1, "p");
    ɵngcc0.ɵɵelementEnd();
} }
function ShimmerLoaderComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵtemplate(1, ShimmerLoaderComponent_div_1_div_1_Template, 2, 0, "div", 4);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r56 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r56.items);
} }
function ShimmerLoaderComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div");
    ɵngcc0.ɵɵelement(1, "p");
    ɵngcc0.ɵɵelementEnd();
} }
function ShimmerLoaderComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 6);
    ɵngcc0.ɵɵtemplate(1, ShimmerLoaderComponent_div_2_div_1_Template, 2, 0, "div", 7);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r57 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r57.items);
} }
let ShimmerLoaderService = class ShimmerLoaderService {
    constructor() {
    }
};
ShimmerLoaderService.ɵfac = function ShimmerLoaderService_Factory(t) { return new (t || ShimmerLoaderService)(); };
ShimmerLoaderService.ɵprov = ɵɵdefineInjectable({ factory: function ShimmerLoaderService_Factory() { return new ShimmerLoaderService(); }, token: ShimmerLoaderService, providedIn: "root" });

let ShimmerLoaderComponent = class ShimmerLoaderComponent {
    constructor() {
        this.loaderType = "datatable";
    }
    ngOnChanges(changes) {
        this.items = this.generateFakeSkeleton(changes.count.currentValue);
    }
    ngOnInit() { }
    generateFakeSkeleton(count) {
        const indexes = [];
        for (let i = 0; i < count; i++) {
            indexes.push(i);
        }
        return indexes;
    }
};
ShimmerLoaderComponent.ɵfac = function ShimmerLoaderComponent_Factory(t) { return new (t || ShimmerLoaderComponent)(); };
ShimmerLoaderComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: ShimmerLoaderComponent, selectors: [["lib-shimmer-loader"]], inputs: { loaderType: "loaderType", count: "count" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], decls: 3, vars: 2, consts: [[1, "shimmer-loader"], ["class", "skeleton", 4, "ngIf"], ["class", "skeleton card-loader", 4, "ngIf"], [1, "skeleton"], ["class", "skeleton-card", 4, "ngFor", "ngForOf"], [1, "skeleton-card"], [1, "skeleton", "card-loader"], [4, "ngFor", "ngForOf"]], template: function ShimmerLoaderComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, ShimmerLoaderComponent_div_1_Template, 2, 1, "div", 1);
        ɵngcc0.ɵɵtemplate(2, ShimmerLoaderComponent_div_2_Template, 2, 1, "div", 2);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.loaderType === "datatable");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.loaderType === "schedule_card");
    } }, directives: [ɵngcc1.NgIf, ɵngcc1.NgForOf], styles: [".skeleton[_ngcontent-%COMP%]   .fake-image[_ngcontent-%COMP%], .skeleton[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .skeleton[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .skeleton[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{-webkit-animation:1s linear infinite loading;animation:1s linear infinite loading;background:no-repeat #f6f7f8;background-image:-webkit-gradient(linear,right top,left top,from(#f6f7f8),color-stop(20%,#edeef1),color-stop(40%,#f6f7f8),to(#f6f7f8));background-image:linear-gradient(to left,#f6f7f8 0,#edeef1 20%,#f6f7f8 40%,#f6f7f8 100%)}.skeleton[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{height:22px;width:200px}.skeleton[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{height:18px;width:200px}.skeleton[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{height:45px;width:100%}.skeleton[_ngcontent-%COMP%]   .fake-image[_ngcontent-%COMP%]{height:100px;width:100%}@-webkit-keyframes loading{0%{background-position:-100px}100%{background-position:200px}}@keyframes loading{0%{background-position:-100px}100%{background-position:200px}}.card-loader[_ngcontent-%COMP%]{display:-webkit-box;display:flex;flex-wrap:wrap}mat-card[_ngcontent-%COMP%]{margin-bottom:2rem;height:200px;width:33.33%}"], changeDetection: 0 });
__decorate([
    Input()
], ShimmerLoaderComponent.prototype, "count", void 0);
__decorate([
    Input()
], ShimmerLoaderComponent.prototype, "loaderType", void 0);

let ShimmerLoaderModule = class ShimmerLoaderModule {
};
ShimmerLoaderModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: ShimmerLoaderModule });
ShimmerLoaderModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function ShimmerLoaderModule_Factory(t) { return new (t || ShimmerLoaderModule)(); }, imports: [[CommonModule]] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ShimmerLoaderService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ShimmerLoaderComponent, [{
        type: Component,
        args: [{
                selector: "lib-shimmer-loader",
                template: "<div class=\"shimmer-loader\">\n  <!-- Skeleton Loading UI -->\n  <div class=\"skeleton\" *ngIf=\"loaderType === 'datatable'\">\n    <div *ngFor=\"let item of items\" class=\"skeleton-card\">\n      <p></p>\n    </div>\n  </div>\n\n  <div class=\"skeleton card-loader\" *ngIf=\"loaderType === 'schedule_card'\">\n    <div *ngFor=\"let item of items\">\n      <p></p>\n    </div>\n  </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".skeleton .fake-image,.skeleton h3,.skeleton h4,.skeleton p{-webkit-animation:1s linear infinite loading;animation:1s linear infinite loading;background:no-repeat #f6f7f8;background-image:-webkit-gradient(linear,right top,left top,from(#f6f7f8),color-stop(20%,#edeef1),color-stop(40%,#f6f7f8),to(#f6f7f8));background-image:linear-gradient(to left,#f6f7f8 0,#edeef1 20%,#f6f7f8 40%,#f6f7f8 100%)}.skeleton h3{height:22px;width:200px}.skeleton h4{height:18px;width:200px}.skeleton p{height:45px;width:100%}.skeleton .fake-image{height:100px;width:100%}@-webkit-keyframes loading{0%{background-position:-100px}100%{background-position:200px}}@keyframes loading{0%{background-position:-100px}100%{background-position:200px}}.card-loader{display:-webkit-box;display:flex;flex-wrap:wrap}mat-card{margin-bottom:2rem;height:200px;width:33.33%}"]
            }]
    }], function () { return []; }, { loaderType: [{
            type: Input
        }], count: [{
            type: Input
        }] }); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(ShimmerLoaderModule, { declarations: function () { return [ShimmerLoaderComponent]; }, imports: function () { return [CommonModule]; }, exports: function () { return [ShimmerLoaderComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ShimmerLoaderModule, [{
        type: NgModule,
        args: [{
                declarations: [ShimmerLoaderComponent],
                imports: [CommonModule],
                exports: [ShimmerLoaderComponent]
            }]
    }], null, null); })();

/*
 * Public API Surface of shimmer-loader
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ShimmerLoaderComponent, ShimmerLoaderModule, ShimmerLoaderService };

//# sourceMappingURL=shimmer-loader.js.map