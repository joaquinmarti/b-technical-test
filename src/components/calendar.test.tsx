import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {Calendar} from './Calendar';

test("select start and end", () => {
  render(<Calendar month={1} year={2024}/>);
  
  //
  const startDay = "2";
  const endDay = "10";
  
  //
  const startButton = screen.getByTestId(startDay);
  const endButton = screen.getByTestId(endDay);
  
  const startDate = screen.getByTestId("start-day");
  const endDate = screen.getByTestId("end-day");
  
  fireEvent.click(startButton);
  fireEvent.click(endButton);
  
  // Check that the day has been selected
  expect(startDate).toHaveTextContent(startDay);
  expect(endDate).toHaveTextContent(endDay);
});

// More tests:
// - Select a start date again when there's already a start and end
// - Select start date when there's a start date and the end is selected previously
// - Range correctly highlighted