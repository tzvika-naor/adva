import { useRef } from 'react'
function Quantity (props) {

    console.log(props)
    // const index = props.index;
    // const items = props.items;
    const onChange = (event) => {
        if (event.target.value > 0) {
            props.setQuantity(props.index, event.target.value )
        }

    }
    return (
        <div>
            <li><input className="form-control" type="number" value={props.smartphone.quantity} onChange={onChange}></input></li>
        </div>
    )
}
export default Quantity;