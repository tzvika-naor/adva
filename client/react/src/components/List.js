import Smartphone from './Smartphone'
import { useState, useEffect } from 'react';
import axios from 'axios';
import history from '../History';

const List = (props) => {

    const [smartphones, setSmartphones] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [smartphoneItem, setSmartphoneItem] = useState([])

    useEffect(() => {
        props.setSmartphones(smartphoneItem);
    }, [totalPrice])

    const addToCart = (smartphone) => {

        setSmartphoneItem({ smartphone, quantity: 1 })
        setTotalPrice(totalPrice => totalPrice + smartphone.price);

    }

    useEffect(() => {
    }, [totalPrice])

    useEffect(() => {

        if (!JSON.parse(localStorage.getItem('user'))) {
            history.push('/')
        }


        axios.get('http://localhost:5000/api/smartphone')
            .then(response => {
                const data = response.data.smartphones;
                let obj = data.map(smartphone => {
                    smartphone.id = smartphone._id
                    delete smartphone._id
                    return smartphone;
                })
                setSmartphones(obj);
            })
    }, []);

    if (!props.showResults) {
        return (

            <div className="row" style={{ width: "98%", marginLeft: "1%", marginTop: "2%", marginBottom: "2%" }}>
                {
                    smartphones.map((smartphone, index) => {
                        return <Smartphone
                            key={index}
                            smartphone={smartphone}
                            addToCart={(data) => addToCart(data)}
                        />
                    })
                }
            </div>
        )
    }
    //has a bug needs to lift up state in order to work!!! would make the code much messi 
    else {
        return (

            <div className="row" style={{ width: "98%", marginLeft: "1%" }}>
                {
                    props.searchResults.map((smartphone, index) => {
                        return <Smartphone
                            key={index}
                            smartphone={smartphone}
                            addToCart={(data) => addToCart(data)}
                        />
                    })
                }
            </div>
        )
    }
}

export default List