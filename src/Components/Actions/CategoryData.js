import firebase from "../../firebase";
import Category from "../models/Category";

const firestore = firebase.firestore();

export const getCategories = async () => {
  try {
    const response = await firestore.collection("categories");
    const data = await response.get();
    let array = [];
    data.forEach((doc) => {
      const category = new Category(
        doc.id,
        doc.data().index,
        doc.data().name,
        doc.data().date,
      );

      array.push(category);
    });
    return array;
  } catch (error) {
    throw error;
  }
};

export const addCategory = async (category) => {
  try {
    await firestore.collection("categories").doc().set(category);
  } catch (error) {
    throw error;
  }
};

export const getCategory = async (id) => {
  try {
    const category = await firestore.collection("categories").doc(id);
    const data = await category.get();
    return data.data();
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (id, data) => {
  try {
    const category = await firestore.collection("categories").doc(id);
    await category.update(data);
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    await firestore.collection("categories").doc(id).delete();
  } catch (error) {
    throw error;
  }
};