
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import history from '../History';

function SmartphoneEdit (props) {
    console.log(props)

    const [isEdit, setIsEdit] = useState(false);

    useEffect((props) => {
        console.log(props)
        axios.get('http://localhost:5000/api/smartphone').then((response) => {
        });
    }, [])
    const [formData, setFormData] = useState({
        phoneModel: props.location.smartphone.smartphone.phoneModel,
        brand: props.location.smartphone.smartphone.brand,
        display: props.location.smartphone.smartphone.display,
        frontCamera: props.location.smartphone.smartphone.frontCamera,
        rearCamera: props.location.smartphone.smartphone.rearCamera,
        processor: props.location.smartphone.smartphone.processor,
        batteryCapacity: props.location.smartphone.smartphone.batteryCapacity,
        price: props.location.smartphone.smartphone.price,
        image: props.location.smartphone.smartphone.image,
        id: props.location.smartphone.smartphone.id
    })

    const onSubmit = event => {
        event.preventDefault();
        if (isEdit) {
            axios.put(`http://localhost:5000/api/smartphone/${formData.id}`, formData).then((response) => {
                history.push('/smartphones')
            })
        }

        else {
            axios.post('http://localhost:5000/api/smartphone', formData).then((response) => {
                history.push('/smartphones');
            })
        }
    }

    const change = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    const resetForm = (event) => {
        setFormData({
            phoneModel: '',
            brand: '',
            display: '',
            frontCamera: '',
            rearCamera: '',
            processor: '',
            batteryCapacity: '',
            price: 0,
            image: ''
        })

    }
    const goBack = (event) => {
        history.push('/smartphones');
    }
    const onDelete = () => {
        axios.delete(`http://localhost:5000/api/smartphone/${formData.id}`, formData).then((response) => {
            history.push('/smartphones')
        })
    }

    return (
        <div>
            <Button type="button" id="edit" variant="success" style={{ marginRight: '10px', marginLeft: "30px" }} onClick={() =>{ 
                  alert("UPDATE the form!");
                setIsEdit(true)}}>Edit</Button>
            <Button type="button" id="add" variant="primary" style={{ marginRight: '10px' }} onClick={() =>{
                  alert("ADD a form!");
                  setIsEdit(false)}}>Add</Button>
            <Button type="button" id="delete" variant="danger" style={{ marginRight: '10px' }} onClick={() => onDelete()}>Delete</Button>

            <div className="col-md-6" style={{ marginTop: "20px" }}>
                <div className="card" id="formCard" >
                    <div className="card-body">
                        {
                            <form onSubmit={onSubmit}>
                                <label>Phone Model</label>
                                <input
                                    className="form-control"
                                    name="phoneModel"
                                    type="text"
                                    value={formData.phoneModel}
                                    onChange={event => change(event)}
                                />
                                <br />
                                <label>Brand</label>
                                <input
                                    className="form-control"
                                    name="brand"
                                    type="text"
                                    value={formData.brand}
                                    onChange={event => change(event)}
                                />
                                <br />
                                <label>Display</label>
                                <input
                                    className="form-control"
                                    name="display"
                                    type="text"
                                    value={formData.display}
                                    onChange={event => change(event)}
                                />
                                <br />
                                <label>Front Camera</label>
                                <input
                                    className="form-control"
                                    name="frontCamera"
                                    type="text"
                                    value={formData.frontCamera}
                                    onChange={event => change(event)}
                                />
                                <br />
                                <label>Rear Camera</label>
                                <input
                                    className="form-control"
                                    name="rearCamera"
                                    type="text"
                                    value={formData.rearCamera}
                                    onChange={event => change(event)}
                                />
                                <br />
                                <label>Processor</label>
                                <input
                                    className="form-control"
                                    name='processor'
                                    type="text"
                                    value={formData.processor}
                                    onChange={event => change(event)} />
                                <br />
                                <label>Battery Capacity</label>
                                <input
                                    className="form-control"
                                    name='batteryCapacity'
                                    type="text"
                                    value={formData.batteryCapacity}
                                    onChange={event => change(event)}
                                />
                                <br />
                                <label>Price</label>
                                <input
                                    className="form-control"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={event => change(event)}
                                />
                                <br />
                                <label>Image</label>
                                <input
                                    className="form-control"
                                    name="image"
                                    type="text"
                                    value={formData.image}
                                    onChange={event => change(event)}
                                />
                                <img id="card-img-top" src={formData.image} alt={formData.title} style={{ width: '100px', height: '150px', marginTop: '20px', marginLeft: "40px" }} />
                                <Button type="button" id="goBack" variant="primary" style={{ position: 'absolute', bottom: '0', left: '0' }} onClick={(event) => goBack(event)}>Back</Button>
                                <Button type="submit" id="submit" variant="primary" style={{ position: 'absolute', bottom: '0', right: '0' }}>Submit</Button>
                                <Button type="button" id="reset" variant="danger" style={{ position: 'absolute', bottom: '0', right: '0', marginRight: '60px' }} onClick={(event) => resetForm(event)}>Clear</Button>
                            </form>
                        }
                    </div>
                </div>
            </div >
        </div>
    )
}
export default SmartphoneEdit;