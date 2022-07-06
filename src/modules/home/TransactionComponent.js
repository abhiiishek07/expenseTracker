import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const TransactionComponent = (props) => {
  const [searchText, updatedSearchText] = useState("");
  const [filteredTransaction, updatedTxn] = useState(props.transactions);

  const deleteAll = () => {
    props.clearAll({ isClearAll: true });
  };

  const filterData = (searchText) => {
    if (!searchText || !searchText.trim().length) {
      updatedTxn(props.transactions);
      return;
    }
    let txn = [...props.transactions];
    txn = txn.filter((payload) =>
      payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    updatedTxn(txn);
  };
  const TransactionCell = (t) => {
    return (
      <CellContainer>
        <Cell isExpense={t.payload.type === "EXPENSE"}>
          <span>{t.payload.desc} </span>
          <span>Rs {t.payload.amount}</span>
        </Cell>
        <BtnContainer>
          <IconButton aria-label="delete" size="small" className="deleteAllBtn">
            <DeleteIcon
              onClick={() => {
                props.deleteItem({ toBeDelId: t.payload.id });
              }}
            />
          </IconButton>
        </BtnContainer>
      </CellContainer>
    );
  };

  //
  useEffect(() => filterData(searchText), [props.transactions]);

  return (
    <Container>
      Transaction
      <input
        placeholder="search"
        value={searchText}
        onChange={(e) => {
          updatedSearchText(e.target.value);
          filterData(e.target.value);
        }}
      />
      {filteredTransaction.length
        ? filteredTransaction.map((payload) => (
            <TransactionCell payload={payload} />
          ))
        : ""}
      {filteredTransaction.length ? (
        <ClearAllBtn onClick={deleteAll}>Clear All</ClearAllBtn>
      ) : (
        ""
      )}
    </Container>
  );
};
export default TransactionComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 22px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  & input {
    padding: 10px 12px;
    border-radius: 10px;
    width: 100%;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
  }
`;
const Cell = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px 15px;
  font-weight: bold;
  border-radius: 2px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e6e8e9;
  border-left: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
  .deleteBtn {
    &:hover {
      background-color: red;
    }
  }
`;
const ClearAllBtn = styled.button`
  background-color: #ff4757;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
`;
const CellContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 330px;
  gap: 5px;
`;
const BtnContainer = styled.div`
  display: flex;
  width: 2%;
  .deleteAllBtn {
    color: #ff4757;
  }
`;
