import React from 'react';
import Card from 'react-bootstrap/Card';
/*
Karta nacini kroku
*/
function StepUtensilCard({ utensil }) {
    const {
        name
    } = utensil;
    return (
        <Card>
            <Card.Body>
                <div>
                    {name}
                </div>
            </Card.Body>
        </Card>
    )
}

export default StepUtensilCard;