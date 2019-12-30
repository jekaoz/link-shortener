import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';


export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const registerHandler = async () => {
        try {
            const data = await request({
                url: '/api/auth/register',
                method: 'POST',
                body: {...form},
            });

            message(data.message);
        } catch (e) {}
    };

    const loginHandler = async () => {
        try {
            const data = await request({
                url: '/api/auth/login',
                method: 'POST',
                body: {...form},
            });

            auth.login(data.token, data.userId);
        } catch (e) {}
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>{'Сократи Ссылку'}</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{'Авторизация'}</span>
                        <div>
                        <div className="input-field">
                            <input
                                id="email"
                                name="email"
                                type="text"
                                className="yellow-input"
                                value={form.email}
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">{'Email'}</label>
                        </div>
                        <div className="input-field">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="yellow-input"
                                value={form.password}
                                onChange={changeHandler}
                            />
                            <label htmlFor="password">{'Password'}</label>
                        </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{
                                marginRight: 15,
                            }}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            {'Войти'}
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            disabled={loading}
                            onClick={registerHandler}
                        >
                            {'Регистрация'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
