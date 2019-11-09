import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSpring, animated } from "react-spring";
import { Card, Container, Row, Col } from "react-bootstrap";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export const AnimatedCard = props => {
  const [test, setTest] = useSpring(() => ({
    xys: [0, 0, 1],
    config: {
      mass: 5,
      tension: 350,
      friction: 40,
    },
  }));
  return (
    <animated.div
      onMouseMove={({ clientX: x, clientY: y }) =>
        setTest({
          xys: calc(x, y),
        })
      }
      onMouseLeave={() =>
        setTest({
          xys: [0, 0, 1],
        })
      }
      style={{
        transform: test.xys.interpolate(trans),
        margin: "10px 0 10px 0",
      }}
    >
      {/* 	<animated.div style={animatedProps} onMouseMove={() => set({
			opacity: .5,
			s: 1.5
		})} onMouseLeave={() => set({
			opacity: 1,
			s: 1
		})}> */}
      <Card
        style={{
          cursor: "pointer",
          margin: "10px 10px 10px 10px",
          willChange: "transform",
          width: "15rem",
          height: "20rem",
        }}
      >
        <Container>
          <Row>
            <Col
              style={{
                padding: "7px 3px 0 3px",
              }}
              className="text-right"
            >
              <span
                style={{
                  margin: 10,
                }}
                onClick={e => {
                  e.stopPropagation();
                  if (confirm("Are you sure you want to delete this Card?")) {
                    props._removeCard(props.cards.id);
                    props.toggleRemove(true);
                  }
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
              </span>
            </Col>
          </Row>
        </Container>
        <Card.Body
          onClick={() => {
            props.setEditID(props.cards.id);
            props.toggleEditing(true);
          }}
          className="align-middle"
          style={{
            padding: "10px 5px 10px 5px",
          }}
        >
          <Card.Text className="text-center">{props.cards.front}</Card.Text>
        </Card.Body>
      </Card>
    </animated.div>
  );
};
