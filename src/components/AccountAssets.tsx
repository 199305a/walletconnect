/*
 * @Descripttion:
 * @Author: cui
 * @Date: 2021-09-06 16:03:30
 * @LastEditors: cui
 * @LastEditTime: 2021-09-06 16:49:07
 */

import * as React from 'react'
import Column from './Column'
import { IAssetData } from '../helpers/types'
import AssetRow from './AssetRow'

const AccountAssets = (props: any) => {
  const { assets, chainId } = props
  const defaultNativeCurrency: IAssetData =
    chainId === 100
      ? {
          contractAddress: '',
          symbol: 'xDAI',
          name: 'xDAI',
          decimals: '18',
          balance: '0',
        }
      : {
          contractAddress: '',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: '18',
          balance: '0',
        }
  let nativeCurrency: IAssetData = defaultNativeCurrency
  let tokens: IAssetData[] = []
  if (assets && assets.length) {
    const filteredNativeCurrency = assets.filter((asset: IAssetData) =>
      asset && asset.symbol
        ? asset.symbol.toLowerCase() === nativeCurrency.symbol.toLowerCase()
        : false
    )
    nativeCurrency =
      filteredNativeCurrency && filteredNativeCurrency.length
        ? filteredNativeCurrency[0]
        : defaultNativeCurrency
    tokens = assets.filter((asset: IAssetData) =>
      asset && asset.symbol
        ? asset.symbol.toLowerCase() !== nativeCurrency.symbol.toLowerCase()
        : false
    )
  }
  return (
    <Column center>
      <AssetRow key={nativeCurrency.name} asset={nativeCurrency}></AssetRow>
      {tokens.map((token) => (
        <AssetRow key={token.symbol} asset={token} />
      ))}
    </Column>
  )
}

export default AccountAssets
