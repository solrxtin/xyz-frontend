import React from 'react'
import {ConnectButton} from "web3uikit"
import styles from "../styles/Home.module.css"

const Header = () => {
  return (
    <div className={styles.header}>
      <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
        <h1 className="font-bold px-4 py-4 text-3xl font-serrif text-white">XYZ Token </h1>
        <ConnectButton moralisAuth={false} />
      </nav>
    </div>
  )
}

export default Header