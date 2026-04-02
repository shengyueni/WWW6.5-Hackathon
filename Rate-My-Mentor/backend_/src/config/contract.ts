import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import { requireEnv } from './env';

let _publicClient: ReturnType<typeof createPublicClient> | null = null;

// 懒加载：只有真正读取链上数据时才校验环境变量并初始化 client
export function getPublicClient() {
  if (_publicClient) return _publicClient;

  const { RPC_URL } = requireEnv(['RPC_URL'] as const);
  _publicClient = createPublicClient({
    chain: sepolia,
    transport: http(RPC_URL),
  });

  return _publicClient;
}

// 按需读取合约地址，避免模块加载时因配置缺失直接报错
export function getContractAddress(): `0x${string}` {
  const { CONTRACT_ADDRESS } = requireEnv(['CONTRACT_ADDRESS'] as const);
  return CONTRACT_ADDRESS as `0x${string}`;
}

//20260402改前版本备份：
//import { createPublicClient, http } from 'viem';
//import { sepolia } from 'viem/chains';
//import { env } from './env';

// 初始化区块链客户端，用于读取合约数据、验证SBT持有情况
//export const publicClient = createPublicClient({
//  chain: sepolia,
//  transport: http(env.RPC_URL),
//});

// 合约地址导出，所有文件都从这里拿
//export const CONTRACT_ADDRESS = env.CONTRACT_ADDRESS as `0x${string}`;
