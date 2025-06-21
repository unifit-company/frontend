import { LogAction } from '@admin/domain/enums';
import { LogModel } from '@admin/domain/interfaces';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-logs-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logs-data-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogsDataTableComponent {
  @Input() logs: LogModel[] = [];
  @Input() isLoading = false;
  @Input() isEmpty = false;
  @Input() hasFilters = false;

  readonly LogAction = LogAction;

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  }

  getActionClass(action: LogAction): string {
    switch (action) {
      case LogAction.CREATED:
        return 'bg-green-100 text-green-800';
      case LogAction.UPDATED:
        return 'bg-blue-100 text-blue-800';
      case LogAction.DELETED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  trackByFn(index: number, log: LogModel): number {
    return log.itemId;
  }
}
