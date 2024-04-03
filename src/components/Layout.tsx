import { Outlet } from "react-router-dom";

export const Layout = () => (
  <div>
    <header>
      Barclays technical test
    </header>
    
    <main>
      <Outlet />
    </main>
    
    <footer>
      3rd April 2024 - Joaquín Martí
    </footer>
  </div>
);
