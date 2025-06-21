import { ItemType, LogAction } from '@admin/domain/enums';
import { LogModel } from '@admin/domain/interfaces';
import { LogsService } from '@admin/services/logs.service';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, catchError, finalize, takeUntil } from 'rxjs';
import { LogsDataTableComponent } from '../logs-data-table/logs-data-table.component';
import {
  LogsFilter,
  LogsFiltersComponent,
} from '../logs-filters/logs-filters.component';

@Component({
  selector: 'app-logs-table',
  standalone: true,
  imports: [CommonModule, LogsFiltersComponent, LogsDataTableComponent],
  templateUrl: './logs-table.component.html',
})
export class LogsTableComponent implements OnInit, OnDestroy {
  logs: LogModel[] = [];
  filteredLogs: LogModel[] = [];
  isLoading: boolean = false;
  isEmpty: boolean = false;
  hasFilters: boolean = false;

  itemTypes: { label: string; value: ItemType }[] = [];
  actionTypes: { label: string; value: LogAction }[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private logsService: LogsService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeDropdowns();
    this.loadLogs();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeDropdowns(): void {
    this.itemTypes = Object.values(ItemType).map(type => ({
      label: type,
      value: type,
    }));

    this.actionTypes = Object.values(LogAction).map(action => ({
      label: action,
      value: action,
    }));
  }

  private loadLogs(): void {
    this.isLoading = true;

    this.logsService
      .getLogs()
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          this.toastService.error('Ocorreu um erro ao carregar os logs');
          this.isEmpty = true;
          throw err;
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(logs => {
        this.logs = logs;
        this.filteredLogs = [...logs];
        this.isEmpty = logs.length === 0;
      });
  }

  onFilterChange(filter: LogsFilter): void {
    let filtered = [...this.logs];

    if (filter.itemType) {
      filtered = filtered.filter(log => log.itemType === filter.itemType);
    }

    if (filter.action) {
      filtered = filtered.filter(log => log.action === filter.action);
    }

    if (filter.dateRange?.length === 2) {
      const startDate = new Date(filter.dateRange[0]);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(filter.dateRange[1]);
      endDate.setHours(23, 59, 59, 999);

      filtered = filtered.filter(log => {
        const logDate = new Date(log.date);
        return logDate >= startDate && logDate <= endDate;
      });
    }

    this.filteredLogs = filtered;
    this.isEmpty = filtered.length === 0;
    this.hasFilters = !!(
      filter.itemType ||
      filter.action ||
      filter.dateRange?.length === 2
    );
  }

  onFilterClear(): void {
    this.filteredLogs = [...this.logs];
    this.isEmpty = this.logs.length === 0;
    this.hasFilters = false;
  }
}
