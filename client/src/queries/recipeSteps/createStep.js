import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';
/*
posle prikaz serveru na vytvoreni kroku
*/
export const createStep = async (step, setSteps, steps, recipie_id, source) => {
    const {
        duration,
        name,
        description,
        ingredients,
        utensils
    } = step;
    return await jwtTransport({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            duration,
            name,
            description,
            ingredients,
            utensils
        },
        cancelToken: source.token,
        url: `/recipe_steps/create_step/${recipie_id}`,
    })
        .then(res => {
            setSteps(update(steps, {
                $push: [res.data]
            }));
        })
        .catch(err => console.error(err));
};