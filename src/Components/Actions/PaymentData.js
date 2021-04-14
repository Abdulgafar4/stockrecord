import firebase from "../../firebase";
import Payment from "../models/Payment";

const firestore = firebase.firestore();

export const getPayments = async () => {
  try {
    const response = await firestore.collection("payments");
    const data = await response.get();
    let array = [];
    data.forEach((doc) => {
      const payment = new Payment(
        doc.id,
        doc.data().index,
        doc.data().name,
        doc.data().status,
        doc.data().date,
      );

      array.push(payment);
    });
    return array;
  } catch (error) {
    throw error;
  }
};

export const addPayment = async (payment) => {
  try {
    await firestore.collection("payments").doc().set(payment);
  } catch (error) {
    throw error;
  }
};

export const getPayment = async (id) => {
  try {
    const payment = await firestore.collection("payments").doc(id);
    const data = await payment.get();
    return data.data();
  } catch (error) {
    throw error;
  }
};

export const updatePayment = async (id, data) => {
  try {
    const payment = await firestore.collection("payments").doc(id);
    await payment.update(data);
  } catch (error) {
    throw error;
  }
};

export const deletePayment = async (id) => {
  try {
    await firestore.collection("payments").doc(id).delete();
  } catch (error) {
    throw error;
  }
};