import firebase from "../../firebase";
import Employee from "../models/Employee";

const firestore = firebase.firestore();

export const getEmployees = async () => {
  try {
    const response = await firestore.collection("employees");
    const data = await response.get();
    let array = [];
    data.forEach((doc) => {
      const employee = new Employee(
        doc.id,
        doc.data().firstname,
        doc.data().lastname,
        doc.data().phonenumber,
        doc.data().gender,
        doc.data().city,
        doc.data().date
      );

      array.push(employee);
    });
    return array;
  } catch (error) {
    throw error;
  }
};

export const addEmployee = async (employee) => {
  try {
    await firestore.collection("employees").doc().set(employee);
  } catch (error) {
    throw error;
  }
};

export const getEmployee = async (id) => {
  try {
    const employee = await firestore.collection("employees").doc(id);
    const data = await employee.get();
    return data.data();
  } catch (error) {
    throw error;
  }
};

export const updateEmployee = async (id, data) => {
  try {
    const employee = await firestore.collection("employees").doc(id);
    await employee.update(data);
  } catch (error) {
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    await firestore.collection("employees").doc(id).delete();
  } catch (error) {
    throw error;
  }
};
