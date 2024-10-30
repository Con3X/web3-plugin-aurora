import { Web3 } from 'web3';
import { NearPlugin } from '@con3x/web3-plugin-near';
import { AuroraPlugin } from '../src';

// Endpoints for Aurora
// Mainnet
//  HTTPS
//    The Mainnet Web3 endpoint is at: https://mainnet.aurora.dev (port 443)
//  WSS
//    The Mainnet Websocket endpoint is at: wss://mainnet.aurora.dev
// Testnet
//  HTTPS
//    The Testnet Web3 endpoint is at: https://testnet.aurora.dev (port 443)
//   WSS
//    The Testnet Websocket endpoint is at: wss://testnet.aurora.dev

describe('web3.near.aurora Tests', () => {
	let web3 = new Web3('https://mainnet.aurora.dev');
	beforeAll(() => {
		web3 = new Web3('https://mainnet.aurora.dev');

		const nearPlugin = new NearPlugin();
		// register the NearPlugin should happen before registering the AuroraPlugin
		// this will allow the provider to be passed from the Web3 instance to NearPlugin to AuroraPlugin
		web3.registerPlugin(nearPlugin);
		nearPlugin.registerPlugin(new AuroraPlugin());
	});

	afterAll(() => {});

	it('should have `web3.near.aurora` setup', () => {
		expect(web3.near.aurora).toBeDefined();
	});

	it('should call `getBlockNumber` method on `web3.near.aurora.eth`', async () => {
		const result = await web3.near.aurora.eth.getBlockNumber();
		expect(typeof result).toBe('bigint');

		// console.log(result);
	});
});
