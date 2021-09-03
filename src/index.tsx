/*
 * @Descripttion:
 * @Author: cui
 * @Date: 2021-09-03 16:52:51
 * @LastEditors: cui
 * @LastEditTime: 2021-09-03 18:54:53
 */
import React from 'react'
import styled from 'styled-components'

import ReactDOM from 'react-dom'

import { createGlobalStyle } from 'styled-components'
import App from './App'
import { globalStyle } from './styles'

const GlobalStyle = createGlobalStyle`${globalStyle}`

declare global {
  interface Window {
    blockies: any
  }
}

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root')
)
