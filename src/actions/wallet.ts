'use server';

import { db } from '@/db';
import { installments, purchases, transactions } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function createTransaction(formData: FormData) {
  const userId = 'test-user';

  const description = String(formData.get('description'));
  const amount = Number(formData.get('amount'));
  const type = String(formData.get('type')) as 'income' | 'expense';
  const date = new Date(String(formData.get('date')));
  const categoryId = formData.get('categoryId') ? Number(formData.get('categoryId')) : null;
  const accountId = formData.get('accountId') ? Number(formData.get('accountId')) : null;

  await db.insert(transactions).values({
    userId,
    description,
    amount: amount.toFixed(2),
    type,
    date: date.toISOString().split('T')[0],
    categoryId,
    accountId,
    paid: true,
    
  });

  revalidatePath('/admin/carteira');
}

export async function createInstallmentPurchase(formData: FormData) {
  const userId = 'test-user';

  const creditCardId = Number(formData.get('creditCardId'));
  const description = String(formData.get('description'));
  const totalAmount = Number(formData.get('totalAmount'));
  const installmentsCount = Number(formData.get('installments'));
  const firstDueDate = formData.get('firstDueDate') as string;
  const categoryId = formData.get('categoryId') ? Number(formData.get('categoryId')) : null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(firstDueDate)) {
    throw new Error('Data inválida');
  }

  const [purchase] = await db.insert(purchases).values({
    userId,
    creditCardId,
    description,
    totalAmount: totalAmount.toFixed(2),
    installments: installmentsCount,
    firstDueDate,
    categoryId,
  }).returning();

  const installmentAmount = totalAmount / installmentsCount;
  const installmentsData = [];

  for (let i = 0; i < installmentsCount; i++) {
    const dueDate = new Date(firstDueDate);
    dueDate.setMonth(dueDate.getMonth() + i);

    installmentsData.push({
      purchaseId: purchase.id,
      number: i + 1,
      amount: installmentAmount.toFixed(2),
      dueDate: dueDate.toISOString().split('T')[0],
    });
  }

  await db.insert(installments).values(installmentsData);

  revalidatePath('/admin/carteira');
}