import React, { useState, useEffect, useContext, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { BiMenu } from 'react-icons/bi';
import { useDrag, useDrop } from 'react-dnd'
import { DimensionsContext } from '../../../context/dimensions';
import { getEmptyImage } from 'react-dnd-html5-backend';
function StepIngredientsCard({ ingredients }) {
    const {
        name,
        category,
        index,
        step_id,
        checkCanDrop,
        moveItem1,
        ultraOriginalStepIndex
    } = ingredients;
    const { height, width } = useContext(DimensionsContext);
    const [dimensions, setDimensions] = useState({ width: 0, heigth: 0 });
    const ref = useRef();
    const [, drop] = useDrop({
        accept: 'INGREDIENTS',
        canDrop(item, monitor) {
            return checkCanDrop(item);
        },
        hover(item, monitor) {
            if (!monitor.canDrop()) {
                return;
            }
            if (item.status === 'recipe') {
                return;
            }
            if (item.ultraOriginalStepIndex !== ultraOriginalStepIndex) {
                return;
            }
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            const sameList = item.status === 'step' && item.step_id === step_id;
            if (dragIndex === hoverIndex && sameList) {
                return;
            }
            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            //logic
            moveItem1(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });
    const [{ isDragging }, drag, preview] = useDrag({
        item: {
            ...ingredients,
            type: 'INGREDIENTS',
            status: 'step',
            dimensions,
            originalIndex: index,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end(item, monitor) {
            if (!monitor.didDrop()) {
                moveItem1(item.index, item.originalIndex);
            }
        }
    });
    useEffect(() => {
        if (ref.current) {
            setDimensions({
                width: ref.current.clientWidth,
                height: ref.current.clientHeight
            });
        }
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview, height, width]);
    drop(drag(ref))
    return (
        <Card ref={ref} style={{ opacity: (isDragging) ? 0 : 1 }}>
            <Card.Body ref={ref} >
                <div style={{ display: 'inline-block' }}>
                    <Card.Text className='cardText'>
                        {name}
                    </Card.Text>
                    <Card.Text className='cardText'>
                        {category}
                    </Card.Text>
                </div>
                <Dropdown style={{ display: 'inline-block', float: 'right' }}>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        <BiMenu />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Button} variant='light'>Edit</Dropdown.Item>
                        <Dropdown.Item as={Button} variant='light'>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Card.Body>
        </Card>
    )
}

export default StepIngredientsCard;