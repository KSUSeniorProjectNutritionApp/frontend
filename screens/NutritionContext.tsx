import React, {createContext, useState, useContext, ReactNode} from 'react';
import { Dispatch, SetStateAction } from 'react';
const temp: [never[], Dispatch<SetStateAction<never[]>>] = useState([])
const temp2: [never[], Dispatch<SetStateAction<never[]>>] = useState([])
const temp3: [never[], Dispatch<SetStateAction<never[]>>] = useState([]);
const temp4: [number, React.Dispatch<React.SetStateAction<number>>] = useState(0);
const hold: [[never[], Dispatch<SetStateAction<never[]>>], [never[], Dispatch<SetStateAction<never[]>>], [never[], Dispatch<SetStateAction<never[]>>], [number, React.Dispatch<React.SetStateAction<number>>]] = [temp, temp2, temp3, temp4]
export const dailyContext = createContext(hold)
