import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
posle prikaz na server vytvorit komentar receptu
*/
export const createComment = async (recipie_id, content, setComments, username, setRecipe, source) => {
    return await jwtTransport({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            content,
            recipieId: recipie_id
        },
        cancelToken: source.token,
        url: `/comments/create_comment`,
    })
        .then(res => {
            setComments(oldComments => [{ ...res.data, username: username }, ...oldComments]);
            setRecipe(oldData => { return { ...oldData, num_of_comments: parseInt(oldData.num_of_comments) + 1 } });
        })
        .catch(err => console.error(err));
};