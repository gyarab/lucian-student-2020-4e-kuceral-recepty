import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';
/*
posle serveru prikaz upravit komentar v databazi
*/
export const editComments = async (content, comment_id, setComments, comments, index, source, setEditing) => {
    return await jwtTransport({
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            content
        },
        cancelToken: source.token,
        url: `/comments/update_comment/${comment_id}`,
    })
        .then(res => {
            setComments(update(comments, {
                [index]: {
                    $merge: res.data
                }
            }));
            setEditing(false);
        })
        .catch(err => console.error(err));
};