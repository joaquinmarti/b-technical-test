import type { MonthType } from "../types/date";

export const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();

export const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month - 1, 1).getDay(); 

export const getCurrentYear = () => new Date().getFullYear();
export const getCurrentMonth = () => new Date().getMonth() + 1 as MonthType;