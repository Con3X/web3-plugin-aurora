import { Net, SupportedProviders, Web3Context, Web3EthPluginBase } from 'web3';

import { ExtendedWeb3Eth } from './extended-web3-eth';
import { ParityRpcMethods } from './parity-rpc-methods';
import { TxPoolRpcMethods } from './txpool-rpc-methods';
import { Web3RpcMethods } from './web3-rpc-methods';

/**
 * Aurora Engine plugin for web3.js
 * It implements the RPC methods listed at https://doc.aurora.dev/evm/rpc
 * This would be an alternative to using https://github.com/aurora-is-near/aurora.js and a replacement for the deprecated https://github.com/aurora-is-near/near-web3-provider
 */
export class AuroraPlugin extends Web3EthPluginBase {
	public pluginNamespace = 'aurora';

	public web3: Web3RpcMethods;

	public net: Net;

	public eth: ExtendedWeb3Eth;

	public txpool: TxPoolRpcMethods;

	public parity: ParityRpcMethods;

	/**
	 * This method overrides the inherited `link` method from `Web3PluginBase`
	 * to add the provider to the plugin instance and its namespaces,
	 * when `Web3.registerPlugin` is called.
	 *
	 * @param parentContext - The context to be added to the instance of `ChainlinkPlugin`,
	 * and by extension, the instance of `Contract`.
	 */
	public link(parentContext: Web3Context) {
		super.link(parentContext);

		this.web3 = this.use(Web3RpcMethods);

		this.net = this.use(Net);

		this.eth = this.use(ExtendedWeb3Eth);

		this.txpool = this.use(TxPoolRpcMethods);

		this.parity = this.use(ParityRpcMethods);
	}

	constructor(providerOrContext?: string | SupportedProviders) {
		super(providerOrContext);

		this.web3 = this.use(Web3RpcMethods);

		this.net = this.use(Net);

		this.eth = this.use(ExtendedWeb3Eth);

		this.txpool = this.use(TxPoolRpcMethods);

		this.parity = this.use(ParityRpcMethods);
	}
}

// Module Augmentation
declare module 'web3' {
	interface Web3Context {
		aurora: AuroraPlugin;
	}
}
