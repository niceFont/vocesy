/* eslint-disable */

const db = require("../../../lib/db.js");
const escape = require("sql-template-strings");
const { CheckForValues } = require("../../../lib/utils");
import { apiWithAuth } from "../../../lib/middlewares";

module.exports = apiWithAuth(async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const { id } = JSON.parse(req.body);
      CheckForValues([id]);

      let response = await db.query(escape`
                DELETE FROM decks WHERE deck_id=${id};
            `);
      if (response instanceof Error) throw new Error(response.message);
      res.status(200).json(response);
    } catch (err) {
      if (err instanceof TypeError) res.status(400).send(err);
      else res.status(500).send(err.message);
    }
  } else {
    res.status(400).send("Request Method " + req.method + " is not allowed.");
  }
});
