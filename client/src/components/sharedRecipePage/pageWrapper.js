import React, { Fragment, useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import { YourRecipeContext } from '../../context/yourRecipe';
import { getRecipe } from '../../queries/sharedRecipeQueries/sharedRecipe';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RecipeDataDisplay from './recipeDataDisplay';
import '../../responsiveCss/recipePage.css';
function PageWrapper({ recipie_id }) {
    const { recipe, setRecipe } = useContext(YourRecipeContext);
    useEffect(() => {
        const reciveData = async () => {
            await getRecipe(recipie_id, setRecipe);
        }
        reciveData();
    }, [recipie_id, setRecipe]);
    return (
        <Fragment>
            {recipe && (
                <Container>
                    <Row>
                        <Col>
                            <RecipeDataDisplay />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            ingredients and utensils
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            step display
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            display comments
                        </Col>
                    </Row>
                </Container>
            )}
        </Fragment>
    )
}

export default PageWrapper;