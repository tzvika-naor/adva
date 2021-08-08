import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import history from '../History'
function Search (props) {
    const location = useLocation();

    const searchResults = (data) => {
        props.searchResults(data);
    }
    const [brandButton, setBrandButton] = useState(false);
    const [batteryButton, setBatteryButton] = useState(false);
    const [displayButton, setDisplayButton] = useState(false);
    const [rearCameraButton, setRearCameraButton] = useState(false);
    const [processorButton, setProcessorButton] = useState(false);
    const [frontCameraButton, setFrontCameraButton] = useState(false);
    const [priceButton, setPriceButton] = useState(false)
    const [initials, setInitials] = useState([]);

    const [price, setPrice] = useState(['0', '20', '40', '60', '100', '200', '400', '800'])
    const [brands, setBrands] = useState([]);
    const [batteryCapacity, setBatteryCapacity] = useState([]);
    const [display, setDisplay] = useState([])
    const [rearCamera, setRearCamera] = useState([]);
    const [frontCamera, setFrontCamera] = useState([]);
    const [processor, setProcessor] = useState([])
    useEffect((props) => {
        axios.get('http://localhost:5000/api/smartphone')
            .then(response => {
                const data = response.data.unique;
                setBrands(data.brand);
                setBatteryCapacity(data.batteryCapacity);
                setDisplay(data.display);
                setRearCamera(data.rearCamera);
                setFrontCamera(data.frontCamera);
                setProcessor(data.processor);
                setInitials([data.brand[0], data.batteryCapacity[0], data.display[0], data.rearCamera[0], data.rearCamera[0],
                data.frontCamera[0], data.processor[0], price[0]]);
            })
    }, []);
    const [searchForm, setSearchForm] = useState({
        brand: undefined,
        batteryCapacity: undefined,
        display: undefined,
        frontCamera: undefined,
        image: undefined,
        phoneModel: undefined,
        price: undefined,
        processor: undefined,
        rearCamera: undefined
    })
    const onChange = (event) => {
        console.log([event.target.name])
        setSearchForm({ ...searchForm, [event.target.name]: event.target.value })
    }
    const onClick = () => {
        console.log(searchForm)

        axios.post('http://localhost:5000/api/smartphone/searchquery', searchForm)
            .then(response => {
                props.searchResults(response.data.smartphone);
            })

    }
    useEffect(() => {
        console.log(searchForm)
    }
        , [searchForm])

    return (
        <div>
            <div class="d-flex justify-content-center" style={{ marginTop: "20px" }} >
                <div class="btn-toolbar " >
                    <Button type="button" className="ml-2" size="lg" style={{ backgroundColor: brandButton ? 'purple' : '#007bff' }} onClick={() => {
                        setBrandButton(!brandButton)
                        if (brandButton) { setSearchForm({ ...searchForm, "brand": undefined }) }
                        else { setSearchForm({ ...searchForm, "brand": initials[0] }) }
                    }}>Brand</Button>

                    <Button type="button " className="ml-2" size="lg" style={{ backgroundColor: batteryButton ? 'purple' : '#007bff' }} onClick={() => {
                        setBatteryButton(!batteryButton)
                        if (batteryButton) { setSearchForm({ ...searchForm, "batteryCapacity": undefined }) }
                        else { setSearchForm({ ...searchForm, "batteryCapacity": initials[1] }) }

                    }}>Battery</Button>

                    <Button type="button" className="ml-2" size="lg" style={{ backgroundColor: displayButton ? 'purple' : '#007bff' }} onClick={() => {
                        setDisplayButton(!displayButton)
                        if (displayButton) { setSearchForm({ ...searchForm, "display": undefined }) }
                        else { setSearchForm({ ...searchForm, "display": initials[2] }) }
                    }}>Display</Button>

                    <Button type="button" className="ml-2" size="lg" style={{ backgroundColor: rearCameraButton ? 'purple' : '#007bff' }} onClick={() => {
                        setRearCameraButton(!rearCameraButton)
                        if (rearCameraButton) { setSearchForm({ ...searchForm, "rearCamera": undefined }) }
                        else { setSearchForm({ ...searchForm, "rearCamera": initials[3] }) }
                    }}>Rear Camera</Button>

                    <Button type="button" className="ml-2" size="lg" style={{ backgroundColor: processorButton ? 'purple' : '#007bff' }} onClick={() => {
                        setProcessorButton(!processorButton)
                        if (processorButton) { setSearchForm({ ...searchForm, "processor": undefined }) }
                        else { setSearchForm({ ...searchForm, "processor": initials[4] }) }

                    }}>Processor</Button>

                    <Button type="button" className="ml-2" size="lg" style={{ backgroundColor: frontCameraButton ? 'purple' : '#007bff' }} onClick={() => {
                        setFrontCameraButton(!frontCameraButton)
                        if (frontCameraButton) { setSearchForm({ ...searchForm, "frontCamera": undefined }) }
                        else { setSearchForm({ ...searchForm, "frontCamera": initials[5] }) }
                    }}>FrontCamera</Button>

                    <Button type="button" className="ml-2" size="lg" style={{ backgroundColor: priceButton ? 'purple' : '#007bff' }} onClick={() => {
                        setPriceButton(!priceButton)
                        if (priceButton) { setSearchForm({ ...searchForm, "price": undefined }) }
                        else { setSearchForm({ ...searchForm, "price": initials[6] }) }
                    }}>Price</Button>

                    <Button type="button" className="ml-2" size="lg" variant="success" onClick={onClick} >Search</Button>
                </div>
            </div>

            <div className="row">
                {brandButton &&
                    <div className="col-lg-3">
                        <label>Brand</label>
                        <select
                            name='brand'
                            value={searchForm.brand}
                            onChange={onChange}
                            style={{ width: "100%", marginBottom: "30px" }}
                        >
                            {brands.map((item, i) => <option value={item} key={i} >{item}</option>)}
                        </select>
                    </div>
                }
                {batteryButton && <div className="col-lg-3">
                    <label>Battery Capacity</label>
                    <select
                        name='batteryCapacity'
                        value={searchForm.batteryCapacity}
                        onChange={onChange}
                        style={{ width: "100%", marginBottom: "30px" }}
                    >
                        {batteryCapacity.map((item, i) => <option value={item} key={i} >{item}</option>)}
                    </select>
                </div>
                }
                {displayButton && <div className="col-lg-3">
                    <label>Display</label>
                    <select
                        name='display'
                        value={searchForm.display}
                        onChange={onChange}
                        style={{ width: "100%", marginBottom: "30px" }}
                    >
                        {display.map((item, i) => <option value={item} key={i} >{item}</option>)}
                    </select>
                </div>
                }

                {rearCameraButton && <div className="col-lg-3">
                    <label>Rear Camera</label>
                    <select
                        name='rearCamera'
                        value={searchForm.rearCamera}
                        onChange={onChange}
                        style={{ width: "100%", marginBottom: "30px" }}
                    >
                        {rearCamera.map((item, i) => <option value={item} key={i} >{item}</option>)}
                    </select>
                </div>
                }

                {processorButton && <div className="col-lg-3">
                    <label>Processor</label>
                    <select
                        name='processor'
                        value={searchForm.Processor}
                        onChange={onChange}
                        style={{ width: "100%", marginBottom: "30px" }}
                    >
                        {processor.map((item, i) => <option value={item} key={i} >{item}</option>)}
                    </select>
                </div>
                }
                {frontCameraButton && <div className="col-lg-3">
                    <label>FrontCamera</label>
                    <select
                        name='frontCamera'
                        value={searchForm.frontCamera}
                        onChange={onChange}
                        style={{ width: "100%", marginBottom: "30px" }}
                    >
                        {frontCamera.map((item, i) => <option value={item} key={i} >{item}</option>)}
                    </select>
                </div>}
                {priceButton && <div className="col-lg-3">
                    <label>Price</label>
                    <select
                        name='price'
                        value={searchForm.price}
                        onChange={onChange}
                        style={{ width: "100%", marginBottom: "30px" }}
                    >
                        {price.map((item, i) => <option value={item} key={i} >{item}</option>)}
                    </select>
                </div>}
            </div>
        </div>
    )
}
export default Search;