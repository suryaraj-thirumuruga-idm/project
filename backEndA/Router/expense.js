const express = require("express");
const exprouter = express.Router();
const surya = require("../Schema");


exprouter.post("/", async (req, res) => {
  const { Ulable, Uvalue, Udate } = req.body;
  const a = await surya({
    lable: Ulable,
    value: Uvalue,
    date: Udate,
  });
  await a.save();
  res.json(a);
});

exprouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const a = await surya.findById(id);
  res.json(a);
});

exprouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await surya.findByIdAndDelete(id);

  res.json("deleted...");
});

exprouter.put("/:id", async (req, res) => {
  const { id } = req.params;

  const a = await surya.findById(id);

  (a.lable = req.body.Ulable),
    (a.value = req.body.Uvalue),
    (a.date = req.body.Udate);
  a.save();

  res.json("updated..." + a);
});

module.exports = exprouter;
