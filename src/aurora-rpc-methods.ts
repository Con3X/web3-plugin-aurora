import { EthExecutionAPI, HexString, Web3Context, eth } from 'web3';

type AuroraAPI = {
	// @TODO list the RPC methods that are not listed in EthExecutionAPI
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

// describe.skip("AuroraPlugin can call the `raw` endpoints", () => {

//   it("should call `rawRpc.netListening` method", async () => {
//     const result = await web3.aurora.rawRpc.netListening();
//     expect(result).toBe(true);

//     // console.log(result);
//   });
//   it("should call `rawRpc.netPeerCount` method", async () => {
//     const result = await web3.aurora.rawRpc.netPeerCount();
//     expect(/^0x[0-9a-fA-F]+$/.test(result)).toBe(true);
//     expect(BigInt(result)).toBeGreaterThanOrEqual(BigInt(0));
//     // console.log(result);
//   });
//   it("should call `rawRpc.netVersion` method", async () => {
//     const provider = web3.currentProvider as HttpProvider;
//     const url = provider['clientUrl']; // Access private property 'clientUrl'
//     const result = await web3.aurora.rawRpc.netVersion();
//     if (url.includes("mainnet.aurora.dev")) {
//       expect(result).toBe("1313161554");
//     } else if (url.includes("testnet.aurora.dev")) {
//       expect(result).toBe("1313161555");
//     }

//     expect(typeof result).toBe('string');
//     expect(BigInt(result)).toBeGreaterThanOrEqual(0);

//     // console.log(result);
//   });
//   it("should call `rawRpc.syncing`", async () => {

//     const result = await web3.aurora.rawRpc.syncing();
//     expect(result).toBe(false);
//   });

//   it("should call `rawRpc.uninstallFilter`", async () => {

//     const result = await web3.aurora.rawRpc.uninstallFilter("0xb");
//     expect(result).toBe(true);
//   });

// });

//   import { AuroraRawRpcMethods } from "./aurora-rpc-methods";

// public rawRpc: AuroraRawRpcMethods;

// this.rawRpc = this.use(AuroraRawRpcMethods);
