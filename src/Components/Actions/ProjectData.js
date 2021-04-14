import firebase from "../../firebase";
import Project from "../models/Project";

const firestore = firebase.firestore();

export const getProjects = async () => {
  try {
    const response = await firestore.collection("projects");
    const data = await response.get();
    let array = [];
    data.forEach((doc) => {
      const project = new Project(
        doc.id,
        doc.data().index,
        doc.data().projectname,
        doc.data().special,
        doc.data().status,
        doc.data().date,
      );

      array.push(project);
    });
    return array;
  } catch (error) {
    throw error;
  }
};

export const addProject = async (project) => {
  try {
    await firestore.collection("projects").doc().set(project);
  } catch (error) {
    throw error;
  }
};

export const getProject = async (id) => {
  try {
    const project = await firestore.collection("projects").doc(id);
    const data = await project.get();
    return data.data();
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (id, data) => {
  try {
    const project = await firestore.collection("projects").doc(id);
    await project.update(data);
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    await firestore.collection("projects").doc(id).delete();
  } catch (error) {
    throw error;
  }
};