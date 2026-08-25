import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex
} from "drizzle-orm/pg-core";
import { AdapterAccount } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  image: text("image"),
  password: text("password"),
  role: text("role").default("Atleta"),
  phone: text("phone"), 
})

export const otpCodes = pgTable("otp_codes", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  codeHash: text("code_hash").notNull(),
  expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
  consumedAt: timestamp("consumed_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)

export const posts = pgTable("post", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  published: boolean("published").default(false).notNull(),
  authorId: text("authorId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
})

export const books = pgTable("book", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  author: text("author").notNull(),
  status: text("status").default("lido").notNull(),
  rating: integer("rating"),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
})

export const photos = pgTable("photo", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  imageUrl: text("imageUrl").notNull(),
  camera: text("camera"),
  lens: text("lens"),
  aperture: text("aperture"),
  shutterSpeed: text("shutterSpeed"),
  iso: text("iso"),
  location: text("location"),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
})

export const plannedWorkouts = pgTable("planned_workout", {
  id: text("id").primaryKey(),
  date: text("date").notNull(),
  title: text("title"),
  status: integer("status"),
  steps: jsonb("steps"),
  rawPayload: jsonb("rawPayload"),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
})

export const stravaWorkouts = pgTable("strava_workout", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type"),
  distance: text("distance"),
  movingTime: integer("movingTime"),
  elapsedTime: integer("elapsedTime"),
  totalElevationGain: text("totalElevationGain"),
  averageSpeed: text("averageSpeed"),
  maxSpeed: text("maxSpeed"),
  averageHeartrate: integer("averageHeartrate"),
  maxHeartrate: integer("maxHeartrate"),
  averageCadence: text("averageCadence"),
  averageWatts: text("averageWatts"),
  kilojoules: text("kilojoules"),
  sufferScore: integer("sufferScore"),
  gearId: text("gearId"),
  mapPolyline: text("mapPolyline"),
  startDate: text("startDate").notNull(),
  timezone: text("timezone"),
  rawPayload: jsonb("rawPayload"),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  isDetailed: integer("isDetailed").default(0),
  detailedPayload: jsonb("detailedPayload"),
  streamPayload: jsonb("streamPayload"),
})

