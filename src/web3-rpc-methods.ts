import { Web3EthExecutionAPI, HexString, Web3Context } from 'web3';

export class Web3RpcMethods extends Web3Context<
	Web3EthExecutionAPI & {
		web3_sha3: (value: HexString) => HexString;
	}
> {
	/**
	 * An alias of `eth.getNodeInfo()`.
	 * @remarks It calls the `web3_clientVersion` RPC method
	 */
	async clientVersion() {
		return this.requestManager.send({
			method: 'web3_clientVersion',
			params: [],
		});
	}

	/**
	 * Returns Keccak-256 (not the standardized SHA3-256) of the given data.
	 * @remarks It calls the `web3_sha3` RPC method.
	 * @remarks Suppose to provide the same result as calling `web3.utils.sha3(...)`.
	 */
	async sha3(value: HexString) {
		return this.requestManager.send({
			method: 'web3_sha3',
			params: [value],
		});
	}
}
