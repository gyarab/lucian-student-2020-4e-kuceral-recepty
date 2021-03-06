import React, { Fragment } from 'react';
import RecipeDisplay from '../components/main/recipeDisplay';
import { YourRecipesProvider } from '../context/yourRecipes';
import Button from 'react-bootstrap/Button';
import { FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../responsiveCss/mainCss.css';
/*
Stranka s vasimi recepty a formularem na recepty
*/
function Main() {
    return (
        <Fragment>
            <div className='firstCenterDiv'>
                <div className='secondCenterDiv'>
                    <Link to='/RecipeForm'>
                        <Button variant="light" style={{ width: '100%' }}>
                            <FiPlusCircle style={{ display: 'inline' }} />
                            <p style={{ display: 'inline' }}>Add Recipe</p>
                        </Button>
                    </Link>
                    <YourRecipesProvider>
                        <RecipeDisplay />
                    </YourRecipesProvider>   
                </div>
            </div>
        </Fragment>
    )
}
export default Main;