export const gear = pgTable("gear", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  nickname: text("nickname"),
  brandName: text("brand_name"),
  modelName: text("model_name"),
  distance: text("distance"),
  resourceState: integer("resource_state"),
  category: text("category").notNull().default("Tênis"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const transactionTypeEnum = pgEnum('transaction_type', [
  'income',
  'expense',
  'transfer',
]);

export const accountTypeEnum = pgEnum('account_type', [
  'checking',
  'savings',
  'cash',
  'investment',
  'other',
]);

// ---------- TABELAS ----------

// ... imports existentes

// Adicionar householdId nas tabelas relevantes:

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  householdId: text('household_id').references(() => households.id, { onDelete: 'set null' }), // NOVA
  name: text('name').notNull(),
  type: transactionTypeEnum('type').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const financialAccounts = pgTable('financial_accounts', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  householdId: text('household_id').references(() => households.id, { onDelete: 'set null' }), // NOVA
  name: text('name').notNull(),
  type: accountTypeEnum('type').notNull(),
  initialBalance: numeric('initial_balance').default('0'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  householdId: text('household_id').references(() => households.id, { onDelete: 'set null' }),
  description: text('description').notNull(),
  amount: numeric('amount').notNull(),
  type: transactionTypeEnum('type').notNull(),
  date: date('date').notNull(),
  source: text('source').notNull().default('manual'), // NOVA COLUNA
  categoryId: integer('category_id').references(() => categories.id),
  accountId: integer('account_id').references(() => financialAccounts.id),
  paid: boolean('paid').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const recurringExpenses = pgTable("recurring_expenses", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  householdId: text('household_id').references(() => households.id, { onDelete: 'set null' }), // NOVA
  name: text("name").notNull(),
  amount: numeric("amount").notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  accountId: integer("account_id").references(() => financialAccounts.id),
  dueDay: integer("due_day").notNull(),
  frequency: text("frequency").notNull().default("monthly"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const assets = pgTable("assets", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  householdId: text('household_id').references(() => households.id, { onDelete: 'set null' }), // NOVA
  name: text("name").notNull(),
  ticker: text("ticker"),
  type: text("type").notNull().default("stock"),
  currentPrice: numeric("current_price"),
  quantity: numeric("quantity"),
  averagePrice: numeric("average_price"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const investmentTransactions = pgTable("investment_transactions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  householdId: text('household_id').references(() => households.id, { onDelete: 'set null' }), // NOVA
  assetId: integer("asset_id").notNull().references(() => assets.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  date: date("date").notNull(),
  quantity: numeric("quantity"),
  price: numeric("price"),
  amount: numeric("amount").notNull(),
  fees: numeric("fees").default("0"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Cartões de crédito
export const creditCards = pgTable('credit_cards', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(), // Nubank, XP, etc.
  brand: text('brand'), // Visa, Master...
  creditLimit: numeric('credit_limit'),
  dueDay: integer('due_day'), // dia do vencimento
  closingDay: integer('closing_day'), // dia do fechamento da fatura
  createdAt: timestamp('created_at').defaultNow(),
});

// Compras no cartão de crédito
export const purchases = pgTable('purchases', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  creditCardId: integer('credit_card_id').references(() => creditCards.id),
  description: text('description').notNull(),
  totalAmount: numeric('total_amount').notNull(),
  installments: integer('installments').notNull().default(1),
  firstDueDate: date('first_due_date').notNull(),
  categoryId: integer('category_id').references(() => categories.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// Parcelas de uma compra
export const installments = pgTable('installments', {
  id: serial('id').primaryKey(),
  purchaseId: integer('purchase_id')
    .references(() => purchases.id)
    .notNull(),
  number: integer('number').notNull(), // 1, 2, 3...
  amount: numeric('amount').notNull(),
  dueDate: date('due_date').notNull(),
  paid: boolean('paid').notNull().default(false),
  paidAt: timestamp('paid_at'),
});

// ---------- RELAÇÕES (para queries com joins) ----------

export const categoriesRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions),
  purchases: many(purchases),
}));

export const accountsBankRelations = relations(financialAccounts, ({ many }) => ({
  transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
  account: one(financialAccounts, {
    fields: [transactions.accountId],
    references: [financialAccounts.id],
  }),
}));

export const creditCardsRelations = relations(creditCards, ({ many }) => ({
  purchases: many(purchases),
}));

export const purchasesRelations = relations(purchases, ({ one, many }) => ({
  creditCard: one(creditCards, {
    fields: [purchases.creditCardId],
    references: [creditCards.id],
  }),
  category: one(categories, {
    fields: [purchases.categoryId],
    references: [categories.id],
  }),
  installments: many(installments),
}));

export const installmentsRelations = relations(installments, ({ one }) => ({
  purchase: one(purchases, {
    fields: [installments.purchaseId],
    references: [purchases.id],
  }),
}));

export const listTypeEnum = pgEnum("list_type", [
  "supermercado",
  "varejao",
  "acougue",
]);

export const shoppingLists = pgTable("shopping_lists", {
  id: serial('id').primaryKey(),
  name: text("name").notNull(),
  type: listTypeEnum("type").notNull(),
  userId: text("user_id").notNull(), // ID do usuário vindo do Auth.js
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const shoppingItems = pgTable("shopping_items", {
  id: serial('id').primaryKey(),
  listId: serial("list_id")
    .notNull()
    .references(() => shoppingLists.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  quantity: integer("quantity").default(1),
  unit: text("unit"),
  checked: boolean("checked").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ShoppingList = InferSelectModel<typeof shoppingLists>;
export type ShoppingItem = InferSelectModel<typeof shoppingItems>;

// Tipo combinado para lista com itens
export type ShoppingListWithItems = ShoppingList & {
  items: ShoppingItem[];
};

// Log de geração mensal para evitar duplicatas
export const recurringPaymentLogs = pgTable("recurring_payment_logs", {
  id: serial("id").primaryKey(),
  recurringExpenseId: integer("recurring_expense_id")
    .notNull()
    .references(() => recurringExpenses.id, { onDelete: "cascade" }),
  month: text("month").notNull(), // formato "YYYY-MM"
  transactionId: integer("transaction_id")
    .notNull()
    .references(() => transactions.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  uniqueCombination: uniqueIndex("unique_recurring_month").on(table.recurringExpenseId, table.month),
}));

export const recurringExpensesRelations = relations(recurringExpenses, ({ one, many }) => ({
  category: one(categories, {
    fields: [recurringExpenses.categoryId],
    references: [categories.id],
  }),
  account: one(financialAccounts, {
    fields: [recurringExpenses.accountId],
    references: [financialAccounts.id],
  }),
  logs: many(recurringPaymentLogs),
}));

export const recurringPaymentLogsRelations = relations(recurringPaymentLogs, ({ one }) => ({
  recurringExpense: one(recurringExpenses, {
    fields: [recurringPaymentLogs.recurringExpenseId],
    references: [recurringExpenses.id],
  }),
  transaction: one(transactions, {
    fields: [recurringPaymentLogs.transactionId],
    references: [transactions.id],
  }),
}));

// Relações
export const assetsRelations = relations(assets, ({ many }) => ({
  transactions: many(investmentTransactions),
}));

export const investmentTransactionsRelations = relations(investmentTransactions, ({ one }) => ({
  asset: one(assets, {
    fields: [investmentTransactions.assetId],
    references: [assets.id],
  }),
}));

export const households = pgTable("households", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const householdMembers = pgTable("household_members", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  householdId: text("household_id")
    .notNull()
    .references(() => households.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  role: text("role").notNull().default("member"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
}, (table) => ({
  uniqueMembership: uniqueIndex("unique_household_member").on(table.householdId, table.userId),
}));