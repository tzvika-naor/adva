import { Button } from "react-bootstrap";
import { useState } from 'react';
import "./SmartphoneDetails.css"
import history from '../History';

function SmartphoneDetails(props) {
    const [itemProps, setProps] = useState(props);
    console.log(props.history.location.smartphone.smartphone);
    // const [smartphone, setSmartphone] = props.history.location.smartphone.smartphone

    const goBack = (event) => {
        history.push('/smartphones');
    }

    const addToCart = (event, i) => {
        alert(`${props.history.location.smartphone.smartphone.phoneModel} added to your order`);
        props.history.location.smartphone.addToCart(props.history.location.smartphone.smartphone)
    }

    return (
        <div id="wrapper" classNameNameName="d-flex justify-content-center" style={{ marginLeft: "20%", marginTop: "50px", marginBottom: "50px" }} >
                 <div className="card" >
                <div className="card-body">
                    <div className="row">
                        <div className="col-9">
                            <h1 className="d-flex justify-content-center card-header">Model: {props.history.location.smartphone.smartphone.phoneModel}</h1>
                            <h1 className="d-flex justify-content-center card-header">Brand: {props.history.location.smartphone.smartphone.brand}</h1>
                            <h1 className="d-flex justify-content-center card-header">Display: {props.history.location.smartphone.smartphone.display}</h1>
                            <h1 className="d-flex justify-content-center card-header">frontCamera: {props.history.location.smartphone.smartphone.frontCamera}</h1>
                            <h1 className="d-flex justify-content-center card-header">processor: {props.history.location.smartphone.smartphone.processor}</h1>
                            <h1 className="d-flex justify-content-center card-header">rearCamera: {props.history.location.smartphone.smartphone.rearCamera}</h1>
                            <h1 className="d-flex justify-content-center card-header">batteryCapacity: {props.history.location.smartphone.smartphone.batteryCapacity}</h1>
                            <h1 className="d-flex justify-content-center card-header">price: {props.history.location.smartphone.smartphone.price}$</h1>
                        </div>
                        <div className="col-3">
                            <img className="card-img-top" src={props.history.location.smartphone.smartphone.image} alt="Card image cap" style={{ height: "450px", width: "100%" }} />
                        </div>
                    </div>
                </div >
            </div>
            <Button onClick={(event, i) => addToCart(event, i)}>Add to cart</Button>
            <Button type="button" id="goBack" variant="primary" style={{ position: 'absolute' }} onClick={(event) => goBack(event)}>Back</Button>
        </div >

    )
}
export default SmartphoneDetails;