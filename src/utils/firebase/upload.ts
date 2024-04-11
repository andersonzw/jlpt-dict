import { db } from "./firebase-config.ts";
import { collection, addDoc } from "firebase/firestore";
import jlptn1 from "../../assets/jlptn1.json";
import jlptn2 from "../../assets/jlptn2.json";
import jlptn3 from "../../assets/jlptn3.json";
import jlptn4 from "../../assets/jlptn4.json";
import jlptn5 from "../../assets/jlptn5.json";
import jlptn0 from "../../assets/jlptn0.json";

export const uploadData = async () => {
  const dataArrays = [
    { data: jlptn1, collectionName: "jlptn1" },
    { data: jlptn2, collectionName: "jlptn2" },
    { data: jlptn3, collectionName: "jlptn3" },
    { data: jlptn4, collectionName: "jlptn4" },
    { data: jlptn5, collectionName: "jlptn5" },
    { data: jlptn0, collectionName: "jlptn0" },
  ]; // Your JSON data

  dataArrays.forEach(async (dataArray) => {
    const collectionName = dataArray.collectionName;
    dataArray.data.forEach(async (dataItem) => {
      try {
        await addDoc(collection(db, collectionName), dataItem);
        console.log("Document added successfully");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    });
  });
};

// Call uploadData() where appropriate, e.g., after a button click or on component mount (considering usage limits and costs).
