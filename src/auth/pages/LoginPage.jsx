import { useEffect, useMemo, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import { Input } from '../../components/Input/Input';
import { StatusInput } from '../../components/Input/helper';
import { useAuthStore } from '../../hooks';

import Toast from '../../components/Toast/Toast';
import userIcon from '../../assets/img/user.png';

import './LoginPage.css';

export const LoginPage = () => {
    const { startLogin, errorMessage } = useAuthStore();

    const [form, setForm] = useState({ username: "", password: "" });
    const [submitStatus, setSubmitStatus] = useState(true);
    const [formSubmitted, setformSubmitted] = useState(false);

    useEffect(() => {
        if (errorMessage) {
            Toast.fire({
                icon: 'error',
                position: 'bottom',
                text: errorMessage,
                title: 'Error en la autenticación',
            });
        }
    }, [errorMessage])


    useEffect(() => {
        setSubmitStatus(form.username.length > 0 && form.password.length > 0 ? false : true);
    }, [form]);

    const statusUsername = useMemo(() => {
        if (!formSubmitted) return;
        return (form.username.length > 0) ? StatusInput.ENABLED : StatusInput.INVALID;
    }, [form.username, formSubmitted]);

    const statusPassword = useMemo(() => {
        if (!formSubmitted) return;
        return (form.password.length > 0) ? StatusInput.ENABLED : StatusInput.INVALID;
    }, [form.password, formSubmitted]);

    const onChangeUsername = ({ target }) => setForm({ ...form, username: target.value });

    const onChangePassword = ({ target }) => setForm({ ...form, password: target.value });

    const onSubmit = () => {
        setformSubmitted(true);
        startLogin({ ...form });
    }

    const header = <img alt="Card" src={userIcon}/>;

    const footer = (
        <>
            <Button label="Log In" severity="secondary" onClick={onSubmit} disabled={submitStatus} text raised />
            <Button label="Sign Up" severity="secondary" onClick={onSubmit} text raised/>
        </>
    );

    return (
        <div className='auth-container'>
            <Card title="Login" header={header} footer={footer}>
                <Input
                    name="username"
                    type="text"
                    placeholder="Username *"
                    value={form.username}
                    status={statusUsername}
                    onChange={onChangeUsername}
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Password *"
                    value={form.password}
                    status={statusPassword}
                    onChange={onChangePassword}
                />
            </Card>
        </div>
    );
}
