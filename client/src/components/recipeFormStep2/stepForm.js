import React, { useContext } from 'react';
import FormStepIngredients from './formStepIngredients';
import FormStepUtensils from './formStepUtensils';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { RecipeFormContext } from '../../context/recipeForm';
import { StepFormContext } from '../../context/stepForm';
import update from 'immutability-helper';
import { v4 as uuidv4 } from 'uuid';
function StepForm() {
    const { register, handleSubmit, errors } = useForm();
    const { setRecipeStepsData, recipeStepsData } = useContext(RecipeFormContext);
    const { formIngredientsData: { formIngredients }, formUtensilsData: { formUtensils } }
        = useContext(StepFormContext);
    function createStep(data) {
        console.log(data);
        const { name, duration, description } = data;
        setRecipeStepsData(update(recipeStepsData, {
            recipeSteps: {
                $push: [{
                    step_id: uuidv4(),
                    name,
                    duration,
                    description,
                    ingredients: formIngredients,
                    utensils: formUtensils
                }]
            },
            tempSteps: {
                $push: [{
                    step_id: uuidv4(),
                    name,
                    duration,
                    description,
                    ingredients: formIngredients,
                    utensils: formUtensils
                }]
            }
        }))
    }
    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit(createStep)}>
                            <Form.Group controlId="formGroupYear">
                                <Form.Control autoComplete="off"
                                    name='name'
                                    type='text'
                                    placeholder='Name'
                                    ref={register({
                                        required: true,
                                        maxLength: 255
                                    })} />
                                {errors.name && errors.name.type === "required" && (
                                    <Form.Text className="helperText">Name is empty!</Form.Text>
                                )}
                                {errors.name && errors.name.type === "maxLength" && (
                                    <Form.Text className="helperText">255 chars max!</Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Control autoComplete='off'
                                    name='duration'
                                    type='time'
                                    placeholder='duration'
                                    ref={register({
                                        required: true
                                    })} />
                                {errors.duration && errors.duration.type === "required" && (
                                    <Form.Text className="helperText">Duration is empty!</Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Control as="textarea" rows={3} style={{ width: '100%' }}
                                    autoComplete="on"
                                    name='description'
                                    type="text"
                                    placeholder="Description"
                                    ref={register({})} />
                            </Form.Group>
                            <Button
                                type='submit'
                                variant='light'
                                style={{ width: '100%' }}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormStepIngredients />
                    </Col>
                    <Col>
                        <FormStepUtensils />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default StepForm;