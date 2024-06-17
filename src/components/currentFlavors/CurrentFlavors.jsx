import { useEffect, useState } from "react"
import { getCurrentFlavors } from "../../services/flavorService.js"
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import "./currentFlavors.css"


export const CurrentFlavors = () =>{

    const [currentFlavors, setCurrentFlavors] = useState([])

    useEffect(()=>{
        getCurrentFlavors().then((flavorArr)=>{
            setCurrentFlavors(flavorArr)
        })
    },[])

    return (
        <>
        <h1 className="pageTitle"> Current Flavors </h1>
        <Container className="cookies">
            <Row md={3} xs={1} className="g-4">
        {currentFlavors.map((flavorObj) => {
            return(
                <Col key={flavorObj.id} className="d-flex">
                    <Card  className="flex-fill" id="card">
                      <Card.Img variant="top" src={flavorObj.img} alt="Card Image" />
                      <Card.Body className="body">
                        <Card.Title className="title">{flavorObj.cookie}</Card.Title>
                        <Card.Text>{flavorObj.desc}</Card.Text>
                      </Card.Body>
                    </Card>
                </Col>
           
          )
        })}
         </Row>
      </Container>
      </>
  );
}