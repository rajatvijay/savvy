"use client";

import { Category, Transaction } from "@/lib/types";
import { formatDate } from "@/utils/date";
import { formatCurrency } from "@/utils/number";
import { formatAuthority, formatTransactionType } from "@/utils/string";
import { Flex, List, Drawer, Tag, Typography, message } from "antd";
import { useState } from "react";
import {
  CategorizeTransaction,
  onFinishCategorizationCallback,
} from "./CategorizeTransaction";
import {
  categorizeTransaction,
  getTransactionsPendingCategorization,
} from "@/lib/firestore";

export function PendingCategorizationList({
  transactions: _transactions,
  categories,
}: {
  transactions: Transaction[];
  categories: Category[];
}) {
  const [transactions, setTransactions] =
    useState<Transaction[]>(_transactions);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseDrawer = () => {
    setSelectedTransaction(null);
  };

  const handleFinishCategorizing: onFinishCategorizationCallback = async (
    values
  ) => {
    console.log({ values });
    await categorizeTransaction(values);
    const transactions = await getTransactionsPendingCategorization();
    setTransactions(transactions);
    message.success("Transaction categorized successfully");
    handleCloseDrawer();
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={transactions}
        size="large"
        renderItem={(transaction) => {
          return (
            <List.Item
              key={transaction.id}
              role="button"
              onClick={() => handleTransactionClick(transaction)}
            >
              <List.Item.Meta
                title={transaction.description}
                description={
                  <TransactionDescription transaction={transaction} />
                }
              />
              <Flex gap="small">
                <Tag>{formatTransactionType(transaction.type)}</Tag>
                <Tag>{formatAuthority(transaction.authority)}</Tag>
              </Flex>
            </List.Item>
          );
        }}
      />
      <Drawer
        open={!!selectedTransaction}
        width="100vw"
        onClose={handleCloseDrawer}
        title={selectedTransaction?.description}
      >
        {selectedTransaction ? (
          <CategorizeTransaction
            transaction={selectedTransaction}
            categories={categories}
            onFinish={handleFinishCategorizing}
          />
        ) : null}
      </Drawer>
    </>
  );
}

function TransactionDescription({ transaction }: { transaction: Transaction }) {
  return (
    <Flex vertical>
      <Typography.Text>
        {formatCurrency(transaction.amount, transaction.currency)}
      </Typography.Text>
      <Typography.Text>{formatDate(transaction.timestamp)}</Typography.Text>
    </Flex>
  );
}
