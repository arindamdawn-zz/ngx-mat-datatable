import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShimmerLoaderComponent } from "./shimmer-loader.component";

@NgModule({
  declarations: [ShimmerLoaderComponent],
  imports: [CommonModule],
  exports: [ShimmerLoaderComponent]
})
export class ShimmerLoaderModule {}
