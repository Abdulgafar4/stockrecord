import firebase from "../../firebase";
import Stock from "../models/Stock";

const firestore = firebase.firestore();

export const getStocks = async () => {
  try {
    const response = await firestore.collection("stocks");
    const data = await response.get();
    let array = [];
    data.forEach((doc) => {
      const stock = new Stock(
        doc.id,
        doc.data().index,
        doc.data().productname,
        doc.data().productcode,
        doc.data().categories,
        doc.data().instock,
        doc.data().price,
        doc.data().date,
      );

      array.push(stock);
    });
    return array;
  } catch (error) {
    throw error;
  }
};

export const addStock = async (stock) => {
  try {
    await firestore.collection("stocks").doc().set(stock);
  } catch (error) {
    throw error;
  }
};

export const getStock = async (id) => {
  try {
    const stock = await firestore.collection("stocks").doc(id);
    const data = await stock.get();
    return data.data();
  } catch (error) {
    throw error;
  }
};

export const updateStock = async (id, data) => {
  try {
    const stock = await firestore.collection("stocks").doc(id);
    await stock.update(data);
  } catch (error) {
    throw error;
  }
};

export const deleteStock = async (id) => {
  try {
    await firestore.collection("stocks").doc(id).delete();
  } catch (error) {
    throw error;
  }
};