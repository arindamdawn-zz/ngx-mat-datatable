import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";

@Component({
  selector: "lib-shimmer-loader",
  templateUrl: "./shimmer-loader.component.html",
  styleUrls: ["./shimmer-loader.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShimmerLoaderComponent implements OnInit, OnChanges {
  @Input() count: number;
  @Input() loaderType: "datatable" | "schedule_card" = "datatable";
  items: number[];
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.items = this.generateFakeSkeleton(changes.count.currentValue);
  }

  ngOnInit() {}

  generateFakeSkeleton(count: number): Array<number> {
    const indexes = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }
}
