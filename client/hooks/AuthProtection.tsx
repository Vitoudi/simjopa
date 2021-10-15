import { useRouter } from 'next/dist/client/router';
import React, { PropsWithChildren, ReactElement, useContext, useEffect } from 'react'
import { AuthContext } from '../globalContext/auth/AuthContext';
import { UserRole } from '../utils/db/users';

interface Props {
    redirectUrl: string;
    minimumRoleRequired?: UserRole;
}

export default function AuthProtection({ redirectUrl, children, minimumRoleRequired }: PropsWithChildren<Props>): ReactElement | null {
    const auth = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        const mustRedirect = checkIfMustRedirect();

        if (mustRedirect)
            router.replace(redirectUrl);

    }, [auth.authStatus, router, redirectUrl])

    function checkIfMustRedirect() {
        const isUnauthenticated = auth.authStatus === "unauthenticated";
        const userHasMinimumUserRole = minimumRoleRequired ? auth.user && auth.user.role >= minimumRoleRequired : true;

        return isUnauthenticated || !userHasMinimumUserRole;
    }

    if (auth.authStatus === "authenticated") return <>{children}</>;

    return null;
}
