import { Button } from 'antd';
import { useState } from 'react';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        <Button type="primary" onClick={() => setCount(count + 1)}>
          Button {count}
        </Button>
      </div>
    </>
  );
}

export default App;
