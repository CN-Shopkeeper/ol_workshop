export interface IMenuItem {
  id: string;
  name: string;
  children?: IMenuItem[];
  icon?: string;
}
