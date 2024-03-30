"use client";

import { Transaction } from "@/lib/types";
import { formatDate } from "@/utils/date";
import { formatCurrency } from "@/utils/number";
import { formatAuthority, formatTransactionType } from "@/utils/string";
import { Flex, List, Tag, Typography } from "antd";

export function PendingCategorizationList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={transactions}
      size="large"
      renderItem={(transaction) => {
        return (
          <List.Item key={transaction.id} role="button">
            <List.Item.Meta
              title={transaction.description}
              description={<TransactionDescription transaction={transaction} />}
            />
            <Flex gap="small">
              <Tag>{formatTransactionType(transaction.type)}</Tag>
              <Tag>{formatAuthority(transaction.authority)}</Tag>
            </Flex>
          </List.Item>
        );
      }}
    />
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
