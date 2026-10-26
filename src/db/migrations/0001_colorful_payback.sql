CREATE TYPE "public"."kanban_status" AS ENUM('to_do', 'in_progress', 'pending', 'canceled', 'done');--> statement-breakpoint
CREATE TYPE "public"."kanban_urgency" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TABLE "credit_card_adjustments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"credit_card_id" integer NOT NULL,
	"purchase_id" integer,
	"type" varchar(20) NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"date" date NOT NULL,
	"description" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kanban_tasks" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"status" "kanban_status" DEFAULT 'to_do' NOT NULL,
	"urgency" "kanban_urgency" DEFAULT 'medium' NOT NULL,
	"due_date" timestamp,
	"assigned_to_id" text,
	"created_by_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "installments" DROP CONSTRAINT "installments_purchase_id_purchases_id_fk";
--> statement-breakpoint
ALTER TABLE "credit_cards" ADD COLUMN "last_four_digits" text;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "purchase_date" date DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "status" varchar(20) DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "is_invoice_payment" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "last_seen" timestamp;--> statement-breakpoint
ALTER TABLE "credit_card_adjustments" ADD CONSTRAINT "credit_card_adjustments_credit_card_id_credit_cards_id_fk" FOREIGN KEY ("credit_card_id") REFERENCES "public"."credit_cards"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credit_card_adjustments" ADD CONSTRAINT "credit_card_adjustments_purchase_id_purchases_id_fk" FOREIGN KEY ("purchase_id") REFERENCES "public"."purchases"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kanban_tasks" ADD CONSTRAINT "kanban_tasks_assigned_to_id_user_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kanban_tasks" ADD CONSTRAINT "kanban_tasks_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "installments" ADD CONSTRAINT "installments_purchase_id_purchases_id_fk" FOREIGN KEY ("purchase_id") REFERENCES "public"."purchases"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_purchases_card_user" ON "purchases" USING btree ("credit_card_id","user_id");--> statement-breakpoint
CREATE INDEX "idx_transactions_user_date" ON "transactions" USING btree ("user_id","date");--> statement-breakpoint
CREATE INDEX "idx_transactions_household_date" ON "transactions" USING btree ("household_id","date");