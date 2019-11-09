import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { PlayViewer } from "../../components/Player/PlayViewer";
import React, { useEffect, useState } from "react";
import { WithAuth } from "../../components/Auth/WithAuth";
import fetch from "isomorphic-fetch";
import { Loading } from "../../components/Helpers/Loading";
import { NotFound } from "../../components/Helpers/NotFound";
import { Shuffle } from "../../lib/utils";
import { PlayControl } from "../../components/Player/PlayControl";
import { CheckResult, ReturnDiffs } from "../../lib/utils";
import Link from "next/link";

const Play = WithAuth(props => {
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [shuffled, setShuffled] = useState();
  const [current, goNext] = useState(0);
  const [userInput, pushInput] = useState([]);
  const [done, toggleDone] = useState(false);
  const [flipped, toggleFlipped] = useState(false);

  useEffect(() => {
    async function fetchCards() {
      try {
        let response = await fetch(
          `/api/decks?user=${props.user.displayName}&slug=${props.slug}`
        );
        if (!response.ok) throw new Error(response.statusText);
        let cards = await response.json();
        if (cards.length) {
          setData(cards);
          setShuffled(Shuffle(cards));
        }
        setFetched(true);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCards();
  }, [props.slug, props.user.displayName]);

  function _restart() {
    setShuffled(cards => Shuffle(cards));
    goNext(0);
    pushInput([]);
    toggleDone(false);
  }

  async function _sendStats(roundResult) {
    try {
      let results = roundResult.map(x => x.result.toString());
      let response = await fetch("/api/stats/submit", {
        headers: {
          authorization: "Bearer " + props.token,
        },
        method: "POST",
        body: JSON.stringify({
          roundResult: results,
          deckId: data[0].deck_id,
        }),
      });

      if (!response.ok) throw new Error(response.statusText);
    } catch (err) {
      console.error(err);
    }
  }

  function _verifyResult() {
    return userInput.map((input, index) => {
      if (props.settings.uv === "false") {
        return {
          result: CheckResult(input, shuffled[index].back),
          front: shuffled[index].front,
          back: shuffled[index].back,
          diffs: ReturnDiffs(input, shuffled[index].back),
        };
      } else {
        return {
          result: input,
          front: shuffled[index].front,
          back: shuffled[index].back,
          diffs: null,
        };
      }
    });
  }

  return (
    <Container
      style={{
        marginTop: 150,
      }}
    >
      {!fetched ? (
        <Loading fetched={fetched}></Loading>
      ) : (
        <div>
          <Link href={`/decks/${props.slug}`}>
            <Button
              variant="outline-dark"
              style={{
                marginTop: 0,
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
            </Button>
          </Link>
          {data.length ? (
            <React.Fragment>
              <PlayViewer
                flipped={flipped}
                toggleFlipped={toggleFlipped}
                done={done}
                max={shuffled.length}
                current={current + 1}
                userInput={userInput}
                verifyResult={_verifyResult}
                settings={props.settings}
                sendStats={_sendStats}
                data={shuffled}
              ></PlayViewer>
              <PlayControl
                restart={_restart}
                flipped={flipped}
                toggleFlipped={toggleFlipped}
                done={done}
                toggleDone={toggleDone}
                pushInput={pushInput}
                current={current}
                max={shuffled.length}
                next={goNext}
                settings={props.settings}
              ></PlayControl>
            </React.Fragment>
          ) : (
            <NotFound></NotFound>
          )}
        </div>
      )}
    </Container>
  );
});

Play.getInitialProps = async function(ctx) {
  let { slug } = ctx.query;
  let settings = ctx.query;

  if (!settings) {
    settings = {
      userValidation: "false",
    };
  }
  return {
    slug,
    settings,
  };
};

export default Play;
