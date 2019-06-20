import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import {saveAs} from 'file-saver';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'master-ng';

  @ViewChild('upload') upload: FileUpload;

  constructor(public game: GameService) {}

  ngOnInit(): void {
  }

  loadJsonGame(event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.game.setGame(JSON.parse(reader.result as string));
      this.upload.clear();
    };
    reader.readAsText(event.files[0]);
  }

  saveGame() {
    const blob = new Blob([JSON.stringify(this.game.getGame())], {type: 'text/json;charset=utf-8'});
    saveAs(blob, 'game.json');
  }

}
