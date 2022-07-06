import React from "react";
import styled from "styled-components";
import OverViewComponent from "./OverviewComponent";
import TransactionComponent from "./TransactionComponent";
import { useEffect, useState } from "react";

const HomeComponent = (props) => {
  const [transactions, updateTransactions] = useState([]);
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);

  const addTransaction = (payload) => {
    const transactionArray = [...transactions];
    if (payload.amount > 0 && payload.desc.length > 0) {
      transactionArray.push(payload);
      updateTransactions(transactionArray);
    } else {
      updateTransactions(transactionArray);
    }
  };

  const calculateBalance = () => {
    let exp = 0;
    let inc = 0;
    transactions.map((payload) => {
      payload.type === "EXPENSE"
        ? (exp += payload.amount)
        : (inc += payload.amount);
    });
    updateExpense(exp);
    updateIncome(inc);
  };

  const clearAll = (props) => {
    if (props.isClearAll == true) {
      updateIncome(0);
      updateExpense(0);
      updateTransactions([]);
    }
  };
  const deleteItem = (props) => {
    let oldArr = [...transactions];
    let res = oldArr.filter((elem) => elem.id !== props.toBeDelId);
    updateTransactions(res);
  };

  useEffect(() => calculateBalance(), [transactions]);

  return (
    <Container>
      <OverViewComponent
        addTransaction={addTransaction}
        expense={expense}
        income={income}
      />
      <TransactionComponent
        transactions={transactions}
        clearAll={clearAll}
        deleteItem={deleteItem}
      />
    </Container>
  );
};
export default HomeComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0 10px;
  width: 300px;
`;
