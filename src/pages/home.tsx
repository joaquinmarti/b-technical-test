import { useState } from "react";
import { Calendar } from "../components/Calendar";
import { MONTHS } from "../constants";
import { getCurrentYear, getCurrentMonth } from "../lib/date";
import type { MonthType } from "../types/date";

export const Home = () => {
  const currentYear = getCurrentYear();
  const currentMonth = getCurrentMonth();
  
  const [month, setMonth] = useState<MonthType>(currentMonth);
  const [year, setYear] = useState<number>(currentYear);
  
  return (
    <div>
      <select
        onChange={(e) => {
          setMonth((Number((e.target as HTMLSelectElement).value)) as MonthType);
        }}
        value={month}
      >
        {Array.from(MONTHS).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      
      <select
        onChange={(e) => setYear(Number((e.target as HTMLSelectElement).value))}
        value={year}
      >
        {Array(50).fill(true).map((_, value) => (
          <option key={value} value={currentYear - value}>
            {currentYear - value}
          </option>
        ))}
      </select>
      
      <Calendar month={month} year={year} />
    </div>
  );
}

// Function overload
enum MyEvents {
  click = "click",
  hover = "hover"
}

type ClickEvent = {
  value: 'click'
}

type HoverEvent = {
  value: 'hover'
}

function handleEvent(type: MyEvents.click, payload: ClickEvent): void
function handleEvent(type: MyEvents.hover, payload: HoverEvent): void
function handleEvent(type: MyEvents, payload: ClickEvent | HoverEvent) {
  console.log(payload)
}

handleEvent(MyEvents.click, { value: "click" })
handleEvent(MyEvents.hover, { value: "hover" })
//