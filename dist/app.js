"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const web3_1 = __importDefault(require("web3"));
const test_1 = __importDefault(require("./test"));
const urlAPI = "https://ropsten.infura.io/v3/c8b021f08cb744dc8be08c9d74a18ef9";
// const account = "0x9b95eF11eEa45D64fC1b5Add3A1543a0130E4B3B";
const web3 = new web3_1.default(urlAPI);
// START APP
const app = (0, express_1.default)();
const port = 3001;
app.get("/:urldata", (req, res) => {
    test_1.default.hey = req.params.urldata;
    res.send(`data = ${test_1.default.hey} = ${req.params.urldata}`);
});
app.get("/", (req, res) => {
    res.send(`data = ${test_1.default.hey}`);
});
app.get("/:account/balance", async (req, res) => {
    const account = req.params.account;
    const balance = await web3.eth.getBalance(account);
    const ether = web3.utils.fromWei(balance, "ether");
    res.send(`balance (${account}) = ${ether} ether`);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
