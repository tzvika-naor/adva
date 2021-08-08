import './Home.css'
import Carousel from 'react-bootstrap/Carousel'
function Home (props) {
    return (
        <div style={{position:"relative", top:"0"}}>
            { 
                <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="images/1.jpg"
                    alt="First slide"
                    style={{height:"1000px"}}

                  />
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="images/2.jpg"
                    alt="Third slide"
                    style={{height:"1000px"}}
                  />
              
                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="images/3.jpg"
                    alt="Third slide"
                    style={{height:"1000px"}}

                  />
              
                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            
            
            }
          
        </div>
    )
}
export default Home;