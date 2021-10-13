import { useRouter } from 'next/dist/client/router';
import React, { PropsWithChildren, ReactElement, useContext, useEffect } from 'react'
import { AuthContext } from '../globalContext/auth/AuthContext';

interface Props {
    redirectUrl: string
}

export default function AuthProtection({ redirectUrl, children }: PropsWithChildren<Props>): ReactElement | null {
    const auth = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (auth.authStatus === "unauthenticated")
            router.replace(redirectUrl);

    }, [auth.authStatus, router, redirectUrl])

    if (auth.authStatus === "authenticated") return <>{children}</>;

    return null;
}
