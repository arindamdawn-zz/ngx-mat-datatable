import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-test",
  template: `
    <div>LOL</div>
    <div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [],
})
export class TestComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
