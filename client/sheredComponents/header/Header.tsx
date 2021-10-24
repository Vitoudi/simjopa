import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement, useContext, useEffect } from 'react'
import { AuthContext } from '../../globalContext/auth/AuthContext';
import SearchContextProvider from '../../globalContext/search/SearchContext';
import { getUserImageFullPath } from '../../utils/db/images';
import { UserRole } from '../../utils/db/users';
import Button from '../Button/Button';
import RoundImage from '../RoundImage/RoundImage';
import HeaderIcon from './components/HeaderIcon';
import styles from "./header.module.css";
import { ImSearch as SearchIcon } from "react-icons/im";


interface Props {
    
}

export default function Header({}: Props): ReactElement {
    const auth = useContext(AuthContext);
    const { user, authStatus } = auth;
    const isAuthenticated = authStatus === "authenticated";
    const isJournalist = user?.role === UserRole.JOURNALIST;
    const isAdmin = (user?.role ?? 0) >= UserRole.ADMIN;
    const router = useRouter();

    function handleRedirect(href: string) {
      router.push(href);
    }
    

    return (
      <SearchContextProvider>
        <header className={styles["header"]}>
          <div className={styles["logo-container"]}>
            <Link href="/" passHref>
              <Image
                alt="logo"
                src="/assets/logo.png"
                width={200}
                height={100}
                objectFit="contain"
              />
            </Link>
          </div>

          <nav className={styles["nav"]}>
            <HeaderIcon onClick={() => handleRedirect("/search")}>
              <SearchIcon size={18} />
            </HeaderIcon>

            <HeaderIcon onClick={() => handleRedirect("/committees")}>
              Comitês
            </HeaderIcon>

            {isJournalist && (
              <Button onClick={() => handleRedirect("/create")}>
                Novo post
              </Button>
            )}
            {isAdmin && (
              <Button onClick={() => handleRedirect("/admin")}>
                Painel administrativo
              </Button>
            )}
          </nav>
          {isAuthenticated ? (
              <HeaderIcon onClick={() => handleRedirect("/profile")}>
                <RoundImage
                  src={getUserImageFullPath(user?.imgRef)}
                  alt="user"
                  size={35}
                />
              </HeaderIcon>
          ) : (
            <Button onClick={() => handleRedirect("/login")}>Entrar</Button>
          )}
        </header>
      </SearchContextProvider>
    );
}
