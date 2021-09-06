/*
 * @Descripttion:
 * @Author: cui
 * @Date: 2021-09-03 19:07:37
 * @LastEditors: cui
 * @LastEditTime: 2021-09-03 19:11:17
 */


export interface IAssetData {
  symbol: string;
  name: string;
  decimals: string;
  contractAddress: string;
  balance?: string;
}


export interface IChainData {
  name: string;
  short_name: string;
  chain: string;
  network: string;
  chain_id: number;
  network_id: number;
  rpc_url: string;
  native_currency: IAssetData;
}