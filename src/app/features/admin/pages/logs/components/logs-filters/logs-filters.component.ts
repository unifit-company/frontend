import { ItemType, LogAction } from '@admin/domain/enums';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

export interface LogsFilter {
  itemType: ItemType | null;
  action: LogAction | null;
  dateRange: Date[];
}

@Component({
  selector: 'app-logs-filters',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
  ],
  templateUrl: './logs-filters.component.html',
})
export class LogsFiltersComponent {
  @Input() isLoading = false;
  @Input() itemTypes: { label: string; value: ItemType }[] = [];
  @Input() actionTypes: { label: string; value: LogAction }[] = [];

  @Output() filterChange = new EventEmitter<LogsFilter>();
  @Output() filterClear = new EventEmitter<void>();

  today = new Date();
  selectedItemType: ItemType | null = null;
  selectedAction: LogAction | null = null;
  dateRange: Date[] = [];

  appliedItemType: ItemType | null = null;
  appliedAction: LogAction | null = null;
  appliedDateRange: Date[] = [];

  hasFiltersToApply(): boolean {
    return Boolean(
      this.selectedItemType ||
        this.selectedAction ||
        this.dateRange?.length === 2
    );
  }

  hasActiveFilters(): boolean {
    return Boolean(
      this.appliedItemType ||
        this.appliedAction ||
        this.appliedDateRange?.length === 2
    );
  }

  getActiveFilterCount(): number {
    let count = 0;
    if (this.appliedItemType) count++;
    if (this.appliedAction) count++;
    if (this.appliedDateRange?.length === 2) count++;
    return count;
  }

  applyFilters(): void {
    this.appliedItemType = this.selectedItemType;
    this.appliedAction = this.selectedAction;
    this.appliedDateRange = this.dateRange?.length ? [...this.dateRange] : [];

    this.filterChange.emit({
      itemType: this.appliedItemType,
      action: this.appliedAction,
      dateRange: this.appliedDateRange,
    });
  }

  clearFilters(): void {
    this.selectedItemType = null;
    this.selectedAction = null;
    this.dateRange = [];

    this.appliedItemType = null;
    this.appliedAction = null;
    this.appliedDateRange = [];

    this.filterClear.emit();
  }

  removeItemTypeFilter(): void {
    this.selectedItemType = null;
    this.appliedItemType = null;

    this.emitCurrentFilters();
  }

  removeActionFilter(): void {
    this.selectedAction = null;
    this.appliedAction = null;

    this.emitCurrentFilters();
  }

  removeDateFilter(): void {
    this.dateRange = [];
    this.appliedDateRange = [];

    this.emitCurrentFilters();
  }

  formatDateShort(date: Date): string {
    return date.toLocaleDateString('pt-BR');
  }

  private emitCurrentFilters(): void {
    this.filterChange.emit({
      itemType: this.appliedItemType,
      action: this.appliedAction,
      dateRange: this.appliedDateRange,
    });
  }
}
