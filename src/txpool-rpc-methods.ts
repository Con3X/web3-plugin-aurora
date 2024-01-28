import { Web3Context } from 'web3';

export class TxPoolRpcMethods extends Web3Context {
	/**
	 * @remarks It calls the `txpool_status` RPC method
	 */
	async status(): Promise<any> {
		return this.requestManager.send({
			method: 'txpool_status',
			params: [],
		});
	}

	/**
	 * @remarks It calls the `txpool_inspect` RPC method
	 */
	async inspect(): Promise<any> {
		return this.requestManager.send({
			method: 'txpool_inspect',
			params: [],
		});
	}

	/**
	 * @remarks It calls the `txpool_content` RPC method
	 */
	async content(): Promise<any> {
		return this.requestManager.send({
			method: 'txpool_content',
			params: [],
		});
	}
}
