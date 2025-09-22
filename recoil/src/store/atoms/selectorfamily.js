import axios from "axios";
import { atomFamily, selectorFamily } from "recoil";

export const todoAtomFamily = atomFamily({
    key: "todoAtomFamily",
    default: selectorFamily({
        key: "todoSelectorFamily",
        get: (id) => async ({get}) => {
            const res = await axios.get(`https://nosuchwebsite383274/todo?id=${id}`);
            return res.data.todo;
        }
    }) 
})