import { Transaction } from "@/lib/types";

export function formatTransactionType(type: Transaction["type"]) {
  return type.replace(/_/g, " ").toUpperCase();
}

export function formatAuthority(type: Transaction["authority"]) {
  return type.toUpperCase();
}
