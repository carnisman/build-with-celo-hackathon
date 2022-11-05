import { FaMagic } from 'react-icons/fa';
import { sacudaContext } from '../components/sacudaContext';
import React from 'react';
import { Text, Heading, Button } from '@chakra-ui/react';
import { useSession, signIn, signOff } from "next-auth/react";
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import styles from '../styles/home.module.scss';
import '@rainbow-me/rainbowkit/styles.css';

export default function selectionPage() {

    const router = useRouter();
    const { isConnected } = useAccount();
    const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
        signIn(); //What to show to unathenticated users
    }
    })

    const {uMail,setUMail} = sacudaContext();  
    const {uProfile, setUProfile} = sacudaContext();

    const adminRedirect = () => {
        router.push('/admin') };
    const wobRedirect = () => {
        router.push('/wob') };
    const potRedirect = () => {
        router.push('/pot') };
    const walletRedirect= () => {
        router.push('/auth/walletConnect') }


    const getUserProfile = async () => {
        const res = await fetch('/api/userByEmail/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(uMail),
        });
        const resdata = await res.json();
        setUProfile(resdata.data.profile)
        console.log('prof:'+uProfile)
        };

    if (status === "loading") {
        return (
            <main className={styles.container}>
              <>
              <Head>
              <title>Sacuda | Connect your wallet</title>
              </Head>
              <Heading as={'h1'}>
                  Loading...
              </Heading>
              </>
          </main>
          )
    };

    if (isConnected) {
        if(uMail===session.user.email) {
            getUserProfile();
            window.localStorage.setItem('uProfile', uProfile) 
            switch(uProfile) {
                case "1":
                    return(
                        <main className={styles.container}>
                            
                                <Head>
                                <title>Sacuda | A finantial revolution!</title>
                                </Head>
                                <Heading as={'h1'}>
                                    Welcome Admin!
                                </Heading>
                                <Text 
                                    as={'h2'}
                                    marginTop='1%'
                                    marginBottom='1%'
                                >
                                    This is under construction
                                </Text>
                        </main>
                    )
                case "2":
                    return(
                        <main className={styles.container}>
                            
                                <Head>
                                <title>Sacuda | A finantial revolution!</title>
                                </Head>
                                <Heading as={'h1'}>
                                    Welcome Women of Bussiness!
                                </Heading>
                                <Text 
                                    as={'h2'}
                                    marginTop='1%'
                                    marginBottom='1%'
                                >
                                    This is under construction
                                </Text>
                        </main>
                        
                    )
                    
                case "3":
                    return(
                        <main className={styles.container}>
                            
                                <Head>
                                <title>Sacuda | A finantial revolution!</title>
                                </Head>
                                <Heading as={'h1'}>
                                    Welcome Catalizers!
                                </Heading>
                                <Text 
                                    as={'h2'}
                                    marginTop='1%'
                                    marginBottom='1%'
                                >
                                    This is under construction
                                </Text>
                        </main>
                        
                    )
                default:
                    return(
                        <main className={styles.container}>
                            
                                <Head>
                                <title>Sacuda | A finantial revolution!</title>
                                </Head>
                                <Heading as={'h1'}>
                                    Welcome!
                                </Heading>
                                <Text 
                                    as={'h2'}
                                    marginTop='1%'
                                    marginBottom='1%'
                                >
                                    To start your Sacuda journey, we need to know if you are a Woman of Bussiness or a Potentiator
                                </Text>
                                <Button isLoading={status === 'loading'} onClick={() => router.push('/wob')}> 
                                    I´m a WOB
                                </Button>
                                <Button isLoading={status === 'loading'} onClick={() => router.push('/potIn')}> 
                                    I´m a potentiator
                                </Button>
                            
                        </main>
                
            )
        }
        }
        signOff();
    }
    walletRedirect();
}