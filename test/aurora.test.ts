import { HttpProvider, Web3 } from 'web3';
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

describe('AuroraPlugin Tests', () => {
	let web3: Web3;

	beforeAll(() => {
		web3 = new Web3('https://mainnet.aurora.dev/');
		web3.registerPlugin(new AuroraPlugin());
	});

	describe('AuroraPlugin can call `web3` RPC methods', () => {
		it('should be able to call `web3_clientVersion` method', async () => {
			const result = await web3.aurora.web3.clientVersion();
			const nodeInfo = await web3.aurora.eth.getNodeInfo();
			expect(result).toBe(nodeInfo);
		});

		it('should be able to call `web3_sha3` method', async () => {
			const result = await web3.aurora.web3.sha3('0xab');
			const web3Sha = await web3.utils.sha3('0xab');
			expect(result).toBe(web3Sha);
			expect(result).toBe('0x468fc9c005382579139846222b7b0aebc9182ba073b2455938a86d9753bfb078');
		});
	});

	describe('AuroraPlugin can call `net` RPC endpoints', () => {
		it('should be able to call `net_listening` method', async () => {
			const result = await web3.aurora.net.isListening();
			expect(result).toBe(true);

			// console.log(result);
		});

		it('should be able to call `net_peerCount` method', async () => {
			const result = await web3.aurora.net.getPeerCount();
			expect(typeof result).toBe('bigint');
			expect(result).toBeGreaterThanOrEqual(0);
			// console.log(result);
		});

		it('should be able to call `net_version` method', async () => {
			const provider = web3.currentProvider as HttpProvider;
			const url = provider['clientUrl']; // Access private property 'clientUrl'
			const result = await web3.aurora.net.getId();
			if (url.includes('mainnet.aurora.dev')) {
				expect(result.toString()).toBe('1313161554');
			} else if (url.includes('testnet.aurora.dev')) {
				expect(result.toString()).toBe('1313161555');
			}

			expect(typeof result).toBe('bigint');
			expect(result).toBeGreaterThanOrEqual(0);

			// console.log(result);
		});
	});

	describe('AuroraPlugin can call Ethereum standard RPC endpoints', () => {
		it('should be able to call `eth_accounts` method with expected param', async () => {
			const result = await web3.aurora.eth.getAccounts();
			expect(typeof result).toBe('object');
			expect(typeof result.length).toBe('number');

			// console.log(result);
		});

		it('should be able to call `eth_blockNumber` method with expected param', async () => {
			const result = await web3.aurora.eth.getBlockNumber();
			expect(typeof result).toBe('bigint');
			expect(result).toBeGreaterThanOrEqual(0);
		});

		it('should be able to call `eth_call` method with expected params', async () => {
			const contractAddress = '0x4988a896b1227218e4A686fdE5EabdcAbd91571f'; // on Mainnet (https://mainnet.aurora.dev/)
			const contractMethod = 'balanceOf';
			const contractParams = ['0x4988a896b1227218e4A686fdE5EabdcAbd91571f'];

			const result = await web3.aurora.eth.call({
				to: contractAddress,
				input: web3.eth.abi.encodeFunctionCall(
					{
						name: contractMethod,
						type: 'function',
						inputs: [{ name: 'account', type: 'address' }],
					},
					contractParams,
				),
			});

			expect(result).toBeDefined();
			expect(typeof result).toBe('string');
			// Match hex string number.
			// Or, match `0x` (if contract was not deployed at the connected network on the specified address)
			expect(result).toMatch(/^0x[0-9a-fA-F]*$/);
		});

		it('should be able to call `eth_chainId` method with expected param', async () => {
			const provider = web3.currentProvider as HttpProvider;

			const url = provider['clientUrl']; // Access private property 'clientUrl'
			const result = await web3.aurora.eth.getChainId();

			if (url.includes('mainnet.aurora.dev')) {
				expect(result.toString()).toBe('1313161554');
			} else if (url.includes('testnet.aurora.dev')) {
				expect(result.toString()).toBe('1313161555');
			}

			expect(typeof result).toBe('bigint');
			expect(result).toBeGreaterThanOrEqual(0);
		});

		it('should be able to call `eth_coinbase` method with expected param', async () => {
			const result = await web3.aurora.eth.getCoinbase();
			expect(result).toBeDefined();
			expect(typeof result).toBe('string');

			// console.log(result);
		});

		it('should be able to call `eth_estimateGas` method with expected param', async () => {
			const transaction = {
				from: '0x0000000000000000000000000000000000000000',
				to: '0x0000000000000000000000000000000000000000',
				value: '0x1',
			};
			const result = await web3.aurora.eth.estimateGas(transaction);
			expect(result).toBeDefined();
			expect(typeof result).toBe('bigint');

			// console.log(result);
		});

		it('should be able to call `eth_gasPrice` method with expected param', async () => {
			const result = await web3.aurora.eth.getGasPrice();
			expect(result).toBeDefined();
			expect(typeof result).toBe('bigint');
			expect(result).toBeGreaterThanOrEqual(0);

			// console.log(result);
		});

		it('should be able to call `eth_getBalance` method with expected param', async () => {
			const result = await web3.aurora.eth.getBalance('0x0000000000000000000000000000000000000000');
			expect(result).toBeDefined();
			expect(typeof result).toBe('bigint');
			expect(result).toBeGreaterThanOrEqual(0);

			// console.log(result);
		});

		it('should be able to call `eth_getBlockByHash` method with expected param', async () => {
			const result = await web3.aurora.eth.getBlock(
				'0x8058d7fe544fdcac6836faa5f84c68291da1773594216957374708a7109a6336',
			);
			expect(result).toBeDefined();

			// this is true only for the mainnet for the selected block
			// expect(result.gasLimit).toBeDefined();

			// consider checking more on the result

			// console.log(result);
		});

		it('should be able to call `eth_getBlockByNumber` method with expected param', async () => {
			const result = await web3.aurora.eth.getBlock(0);
			expect(result).toBeDefined();
			expect(result.gasLimit).toBeDefined();

			// consider checking more on the result

			// console.log(result);
		});

		it('should be able to call `eth_getBlockTransactionCountByHash` method with expected param', async () => {
			const result = await web3.aurora.eth.getBlockTransactionCount(
				'0xf2d55965be6a61934058c490440ccb478cd2c1a0429fb2040903c87afd057096',
			);
			expect(typeof result).toBe('bigint');
			expect(result).toBeGreaterThanOrEqual(0);

			// this following is true only for the mainnet for the selected block
			// expect(result.toString()).toBe('1');

			// console.log(result);
		});

		it('should be able to call `eth_getBlockTransactionCountByNumber` method with expected param', async () => {
			const result = await web3.aurora.eth.getBlockTransactionCount(106548709);
			expect(typeof result).toBe('bigint');
			expect(result).toBeGreaterThanOrEqual(0);

			// this following is true only for the mainnet for the selected block
			// expect(result.toString()).toBe('1');

			// console.log(result);
		});

		it('should be able to call `eth_getCode` method', async () => {
			const result = await web3.aurora.eth.getCode('0x4988a896b1227218e4A686fdE5EabdcAbd91571f');
			expect(typeof result).toBe('string');
			expect(result).toMatch(/^0x[0-9a-fA-F]*$/);

			// console.log(result);
		});

		it('should be able to call `eth_getCompilers` method', async () => {
			const result = await web3.aurora.eth.getCompilers();
			expect(typeof result).toBe('object');
			expect(typeof result.length).toBe('number');

			// console.log(result);
		});

		it('should be able to call `eth_getFilterChanges` method', async () => {
			const filterId = await web3.aurora.eth.newFilter({
				fromBlock: 'latest',
				toBlock: 'latest',
				address: [],
				topics: [],
			});
			expect(typeof filterId).toBe('string');

			const result = await web3.aurora.eth.getFilterChanges(filterId);
			expect(typeof result).toBe('object');
			expect(typeof result.length).toBe('number');

			// console.log(result);
		});

		it('should be able to call `eth_getFilterLogs` method', async () => {
			const filterId = await web3.aurora.eth.newFilter({
				fromBlock: 'latest',
				toBlock: 'latest',
				address: [],
				topics: [],
			});
			expect(typeof filterId).toBe('string');

			const result = await web3.aurora.eth.getFilterLogs(filterId);
			expect(typeof result).toBe('object');
			expect(typeof result.length).toBe('number');

			// console.log(result);
		});

		it('should be able to call `eth_getLogs` method', async () => {
			const result = await web3.aurora.eth.getPastLogs({
				fromBlock: 'latest',
				toBlock: 'latest',
				address: [],
				topics: [],
			});
			expect(typeof result).toBe('object');
			expect(typeof result.length).toBe('number');

			// console.log(result);
		});

		it('should be able to call `eth_newFilter`', async () => {
			const result = await web3.aurora.eth.newFilter({
				fromBlock: 'latest',
				toBlock: 'latest',
				address: [],
				topics: [],
			});
			expect(typeof result).toBe('string');

			// console.log(result);
		});

		it('should be able to call `eth_protocolVersion` method', async () => {
			const result = await web3.aurora.eth.getProtocolVersion();
			expect(typeof result).toBe('string');

			// console.log(result);
		});

		it('should be able to call `eth_syncing` method', async () => {
			const result = await web3.aurora.eth.isSyncing();
			expect(result).toBeDefined();

			// consider checking more on the result

			// console.log(result);
		});

		it('should be able to call `eth_uninstallFilter` method', async () => {
			const result = await web3.aurora.eth.uninstallFilter('0xb');
			expect(result).toBe(true);
		});

		it('should be able to call `eth_gasPrice` method', async () => {
			const result = await web3.aurora.eth.getGasPrice();
			expect(result).toBeDefined();

			// consider checking more on the result

			// console.log(result);
		});

		it('should be able to call `eth_coinbase` method', async () => {
			const result = await web3.aurora.eth.getCoinbase();
			expect(result).toBeDefined();

			// consider checking more on the result

			// console.log(result);
		});

		it('should be able to call `eth_getBalance` method', async () => {
			const result = await web3.aurora.eth.getBalance('0x0000000000000000000000000000000000000000');
			expect(result).toBeGreaterThanOrEqual(0);

			// consider checking more on the result

			// console.log(result);
		});

		it('should be able to call `eth_getCompilers` method', async () => {
			const result = await web3.aurora.eth.getCompilers();
			expect(typeof result).toBe(typeof []);
		});

		it('should calling `eth_getProof` throws', async () => {
			// The following is not supported by Aurora
			//  see: https://doc.aurora.dev/evm/rpc/#limitations
			// And trying to call this method will show the error:
			//  This expression is not callable.
			//    Type 'never' has no call signatures.
			// And if the user was using javascript and called it by mistake, the error would be:
			try {
				await (web3.aurora.eth as any).getProof();

				expect(true).toBe(false); // This line will not be reached
			} catch (error) {
				expect((error as { message: string }).message).toBe(
					'web3.aurora.eth.getProof is not a function',
				);
			}
		});

		it('should calling `eth_getWork` throws', async () => {
			// The following is not supported by Aurora
			//  see: https://doc.aurora.dev/evm/rpc/#notes
			// And trying to call this method will show the error:
			//  This expression is not callable.
			//    Type 'never' has no call signatures.
			// And if the user was using javascript and called it by mistake, the error would be:
			try {
				await (web3.aurora.eth as any).getWork();

				expect(true).toBe(false); // This line will not be reached
			} catch (error) {
				expect((error as { message: string }).message).toBe(
					'web3.aurora.eth.getWork is not a function',
				);
			}
		});

		it('should have the rest of the methods at web3.aurora.eth all available', async () => {
			expect(web3.aurora.eth.getStorageAt).toBeDefined();
			expect(web3.aurora.eth.getTransactionFromBlock).toBeDefined();
			expect(web3.aurora.eth.getTransaction).toBeDefined();
			expect(web3.aurora.eth.getTransactionCount).toBeDefined();
			expect(web3.aurora.eth.getTransactionReceipt).toBeDefined();
			expect(web3.aurora.eth.getUncle).toBeDefined();
			expect(web3.aurora.eth.getBlockUncleCount).toBeDefined();
			expect(web3.aurora.eth.getHashRate).toBeDefined();
			expect(web3.aurora.eth.isMining).toBeDefined();
			expect(web3.aurora.eth.newBlockFilter).toBeDefined();
			expect(web3.aurora.eth.newFilter).toBeDefined();
			expect(web3.aurora.eth.newPendingTransactionFilter).toBeDefined();
			expect(web3.aurora.eth.getPendingTransactions).toBeDefined();
			expect(web3.aurora.eth.sendSignedTransaction).toBeDefined();
		});

		it('should have the unavailable  methods at web3.aurora.eth as undefined', async () => {
			expect(web3.aurora.eth.getWork).toBeUndefined();
			expect(web3.aurora.eth.getProof).toBeUndefined();
			expect(web3.aurora.eth.sendTransaction).toBeUndefined();
			expect(web3.aurora.eth.sign).toBeUndefined();
			expect(web3.aurora.eth.signTransaction).toBeUndefined();
			expect(web3.aurora.eth.signTypedData).toBeUndefined();
			expect(web3.aurora.eth.submitWork).toBeUndefined();
		});
	});

	describe('AuroraPlugin can call `parity` rpc methods', () => {
		it('should be able to call `parity_pendingTransactions rpc method`', async () => {
			const result = await web3.aurora.parity.pendingTransactions({ limit: 1 });
			expect(typeof result).toBe('object');
			expect(typeof result.length).toBe('number');

			const result2 = await web3.aurora.parity.pendingTransactions();
			expect(typeof result2).toBe('object');
			expect(typeof result2.length).toBe('number');

			// consider checking more on the result

			// console.log(result);
		});
	});

	describe.skip('AuroraPlugin can call the `txpool` rpc methods', () => {
		// The following seems to not be yet implemented in the current version running the main net and test net.
		//  However, it is marked as completed at:  https://doc.aurora.dev/evm/rpc
		it('should be able to call `txpool_status method`', async () => {
			const result = await web3.aurora.txpool.status();
			expect(typeof result).toBe('object');

			// consider checking more on the result

			// console.log(result);
		});

		// The following seems to not be yet implemented in the current version running the main net and test net.
		//  However, it is marked as completed at:  https://doc.aurora.dev/evm/rpc
		it('should be able to call `txpool_inspect method`', async () => {
			const result = await web3.aurora.txpool.inspect();
			expect(typeof result).toBe('object');

			// consider checking more on the result

			// console.log(result);
		});

		// The following seems to not be yet implemented in the current version running the main net and test net.
		//  However, it is marked as completed at:  https://doc.aurora.dev/evm/rpc
		it('should be able to call `txpool_content method`', async () => {
			const result = await web3.aurora.txpool.content();
			expect(typeof result).toBe('object');

			// consider checking more on the result

			// console.log(result);
		});
	});
});
