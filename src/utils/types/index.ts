export interface StravaMapProps {
  mapPolyline: string | null
  streams?: any 
}

export interface SvgIconProps {
  src: string; // Agora isso é uma string pura!
  className?: string;
}

export interface PageSizeSelectorProps {
  pageSize: number
  filters: Record<string, string | number | undefined>
}

export interface AtividadesFooterProps {
  currentPage: number
  totalPages: number
  pageSize: number
  activityType: string
  gearId: string
  sortValue: string
  typeOptions: string[]
  shoes: { id: string; name: string }[]
  bikes: { id: string; name: string }[]
}

export interface FiltersProps {
  activityType: string
  gearId: string
  sortValue: string
  typeOptions: string[]
  shoes: { id: string; name: string }[]
  bikes: { id: string; name: string }[]
}

export type AlertType = 'success' | 'error';

export interface FloatingAlertProps {
  type: AlertType;
  message: string;
  onClose: () => void;
  duration?: number; // em ms
}

export interface Category {
  id: number;
  name: string;
}

export interface CreditCard {
  id: number;
  name: string;
}

export interface PurchaseDrawerProps {
  categories: Category[];
  creditCards: CreditCard[];
  createInstallmentPurchaseAction: (formData: FormData) => Promise<void>;
}

export interface Category {
  id: number;
  name: string;
}

export interface FinancialAccount {
  id: number;
  name: string;
}

export interface TransactionDrawerProps {
  categories: Category[];
  accounts: FinancialAccount[];
  createTransactionAction: (formData: FormData) => Promise<void>;
}