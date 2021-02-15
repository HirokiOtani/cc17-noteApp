import axios from "axios";

export default async function getNotes() {
  const notes = await axios.get("/get");
  return notes;
}
