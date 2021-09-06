/*
 * @Descripttion:
 * @Author: cui
 * @Date: 2021-09-06 10:18:49
 * @LastEditors: cui
 * @LastEditTime: 2021-09-06 11:52:03
 */
import axios, { AxiosInstance } from 'axios'
import { IAssetData, IGasPrices } from './types'

const api: AxiosInstance = axios.create({
  baseURL: 'https://ethereum-api.xyz',
  timeout: 30000, // 30 secs
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export async function apiGetAccountAssets(
  address: string,
  chainId: number
): Promise<IAssetData[]> {
  const response = await api.get(
    `/account-assets?address=${address}&chainId=${chainId}`
  )
  const { result } = response.data
  return result
}

export async function apiGetAccountNonce(
  address: string,
  chainId: number
): Promise<string> {
  const response = await api.get(
    `/account-nonce?address=${address}&chainId=${chainId}`
  )
  const { result } = response.data
  return result
}

export async function apiGetGasPrice(): Promise<IGasPrices> {
  const response = await api.get(`/gas-prices`)
  const { result } = response.data
  return result
}
