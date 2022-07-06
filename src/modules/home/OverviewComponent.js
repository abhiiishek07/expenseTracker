import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTransactionView = (props) => {
  const [amount, setAmount] = useState();
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("EXPENSE");

  const handleChange = (event) => {
    const result = event.target.value.replace(/\D/g, "");
    setAmount(result);
  };

  const AddTranscDetail = () => {
    props.addTransaction({
      amount: Number(amount),
      desc,
      type,
      id: Date.now(),
    });
    props.toggleAddtxn();
  };
  const notify = () => {
    if (isNaN(amount)) toast.error("Invalid Amount");
    else if (!Boolean(desc)) toast.error("Invalid Description");
    else toast.success("Transiction added successfully");
  };
  return (
    <AddTransactionContainer>
      <input
        placeholder="Amount"
        value={amount}
        type="text"
        onChange={handleChange}
      />
      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <RadioBox>
        <input
          type="radio"
          id="expense"
          name="type"
          value="EXPENSE"
          checked={type === "EXPENSE"}
          onClick={() => setType("EXPENSE")}
        />
        <label htmlFor="expense">Expense</label>
        <input
          type="radio"
          id="income"
          name="type"
          value="INCOME"
          checked={type === "INCOME"}
          onClick={() => setType("INCOME")}
        />
        <label htmlFor="income">Income</label>
      </RadioBox>
      <AddTrancBtn
        onClick={() => {
          AddTranscDetail();
          notify();
        }}
      >
        Add Transaction
      </AddTrancBtn>
    </AddTransactionContainer>
  );
};

const OverViewComponent = (props) => {
  const [isAddTxnVisible, toggleAddtxn] = useState(false);
  return (
    <Container>
      <BalanceBox>
        Balance:Rs {props.income - props.expense}
        <AddTrancBtn
          onClick={() => {
            toggleAddtxn(!isAddTxnVisible);
          }}
        >
          {isAddTxnVisible ? "cancel" : "Add"}
        </AddTrancBtn>
      </BalanceBox>
      {isAddTxnVisible && (
        <AddTransactionView
          toggleAddtxn={toggleAddtxn}
          addTransaction={props.addTransaction}
        />
      )}
      <ToastContainer autoClose={1000} position="top-center" />
      <ExpenseBoxCont>
        <Box isIncome={false}>
          Expense<span>Rs {props.expense}</span>
        </Box>
        <Box isIncome={true}>
          Income<span>Rs {props.income}</span>
        </Box>
      </ExpenseBoxCont>
    </Container>
  );
};
export default OverViewComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  width: 100%;
`;
const BalanceBox = styled.div`
  font-size: 18px;
  width: 100%;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const AddTrancBtn = styled.button`
  background: black;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
`;
const AddTransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #e6e8e9;
  gap: 10px;
  padding: 15px 20px;
  margin: 20px;
  & input {
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
  }
`;
const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  & input {
    width: unset;
    margin: 0 10px;
  }
`;
const ExpenseBoxCont = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 20px;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e8e9;
  border-radius: 4px;
  padding: 10px 20px;
  width: 120px;
  & span {
    font-weight: bold;
    font-size: 20px;
    color: ${(props) => (props.isIncome ? "green" : "red")};
  }
`;
