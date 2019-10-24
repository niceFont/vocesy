import {Container, Row, Col} from "react-bootstrap"


const User = (props) => {


	return (
		<Container style={{
			marginTop: 200
		}}>
			<Row>
				<Col>
					<h6>{props.slug + "s Profile"}</h6>
				</Col>
			</Row>
		</Container>
	)
}

User.getInitialProps = async (ctx) => {

	const {slug} = ctx.query

	return {
		slug
	}

}

export default User