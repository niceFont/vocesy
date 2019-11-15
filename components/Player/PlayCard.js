import { Card } from "react-bootstrap";
import Renderer from "../../components/Editor/Renderer"


const PlayCard = (props) => {

    return (
					<Card
						style={{
							position: "absolute",
							height: "22em",
							width: "16em",
						}}
					>
						<Card.Header>Front</Card.Header>
						<Card.Body className="text-center">
							<Renderer data={props.data}></Renderer>
						</Card.Body>
					</Card>
    )
}


export default PlayCard