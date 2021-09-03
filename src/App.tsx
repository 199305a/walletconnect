/*
 * @Descripttion:
 * @Author: cui
 * @Date: 2021-09-03 16:52:51
 * @LastEditors: cui
 * @LastEditTime: 2021-09-03 19:16:59
 */
import React from 'react'
import WalletConnect from '@walletconnect/client'
import { IAssetData } from './helpers/types'
import styled from 'styled-components'

const SLayout = styled.div`
position: relative;
width: 100%;
min-height:100vh;
text-align: center;
`

interface IAppState {
  connector: WalletConnect | null
  fetching: boolean
  connected: boolean
  chainId: number
  showModal: boolean
  pendingRequest: boolean
  uri: string
  accounts: string[]
  address: string
  result: any | null
  assets: IAssetData[]
}
const INITAL_STATE: IAppState = {
  connector: null,
  fetching: false,
  connected: false,
  chainId: 1,
  showModal: false,
  pendingRequest: false,
  uri: '',
  accounts: [],
  address: '',
  result: null,
  assets: [],
}

class App extends React.Component<any, any> {
  public state: IAppState = {
    ...INITAL_STATE,
  }
  public render = () => {
    const {
      assets,
      address,
      connected,
      chainId,
      fetching,
      showModal,
      pendingRequest,
      result,
    } = this.state
    return <SLayout></SLayout>
  }
}

export default App
