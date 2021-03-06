import React, { Fragment, useContext } from 'react';
import { RecipeFormContext } from '../../../context/recipeForm';
import RecipeIngredientsCard from './recipeIngredientsCard';
import withScrolling from 'react-dnd-scrolling';
/*
zobrazi ingredience receptu ve druhem kroku formulare na recepty
*/
const ScrollingComponent = withScrolling('div');

function IngredientsDisplay() {
    const {recipeIngredients } = useContext(RecipeFormContext);
    return (
        <Fragment>
            <h3 style={{ textAlign: 'center' }}>Your Ingredients</h3>
            <ScrollingComponent className='column'>
                {recipeIngredients.map((ingredient, index) => (
                    <div key={ingredient.ingredients_id}>
                        <RecipeIngredientsCard
                            ingredients={{
                                ...ingredient,
                                index
                            }} />
                    </div>
                ))}
            </ScrollingComponent>
        </Fragment>
    )
}

export default IngredientsDisplay;