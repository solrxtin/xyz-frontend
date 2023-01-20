import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Header from "../components/Header"
import Main from '../components/Main'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <div className={styles.body}>
      <Head>
        <title>XYZ Token Platform</title>
        <meta name="description" content="XYZ Token" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
    </div>
  )
}
