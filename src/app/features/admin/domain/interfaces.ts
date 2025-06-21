import { ItemType, LogAction } from './enums';

export type LogModel = {
  itemId: number;
  itemType: ItemType;
  itemName: string;
  user: string;
  action: LogAction;
  date: string;
};
