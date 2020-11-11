import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';

export const deleteUtensil = async (utensils_id, setUtensils, recipie_id) => {
    return await jwtTransport({
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        url: `http://localhost:5000/recipe_utensils/delete_utensil/${recipie_id}`,
        data: {
            id: utensils_id
        }
    })
        .then(res => {
            setUtensils(oldUtnesils =>
                [...oldUtnesils.filter(
                    utensil => utensil.utensils_id !== res.data.utensils_id
                )]);
        })
        .catch(err => console.error(err));
};