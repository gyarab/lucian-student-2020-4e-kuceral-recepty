import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';


export const deleteRecipe = async (recipie_id, setDeleted) => {
    return await jwtTransport({
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        url: `http://localhost:5000/recipies/delete_recipie/${recipie_id}`
    })
        .then(res => {
            setDeleted(true);
        })
        .catch(err => console.error(err));
};