import { TransactionInfo, Web3Context } from 'web3';

type Address = string;
type Quantity = number;

interface AddressFilter {
	eq?: Address;
}

interface QuantityFilter {
	eq?: Quantity;
	gt?: Quantity;
	lt?: Quantity;
}

interface TransactionFilter {
	from?: AddressFilter;
	to?: AddressFilter & { action?: 'contract_creation' };
	gas?: QuantityFilter;
	gasPrice?: QuantityFilter;
	value?: QuantityFilter;
	nonce?: QuantityFilter;
}

interface ParityPendingTransactionsParams {
	limit?: number;
	filter?: TransactionFilter;
}

export type ParityExecutionAPI = {
	parity_pendingTransactions: (params?: ParityPendingTransactionsParams) => TransactionInfo[];
};

export class ParityRpcMethods extends Web3Context<ParityExecutionAPI> {
	/**
	 * Returns a list of transactions currently in the queue.
	 * @remarks It calls the `parity_pendingTransactions` RPC method
	 */
	async pendingTransactions(params?: ParityPendingTransactionsParams) {
		return this.requestManager.send({
			method: 'parity_pendingTransactions',
			params: [params],
		});
	}
}
