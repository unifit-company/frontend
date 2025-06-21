import { Component } from '@angular/core';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { TitleComponent } from '@shared/components/title/title.component';
import { LogsTableComponent } from './components/logs-table/logs-table.component';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [TitleComponent, SubtitleComponent, LogsTableComponent],
  templateUrl: './logs.component.html',
})
export class LogsComponent {}
