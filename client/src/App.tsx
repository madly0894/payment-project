import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const App: FC = () => (
   <div className='App'>
      <Outlet />
   </div>
);

export default App;
