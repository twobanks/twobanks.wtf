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

export interface RecurringExpenseDrawerProps {
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

export interface ObraTransactionsTableProps {
  obraCategoryExists: boolean
  transactions: Transaction[]
  categories: Category[]
  accounts: FinancialAccount[]
}

export interface Parcela {
  id: number
  purchaseDescription: string
  number: number
  totalInstallments: number
  amount: string
  paid: boolean
  dueDate: string
}

export interface CartaoFatura {
  cartao: CreditCard
  parcelas: Parcela[]
  total: number
  pago: number
}

export interface CreditCardsSectionProps {
  cartoesComFatura: CartaoFatura[]
  categorias: Category[]
  cartoes: CreditCard[]
  createInstallmentPurchaseAction: (
    formData: FormData
  ) => Promise<void>
  faturaAno: number
  faturaMesNum: number
}

export interface OtherExpensesTableProps {
  expenses: Transaction[]
  categories: Category[]
  accounts: FinancialAccount[]
}

export interface RecurringLog {
  id: number
  transaction: {
    id: number
    date: string
    amount: string
    paid: boolean
  }
  recurringExpense: {
    name: string
    category?: { name: string } | null
    account?: { name: string } | null
  }
}

export interface RecurringExpensesTableProps {
  logs: RecurringLog[]
  categories: Category[]
  accounts: FinancialAccount[]
}

export interface TableActionsProps {
  id: number
  editHref?: string
  onEdit?: () => void
  onDelete?: (id: number) => void
  onPay?: () => void
  isPaid?: boolean
}

export interface TransactionsTableProps {
  transactions: Transaction[]
}

export interface FinancialAccount {
  id: number
  name: string
  type: "checking" | "savings" | "cash" | "investment" | "other"
  initialBalance: string | null
}

export interface AccountDrawerProps {
  account?: FinancialAccount
  onSuccess?: () => void
}

export interface AssetDrawerProps {
  asset?: Asset
  onSuccess?: () => void
}

export interface Category {
  id: number
  name: string
  type: "expense" | "income" | "transfer"
}

export interface CategoryDrawerProps {
  category?: Category
  onSuccess?: () => void
}

export interface CreditCardDrawerProps {
  creditCard?: CreditCard
  onSuccess?: () => void
}

export interface ExpenseDrawerProps {
  categories: Category[]
  accounts: FinancialAccount[]
  expense?: Transaction
  onSuccess?: () => void
}

export interface IncomeDrawerProps {
  onSuccess?: () => void
}

export interface InvestmentTransactionDrawerProps {
  assets: Asset[]
  selectedAssetId?: number
  onSuccess?: () => void
}
