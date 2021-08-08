import { useState, useEffect } from 'react';
import axios from 'axios';
import CardItem from './CardItem'
function OrdersHistory (props) {


    const [status, SetStatus] = useState([])
    const [orders, setOrders] = useState([])
    const [dates, setDates] = useState([])
    const [user, setUser] = useState(props.connectedUser)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/order/user/${user._id}`).then(res => {

            setOrders(res.data.orders);
        }
        )
    }, [])


    const [searchForm, setSearchForm] = useState({
        status: '',
        data_from: '',
        date_to: ''
    })

    const onChange = (event) => {
        setSearchForm({ ...searchForm, [event.target.name]: event.target.value })
    }

    return (

        <div style={{ marginTop: "60px", marginLeft: "130px" }}>
            User Details
            <h4>Name: {user.firstname} {user.lastname}</h4>
            <h4>Email: {user.email}</h4>
            <h4>Phone: {user.phone}</h4>

            <div className="row" >

                {
                    orders.map((order, index) => {
                        return (
                            <div className="col-lg-4">
                                <CardItem order={order} key={index} />
                            </div>
                        )
                    })
                }

            </div>
        </div >)
}
export default OrdersHistory;