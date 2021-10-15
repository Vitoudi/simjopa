import React, { ReactElement, useContext } from 'react'
import { AuthContext } from '../../globalContext/auth/AuthContext';
import AuthProtection from '../../hooks/AuthProtection'
import RoundImage from '../../sheredComponents/RoundImage/RoundImage';
import { getUserImageFullPath } from '../../utils/db/images';
import styles from "./ProfilePage.module.css";

interface Props {
    
}

export default function ProfilePage({}: Props): ReactElement {
    const auth = useContext(AuthContext);
    const { user, logon } = auth;

    return (
      <AuthProtection redirectUrl="/">
        {user && (
          <div className={styles["page"]}>
            <h1 style={{ marginBottom: "1rem" }}>{user.name}</h1>
            <RoundImage src={getUserImageFullPath(user.imgRef)} size={120} alt="imagem do usuário" />
            <div className={styles["options"]}>
                <p onClick={logon} className={styles["options-item"]} style={{color: "darkred"}}>Sair</p>
            </div>
          </div>
        )}
      </AuthProtection>
    );
}
