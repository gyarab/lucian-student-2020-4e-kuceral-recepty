import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';

export const createUtensil = async (name, setUtensils, recipie_id) => {
    return await jwtTransport({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            name
        },
        url: `http://localhost:5000/recipe_utensils/create_utensil/${recipie_id}`,
    })
        .then(res => {
            setUtensils(oldUtensils => [res.data, ...oldUtensils])
        })
        .catch(err => console.error(err));
};