import { Filter, rpcMethods, Web3Eth } from 'web3';

export class ExtendedWeb3Eth extends Web3Eth {
	/**
	 * The eth_getProof method (EIP-1186) is not supported at Aurora and is unlikely to be possible to implement.
	 * @remarks https://doc.aurora.dev/evm/rpc/#limitations
	 */
	getProof = undefined as never;

	/**
	 * The getWork method is not supported at Aurora.
	 * @remarks https://doc.aurora.dev/evm/rpc/#notes
	 */
	getWork = undefined as never;

	/**
	 * The sendTransaction method is not supported at Aurora.
	 * @remarks https://doc.aurora.dev/evm/rpc/#notes
	 */
	sendTransaction = undefined as never;

	/**
	 * The sign method is not supported at Aurora.
	 * @remarks https://doc.aurora.dev/evm/rpc/#notes
	 */
	sign = undefined as never;

	/**
	 * The signTransaction method is not supported at Aurora.
	 * @remarks https://doc.aurora.dev/evm/rpc/#notes
	 */
	signTransaction = undefined as never;

	/**
	 * The signTypedData method is not supported at Aurora.
	 * @remarks https://doc.aurora.dev/evm/rpc/#notes
	 */
	signTypedData = undefined as never;

	/**
	 * The submitWork method is not supported at Aurora.
	 * @remarks https://doc.aurora.dev/evm/rpc/#notes
	 */
	submitWork = undefined as never;

	/**
	 * @remarks It calls the `eth_newBlockFilter` RPC method
	 */
	async newBlockFilter() {
		return rpcMethods.ethRpcMethods.newBlockFilter(this.requestManager);
	}

	/**
	 * @remarks It calls the `eth_newPendingTransactionFilter` RPC method
	 */
	async newPendingTransactionFilter() {
		return rpcMethods.ethRpcMethods.newPendingTransactionFilter(this.requestManager);
	}

	/**
	 * @remarks It calls the `eth_uninstallFilter` RPC method
	 */
	async uninstallFilter(filterIdentifier: string) {
		return rpcMethods.ethRpcMethods.uninstallFilter(this.requestManager, filterIdentifier);
	}

	/**
	 * @remarks It calls the `eth_getCompilers` RPC method
	 * @remarks It is not part of the execution layer API
	 * @see https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getcompilers
	 */
	async getCompilers() {
		return rpcMethods.ethRpcMethods.getCompilers(this.requestManager);
	}

	/**
	 * @remarks It calls the `eth_newFilter` RPC method
	 */
	async newFilter(filter: Filter) {
		return rpcMethods.ethRpcMethods.newFilter(this.requestManager, filter);
	}

	/**
	 * @remarks It calls the `eth_getFilterChanges` RPC method
	 */
	async getFilterChanges(filterIdentifier: string) {
		return rpcMethods.ethRpcMethods.getFilterChanges(this.requestManager, filterIdentifier);
	}

	/**
	 * Returns an array of all logs matching filter with given id.
	 * @remarks It calls the `eth_getFilterLogs` RPC method
	 */
	async getFilterLogs(filterIdentifier: string) {
		return rpcMethods.ethRpcMethods.getFilterLogs(this.requestManager, filterIdentifier);
	}
}
