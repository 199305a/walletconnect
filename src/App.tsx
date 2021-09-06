/*
 * @Descripttion:
 * @Author: cui
 * @Date: 2021-09-03 16:52:51
 * @LastEditors: cui
 * @LastEditTime: 2021-09-03 19:16:59
 */
import React from 'react'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from "@walletconnect/qrcode-modal";
import { IInternalEvent } from "@walletconnect/types";

import { IAssetData } from './helpers/types'
import styled from 'styled-components'
import Button from "./components/Button";
import { fonts } from "./styles"
import Column from './components/Column'
import Header from './components/Header'
import Wrapper from './components/Wrapper'
import Modal from './components/Modal'

import {apiGetAccountAssets} from "./helpers/api"

const SLayout = styled.div`
position: relative;
width: 100%;
min-height:100vh;
text-align: center;
`

const SContent = styled(Wrapper as any)`
width:100%;
height:100%;
padding: 0 16px`;

const SModalContainer = styled.div`
width:100%;
position:relative;
word-wrap: break-word;
`;

const SLanding = styled(Column as any)`
  height: 600px;
`;


const SButtonContainer = styled(Column as any)`
   width: 250px;
   margin: 50px 0;
`;

const SConnectButton = styled(Button as any)`
border-radius: 8px
font-size: ${fonts.size.medium};
height: 44px;
width: 100%;
margin: 12px 0;
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


  public connect = async () => {
    // bridge url
    const bridge = "https://bridge.walletconnect.org";
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    await this.setState({ connector });
    if (!connector.connected) {
      await connector.createSession();
    }
    await this.subscribeToEvents();
  }

  public subscribeToEvents = () => {
    const { connector } = this.state;
    if (!connector) {
      return;
    }
    connector.on("session_update", async (error, payload) => {
      console.log(`connector.on("session_update")`, payload);
      if (error) {
        throw error;
      }
      const { chainId, accounts } = payload.params[0];
      this.onSessionUpdate(accounts, chainId);

    });
    connector.on("connect", (error, payload) => {
      console.log(`connector.on("connect")`);
      if (error) {
        throw error;
      }
      this.onConnect(payload);
    });
    connector.on("disconnect", (error, payload) => {
      console.log(`connector.on("disconnect")`);
      if (error) {
        throw error;
      }
      this.onDisconnect();
    });
    if (connector.connected) {
      const { chainId, accounts } = connector;
      const address = accounts[0];
      this.setState({
        connector: true,
        chainId,
        accounts,
        address
      });
      this.onSessionUpdate(accounts, chainId);
    }
    this.setState({ connector });

  }

  public onDisconnect = async () => {
    this.resetApp();
  };

  public resetApp = async () => {
    await this.setState({...INITAL_STATE});
  }
  public onConnect = async (payload: IInternalEvent) => {
    const { chainId, accounts } = payload.params[0];
    const address = accounts[0];
    await this.setState({
      connected: true,
      chainId,
      accounts,
      address
    });
    this.getAccountAssets();
  }
  public getAccountAssets = async () => {
    const { address, chainId } = this.state;
     try {
     const assets = await apiGetAccountAssets(address, chainId);
     await this.setState({fetching:false,address,assets});
     console.log(this.state);
     this.setState({ fetching: true });

     
    } catch (error) {
     console.error(error);
     await this.setState({fetching:false});
     
    }
  }

  public onSessionUpdate = async (accounts: string[], chainId: number) => {
    const address = accounts[0];
    await this.setState({ chainId, accounts, address });
    await this.getAccountAssets();
  }

  public toggleModal = () => this.setState({ showModal: !this.state.showModal })
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
    return <SLayout>
      <Column maxWidth={1000} spanHeight>
        <Header connected={false} address={address} chainId={chainId} killSession={() => { }} />
        <SContent>
          {!address && !address.length ? (
            <SLanding center>
              <h3>
                {`Try out WalletConnect`}
                <br />
                <span>{`v${process.env.REACT_APP_VERSION}`}</span>
              </h3>
              <SButtonContainer>
                <SConnectButton left onClick={this.connect} fetching={fetching}>{"Connect to WalletConnect"}</SConnectButton>
              </SButtonContainer>
            </SLanding>

          ) : <div></div>}
        </SContent>
      </Column>
      <Modal show={showModal} toggleModal={this.toggleModal}>
        <SModalContainer></SModalContainer>
      </Modal>
    </SLayout>
  }
}

export default App
