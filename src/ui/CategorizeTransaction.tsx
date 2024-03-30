import { OTHERS_CATEGORY_LABEL } from "@/utils/constants";
import { CategorizationFormData, Category, Transaction } from "@/lib/types";
import { formatDate } from "@/utils/date";
import { formatCurrency } from "@/utils/number";
import { formatAuthority, formatTransactionType } from "@/utils/string";
import {
  Flex,
  Form,
  Select,
  Tag,
  Typography,
  Input,
  FormProps,
  Radio,
  Button,
} from "antd";
import { useState } from "react";

export type onFinishCategorizationCallback = (
  values: CategorizationFormData & { transactionId: string }
) => Promise<void>;

export function CategorizeTransaction({
  transaction,
  categories,
  onFinish,
}: {
  transaction: Transaction;
  categories: Category[];
  onFinish: onFinishCategorizationCallback;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm<CategorizationFormData>();
  const outflow = Form.useWatch("outflow", form);
  const expenseHead = Form.useWatch("expenseHead", form);
  const expenseHeadOptions = getExpenseHeadOptions(categories, outflow);
  const isCommentsRequired = [expenseHead, outflow].includes(
    OTHERS_CATEGORY_LABEL
  );
  const handleFinish: FormProps<CategorizationFormData>["onFinish"] = async (
    values
  ) => {
    setIsLoading(true);
    await onFinish({
      transactionId: transaction.id,
      outflow: values.outflow,
      expenseHead: values.expenseHead || null,
      comments: values.comments || null,
    });
    setIsLoading(false);
  };
  return (
    <Flex vertical gap="large">
      {/* <Typography.Text>{transaction.description}</Typography.Text> */}
      <Flex gap="small">
        <Typography.Text>
          {formatCurrency(transaction.amount, transaction.currency)}
        </Typography.Text>
        <Typography.Text>{formatDate(transaction.timestamp)}</Typography.Text>
      </Flex>
      <Flex gap="small">
        <Tag>{formatTransactionType(transaction.type)}</Tag>
        <Tag>{formatAuthority(transaction.authority)}</Tag>
      </Flex>
      <Form form={form} onFinish={handleFinish}>
        <Form.Item label="Outflow" name="outflow">
          <Radio.Group
            size="large"
            options={createOutflowsFromCategories(categories)}
            optionType="button"
          />
        </Form.Item>
        {expenseHeadOptions.length ? (
          <Form.Item
            label="Expense Head"
            name="expenseHead"
            required
            rules={[{ required: true }]}
          >
            <Radio.Group
              size="large"
              options={expenseHeadOptions}
              optionType="button"
            />
          </Form.Item>
        ) : null}
        <Form.Item
          label="Comments"
          name="comments"
          required={isCommentsRequired}
          rules={[{ required: isCommentsRequired }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Flex justify="end">
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              size="large"
            >
              Save
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );
}

function getExpenseHeadOptions(categories: Category[], outflow: string) {
  const category = categories.find((category) => category.label === outflow);
  return convertExpenseHeadsToOptions(category?.expenseHeads || []);
}

function convertExpenseHeadsToOptions(expenseHeads: string[]) {
  return expenseHeads.map((option) => ({ label: option, value: option }));
}

function createOutflowsFromCategories(categories: Category[]) {
  return categories.map((category) => ({
    label: category.label,
    value: category.label,
  }));
}
