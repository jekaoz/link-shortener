import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook';

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [link, setLink] = useState('');

    const pressHandler = async (e) => {
        if (e.key === 'Enter') {
            try {
                const data = await request({
                    url: '/api/link/generate',
                    method: 'POST',
                    body: {from: link},
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    }
                });

                history.push(`/detail/${data.link._id}`);
            } catch (e) {}
        }
    };

    return (
        <div className="row">
            <div
                className="col s8 offset-s2"
                style={{
                    paddingTop: '2rem',
                }}
            >
                <div className="input-field">
                    <input
                        id="link"
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">{'Введите ссылку'}</label>
                </div>
            </div>
        </div>
    );
};
