import express from "express";
import Web3 from "web3";
import data from "./test";

const urlAPI = "https://ropsten.infura.io/v3/c8b021f08cb744dc8be08c9d74a18ef9";
// const account = "0x9b95eF11eEa45D64fC1b5Add3A1543a0130E4B3B";

const web3 = new Web3(urlAPI);

// START APP
const app = express();

const port = 3001;

app.get(
  "/:urldata",
  (req: express.Request, res: { send: (arg0: string) => void }) => {
    data.hey = req.params.urldata;
    res.send(`data = ${data.hey} = ${req.params.urldata}`);
  }
);
app.get("/", (req: express.Request, res: { send: (arg0: string) => void }) => {
  res.send(`data = ${data.hey}`);
});
app.get(
  "/:account/balance",
  async (req: express.Request, res: { send: (arg0: string) => void }) => {
    const account = req.params.account;
    const balance = await web3.eth.getBalance(account);
    const ether = web3.utils.fromWei(balance, "ether");
    res.send(`balance (${account}) = ${ether} ether`);
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
