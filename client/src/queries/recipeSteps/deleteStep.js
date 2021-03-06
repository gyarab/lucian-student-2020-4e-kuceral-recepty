import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
posle prikaz serveru prikaz na smazani kroku receptu
*/
export const deleteStep = async (step_id, setSteps, recipie_id, source) => {
    return await jwtTransport({
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        cancelToken: source.token,
        url: `/recipe_steps/delete_step/${recipie_id}`,
        data: {
            id: step_id
        }
    })
        .then(res => {
            setSteps(oldSteps =>
                [...oldSteps.filter(
                    step => step.step_id !== res.data.step_id
                )]);
        })
        .catch(err => console.error(err));
};