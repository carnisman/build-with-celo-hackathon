import { FaMagic } from 'react-icons/fa';
import { Text, Heading, Input, Button, Link, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAccount, UserRejectedRequestError } from 'wagmi';
import { ConnectButton} from "@rainbow-me/rainbowkit";
import styles from '../styles/home.module.scss';
import '@rainbow-me/rainbowkit/styles.css';

export default function PotInPage() {


    const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
        signIn(); //What to show to unathenticated users
    }
    })

    const router = useRouter();

    const { isConnected } = useAccount();

    if (status === "loading") {
    return "Loading..."
    }


    if (isConnected) {

        return(
            <>
            <main className={styles.container}>
                <Head>
                <title>Sacuda | A finantial revolution!</title>
                </Head>
                <Heading as={'h1'}>
                    Please connect your web3 wallet to continue using Sacuda
                </Heading>
                <Text 
                    as={'h2'}
                    marginTop='1%'
                    marginBottom='1%'
                >
                    Under construction
                </Text>
                <ConnectButton />
                </main>
            </>
        )
        }

        return(
            <>
            <main className={styles.container}>
                <Head>
                <title>Sacuda | A finantial revolution!</title>
                </Head>
                <Heading as={'h1'}>
                    Please connect your web3 wallet to continue using Sacuda
                </Heading>
                <Text 
                    as={'h2'}
                    marginTop='1%'
                    marginBottom='1%'
                >
                    Under construction
                </Text>
                <ConnectButton />
                </main>
            </>
        )

        

    }