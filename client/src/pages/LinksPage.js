import React, {
    useState,
    useCallback,
    useContext,
    useEffect,
} from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import {Loader} from '../components/Loader';
import {LinksList} from '../components/LinksList';

export const LinksPage = () => {
    const {token} = useContext(AuthContext);
    const [links, setLinks] = useState([]);
    const {loading, request} = useHttp();

    const fetchLinks = useCallback(async () => {
        try {
            const data = await request({
                url: '/api/link',
                headers: {Authorization: `Bearer ${token}`},
            });

            setLinks(data);
        } catch (e) {}
    }, [token, request]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    if (loading) {
        return <Loader/>;
    }

    return (
        <>
            <LinksList links={links}/>
        </>
    );
};
