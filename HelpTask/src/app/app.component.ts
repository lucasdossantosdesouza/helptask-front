import { SharedService } from 'src/app/services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HelpTask';
  showTemplate: boolean = false;
  public shared: SharedService;

  constructor(){
    this.shared = SharedService.getInstance();
  }

  ngOnInit(): void {
    this.shared.showTemplate.subscribe(
      (show: boolean) => this.showTemplate = show
    );
  }

}
