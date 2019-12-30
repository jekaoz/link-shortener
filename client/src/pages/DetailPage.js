import React, {
    useState,
    useCallback,
    useContext,
    useEffect,
} from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import {Loader} from '../components/Loader';
import {LinkCard} from '../components/LinkCard';

export const DetailPage = () => {
    const {token} = useContext(AuthContext);
    const [link, setLink] = useState(null);
    const linkId = useParams().id;
    const {loading, request} = useHttp();

    const getLink = useCallback(async () => {
        try {
            const data = await request({
                url: `/api/link/${linkId}`,
                headers: {Authorization: `Bearer ${token}`},
            });

            setLink(data);
        } catch (e) {

        }
    }, [token, linkId, request]);

    useEffect(() => {
        getLink();
    }, [getLink]);

    if (loading) {
        return <Loader/>;
    }

    return (
        <>
            {(!loading && link) && (
                <LinkCard link={link}/>
            )}
        </>
    );
};
