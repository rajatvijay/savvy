type TransactionSourceType =
  | "credit_card"
  | "upi"
  | "imps"
  | "neft"
  | "rtgs"
  | "debit_card";
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
  expenseHead: string;
  comments: string;
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
