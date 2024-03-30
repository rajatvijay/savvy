type TransactionNature = "credit" | "debit";
type Authority = "AXIS" | "HDFC" | "AMEX" | "BoB";

type BaseTransaction = {
  id: string;
  amount: number;
  description: string;
  timestamp: number;
  authority: Authority;
  nature: TransactionNature;
  outflow: string;
  expenseHead: string | null;
  comments: string | null;
  currency: string;
};

type CreditCardTransaction = BaseTransaction & {
  type: "credit_card";
  cardEndingNumber: string;
  availableLimit: number;
};

type UpiTransaction = BaseTransaction & {
  type: "upi";
  upiId: string;
};

type ImpsTransaction = BaseTransaction & {
  type: "imps";
};

type NeftTransaction = BaseTransaction & {
  type: "neft";
};

type RtgsTransaction = BaseTransaction & {
  type: "rtgs";
};

type DebitCardTransaction = BaseTransaction & {
  type: "debit_card";
  cardEndingNumber: string;
};

export type Transaction =
  | CreditCardTransaction
  | UpiTransaction
  | ImpsTransaction
  | NeftTransaction
  | RtgsTransaction
  | DebitCardTransaction;

export type Category = {
  id: string;
  label: string;
  expenseHeads: string[];
};

export type CategorizationFormData = {
  outflow: Transaction["outflow"];
  expenseHead: Transaction["expenseHead"];
  comments: Transaction["comments"];
};
