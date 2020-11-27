import { useState } from 'react';
import { post } from '../../utils/fetch';
import styles from './styles.module.scss';
import { useRouter } from "next/router";

const useFormValue = () => {
    const [value, setValue] = useState('');

    return {
        value,
        onChange(e) {
            setValue(e.target.value);
        }
    }
}

export const Login = () => {
    const email = useFormValue();
    const password = useFormValue();
    const router = useRouter();

    const submit = async () => {
        const resp = await post('/auth/login', {
            email: email.value,
            password: password.value
        });

        if (resp.refreshToken) {
            localStorage.setItem('refreshToken', resp.refreshToken);

            router.push('/')
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.form}>
                <div className={styles.line}>
                    <label htmlFor="email">Email</label>
                    <input autoComplete="false" type="email" name="email" {...email} />
                </div>
                <div className={styles.line}>
                    <label htmlFor="password">Password</label>
                    <input autoComplete="false" type="password" name="password" {...password} />
                </div>
                <div className={styles.line}>
                    <button className={styles.loginBtn} onClick={submit}>Login</button>
                </div>
            </div>
        </div>
    )
}