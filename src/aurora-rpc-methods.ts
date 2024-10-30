import { EthExecutionAPI, HexString, Web3Context, eth } from 'web3';

type AuroraAPI = {
	// here you can list any custom RPC methods, if they are not already listed in EthExecutionAPI
};

export class AuroraRawRpcMethods extends Web3Context<
	AuroraAPI & EthExecutionAPI,
	eth.RegisteredSubscription
> {
	/**
	 * Use web3.js request manager to call the JSON RPC specifying the method and params
	 *
	 * @param method RPC method
	 * @param params Parameters to the method
	 */
	async sendJsonRpc<T>(method: string, params?: object): Promise<T> {
		return this.requestManager.send({
			method,
			params: params ?? [],
		});
	}

	/**
	 * An alias of `eth.getNodeInfo`
	 * @remarks It calls the `web3_clientVersion` RPC method
	 */
	async web3ClientVersion(value: HexString): Promise<any> {
		return this.sendJsonRpc('web3_clientVersion', [value]);
	}

	/**
	 * @remarks It calls the `web3_sha3` RPC method
	 */
	async web3Sha3(value: HexString): Promise<any> {
		return this.sendJsonRpc('web3_sha3', [value]);
	}

	/**
	 * Returns true if client is actively listening for network connections.
	 * @returns boolean - `true` when listening, otherwise `false`.
	 * @see https://ethereum.org/en/developers/docs/apis/json-rpc/#net_listening
	 * @see https://doc.aurora.dev/evm/rpc
	 * @example
	 * ```js
	 * > await web3.aurora.netListening()
	 * true
	 * ```
	 * @remarks It calls the `net_listening` RPC method.
	 */
	async netListening(): Promise<boolean> {
		return this.sendJsonRpc('net_listening');
	}

	/**
	 * Returns number of peers currently connected to the client.
	 * @returns string - hex string containing integer of the number of connected peers.
	 * @see https://ethereum.org/en/developers/docs/apis/json-rpc/#net_peercount
	 * @see https://doc.aurora.dev/evm/rpc
	 * @example
	 * ```js
	 * > await web3.aurora.netPeerCount()
	 * "0x2"
	 * ```
	 * @remarks It calls the `net_peerCount` RPC method.
	 */
	async netPeerCount(): Promise<string> {
		return this.sendJsonRpc('net_peerCount');
	}

	/**
	 * Returns the current network id.
	 * @returns string - The current network id as a string ("1313161554" for aurora mainnet, "1313161555" for aurora testnet)
	 * @see https://ethereum.org/en/developers/docs/apis/json-rpc/#net_version
	 * @see https://doc.aurora.dev/evm/rpc
	 * @example
	 * ```js
	 * > await web3.aurora.netVersion()
	 * "1313161554"
	 * ```
	 * @example
	 * ```js
	 * > await web3.aurora.netVersion()
	 * "1313161555"
	 * ```
	 * @remarks It calls the `net_version` RPC method.
	 */
	async netVersion(): Promise<string> {
		return this.sendJsonRpc('net_version');
	}

	/**
	 * @remarks It calls the `eth_syncing` RPC method
	 * alias of `isSyncing`.
	 */
	async syncing(): Promise<any> {
		// same as: return this.isSyncing();
		return this.sendJsonRpc('eth_syncing');
	}

	/**
	 * @remarks It calls the `eth_getCompilers` RPC method
	 */
	async getCompilers(): Promise<any> {
		return this.sendJsonRpc('eth_getCompilers');
	}
	/**
	 * @remarks It calls the `eth_syncing` RPC method
	 */
	async uninstallFilter(filterId: HexString): Promise<any> {
		return this.sendJsonRpc('eth_uninstallFilter', [filterId]);
	}
}
