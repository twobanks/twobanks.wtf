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

export interface PurchaseDrawerProps {
  categories: Category[];
  creditCards: CreditCard[];
  initialOpen?: boolean;
  createInstallmentPurchaseAction: (formData: FormData) => Promise<void>;
  initialCreditCardId?: number;   // ← novo
  triggerLabel?: string;      
  onSuccess?: () => void;
}

export type CategoryType = "expense" | "income" | "transfer"

export interface Category {
  id: number
  name: string
  type: CategoryType
}

export type AccountType = "checking" | "savings" | "cash" | "investment" | "other"

export interface FinancialAccount {
  id: number
  name: string
  type: AccountType
  initialBalance: string | null
}

export interface Transaction {
  id: number
  description: string
  amount: string
  type: CategoryType // agora aceita "transfer"
  date: string
  categoryId: number | null
  accountId: number | null
  paid: boolean
  category?: Category | null
  account?: FinancialAccount | null
}

export interface CreditCard {
  id: number
  name: string
  // outros campos opcionais conforme schema
}

export interface TransactionDrawerProps {
  categories: Category[]
  accounts: FinancialAccount[]
  createTransactionAction?: (formData: FormData) => Promise<void>
  initialOpen?: boolean
  transaction?: Transaction
  onSuccess?: () => void
}

export interface PurchaseDrawerProps {
  categories: Category[]
  creditCards: CreditCard[]
  createInstallmentPurchaseAction: (formData: FormData) => Promise<void>
}

export interface CreditCard {
  id: number
  name: string
  brand?: string | null
  creditLimit?: string | null
  dueDay?: number | null
  closingDay?: number | null
}

export interface Installment {
  id: number
  purchaseId: number
  number: number
  amount: string
  dueDate: string
  paid: boolean
  paidAt?: string | null
}

export interface PurchaseWithInstallments {
  id: number
  description: string
  totalAmount: string
  installmentsCount: number
  firstDueDate: string
  categoryId?: number | null
  category?: Category | null
  installments: Installment[]
}

export interface CreditCardDrawerProps {
  creditCard?: CreditCard
  onSuccess?: () => void
}

export interface RecurringExpense {
  id: number;
  name: string;
  amount: string;
  categoryId: number | null;
  accountId: number | null;
  dueDay: number;
  active: boolean;
  frequency: string;
  category?: Category | null;
  account?: FinancialAccount | null;
}

interface RecurringExpenseDrawerProps {
  recurringExpense?: RecurringExpense
  categories?: Category[]
  accounts?: FinancialAccount[]
  onSuccess?: () => void
}

export interface Asset {
  id: number;
  name: string;
  ticker?: string | null;
  type: string; // ← aceitar qualquer string vinda do banco
  currentPrice?: string | null;
  quantity?: string | null;
  averagePrice?: string | null;
}

export interface InvestmentTransaction {
  id: number;
  assetId: number;
  type: "buy" | "sell" | "contribution" | "withdrawal" | "dividend" | "jcp";
  date: string;
  quantity?: string | null;
  price?: string | null;
  amount: string;
  fees?: string | null;
  notes?: string | null;
  asset?: Asset | null;
}

export interface AssetDrawerProps {
  asset?: Asset;
  onSuccess?: () => void;
}

export interface InvestmentTransactionDrawerProps {
  assets: Asset[];
  assetId?: number;
  transaction?: InvestmentTransaction;
  onSuccess?: () => void;
}