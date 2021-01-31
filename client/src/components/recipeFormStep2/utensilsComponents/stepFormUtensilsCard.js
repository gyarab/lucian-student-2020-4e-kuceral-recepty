import React, { Fragment, useRef, useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DimensionsContext } from '../../../context/dimensions';
import { CgRemove } from 'react-icons/cg';
import Button from 'react-bootstrap/Button';
import update from 'immutability-helper';
import { StepFormContext } from '../../../context/stepForm';
/*
Karta nacini formulare na kroky
*/
function StepFormUtensilsCard({ utensil }) {
    const {
        name,
        index,
        checkCanDrop,
        moveItem1,
    } = utensil;
    const [dimensions, setDimensions] = useState({ width: 0, heigth: 0 });
    const { width, height } = useContext(DimensionsContext);
    const { formUtensils, setFormUtensils } = useContext(StepFormContext);
    function RemoveUtensil() {
        setFormUtensils(update(formUtensils, {
            $splice: [
                [index, 1],
            ]
        }));
    }
    const ref = useRef();
    const [, drop] = useDrop({
        accept: 'UTENSILS',
        canDrop(item, monitor) {
            //check Can drop 
            return checkCanDrop(item);
        },
        hover(item, monitor) {
            if (!monitor.canDrop()) {
                return;
            }
            if (item.status === 'recipe') {
                return;
            }
            if (!ref.current) {
                return;
            }
            const dragIndex = item.status === 'form' ? item.index : 0;
            const hoverIndex = index;
            if (dragIndex === hoverIndex && item.status === 'form') {
                return;
            }
            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            //logic here
            moveItem1(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });
    const [{ isDragging }, drag, preview] = useDrag({
        item: { ...utensil, type: 'UTENSILS', status: 'form', dimensions, originalIndex: index },
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

    drag(drop(ref));
    return (
        <Fragment>
            <Card ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
                <Card.Body>
                    <div style={{ display: 'inline-block' }}>
                        <div>{name}</div>
                    </div>
                    <div style={{ float: 'right', display: 'inline-block' }}>
                        <Button variant='dark'
                            onClick={RemoveUtensil}>
                            <CgRemove />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Fragment >
    )
}

export default StepFormUtensilsCard;