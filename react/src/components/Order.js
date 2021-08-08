import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useEffect, useState } from "react";
import Quantity from './Quantity';
import history from '../History';

function Order (props) {

    const [items, setItems] = useState(props.items);
    const [totalPrice, setTotalPrice] = useState(0);
    const [user, setUser] = useState(props.connectedUser)

    useEffect(() => {

        if ((props.items).length > 0)
            calculateTotalPrice(props.items)
        else {
            alert('your cart is empty')
            history.push("/smartphones")
        }

    }, [])

    const goBack = () => {
        
        setTotalPrice(0);
        props.setItems([]);
        history.push("/smartphones");
    }

    const calculateTotalPrice = smartphones => {
        if (smartphones.length > 0) {
            const getPrice = smartphones.map(item => (item.smartphone.price) * item.quantity)
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            const total = getPrice.reduce(reducer)
            setTotalPrice(total)
        }
        else {
            setTotalPrice(0);
            history.push("/smartphones");
        }
    }
    const onCheckout = () => {
        const newItem = items.map(item => item = { id: item.smartphone._id, quantity: item.quantity })
        const order = {
            userId: user._id,
            smartphones: newItem,
            totalPrice: totalPrice,
            status: 'completed'
        }
        axios.post("http://localhost:5000/api/order", order).then(res => console.log(res))
        alert('order completed');
        props.setItems([]);
        setTotalPrice(0);
        history.push("/smartphones");
    }
    const setQuantity = (index, quantity) => {
        let itemsCopy = [...items]
        itemsCopy[index].quantity = +quantity;
        setItems(itemsCopy)
        props.setItems(itemsCopy)
        calculateTotalPrice(itemsCopy)
        localStorage.setItem("cart", JSON.stringify(itemsCopy))
    }

    const removeFromCart = (item) => {
        const filterItem = items.filter(itemEl => itemEl.smartphone.id !== item.smartphone.id)
        calculateTotalPrice(filterItem)
        setItems(filterItem)
        localStorage.setItem("cart", JSON.stringify(filterItem))
        props.setItems(filterItem)
    }
    return (
        <div >
            <div className="col-4" >
                <ul className="list-unstyled" >
                    <h4 style={{ marginBottom: "20px", marginTop: "40px", marginLeft: "40px", color: "white" }}> Your Cart </h4>
                    <div style={{ marginLeft: "60px", marginBottom: "20px", color: "black" }}>
                        <li><h3>First Name: {user?.firstname}</h3> </li>
                        <li><h3>Last Name: {user?.lastname} </h3></li>
                        <li><h3>Email: {user?.email}</h3></li>
                    </div>
                </ul>
            </div>

            {items.map((smartphone, index) => (
                <div>
                    <ul className="list-unstyled">
                        <div className="col-md-4">
                            <div className="row" >
                                <div className="col-md-9 offset-1">
                                    <li style={{ height: "120px" }} className="list-group-item">  <img style={{ width: "50px", height: "100px", float: "right" }} src={smartphone.smartphone.image} alt="" />  <h4>Model: {smartphone.smartphone.phoneModel}</h4>  <h4>Price: {smartphone.smartphone.price}$ </h4> </li>
                                </div>
                                <div className="col-md-2">
                                    <div style={{ marginTop: "30px", marginLeft: "20px", width: "60px" }}>
                                        <label>Quantity</label>
                                        <Quantity key={index} index={index} smartphone={smartphone} setQuantity={(index, data) => setQuantity(index, data)} />
                                        <Button onClick={() => removeFromCart(smartphone)}>Remove</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            ))
            }
            <div className="col-md-4" style={{ marginBottom: "30px", marginTop: "30px" }}>
                <div className="row" >
                    <div className="col-md-5 offset-1">
                        <h4>Total Price: {totalPrice}$</h4>
                    </div>
                    <div className="col-md-2">
                        <Button variant="secondary" size="lg" onClick={goBack}>
                            Cancel
                    </Button>
                    </div>
                    <div className="col-md-2">
                        <Button variant="primary" size="lg" onClick={onCheckout}>
                            Payment
                    </Button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Order;