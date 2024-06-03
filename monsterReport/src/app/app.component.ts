import { Component } from '@angular/core';

@Component({
  // How we add our component to HTML pages <app-root>
  selector: 'app-root',
  // Our HTML page for the component (what replaces our tag)
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'monsterReport';
}
