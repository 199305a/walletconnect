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