import { useState } from 'react';
import './index.css'


function App() {
  const [result, setResult] = useState(0);
  const [prevValue, setPrevValue] = useState(0);
  const [operator, setOperator] = useState('');
  const [position, setPosition] = useState(1);

  const changeTheme = (newPosition) => {
    setPosition(newPosition);
    const themes = ['theme1', 'theme2', 'theme3'];
    document.body.className = themes[newPosition - 1];
  };

  const handleKeyClick = (value) => {
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
        setResult(0);
        setPrevValue(parseFloat(result));
        setOperator(value)
        break;

      case '=':
        if (operator && prevValue !== null) {
          let newResult;
          switch (operator) {
            case '+':
              newResult = prevValue + parseFloat(result)
              break;
            case '-':
              newResult = prevValue - parseFloat(result)
              break;
            case '*':
              newResult = prevValue * parseFloat(result)
              break;
            case "/":
              newResult = prevValue / parseFloat(result)
              break;
            default:
              break;
          };
          setResult(newResult >= 1e12 ? newResult.toExponential(6) : newResult.toString())
          setOperator('');
          setPrevValue(null)
        }
        break;
      case 'DEL':
        setResult((prevResult) => {
          const newResult = prevResult.toString().slice(0, -1);
          return newResult === '' ? 0 : newResult
        })
        break;
      case 'RESET':
        setOperator('');
        setPrevValue(null);
        setResult(0);
        break;
      case '.':
        if (!result.toString().includes('.')) {
          setResult((prevResult) => prevResult + '.');
        }
        break;
      default: setResult((prevResult) => {
        const newValue = (prevResult === 0 ? '' : prevResult) + value;
        const limitedValue = newValue.length > 12 ? prevResult : newValue;
        return limitedValue;
      });
        break;
    }

  };


  return (
    <div className='container'>
      <div className='calculator'>
        <div className={`title theme${position}`}>
          <h2>calc</h2>
          <h6>THEME</h6>
          <div className="theme-switcher">
            <div className="numbers">
              <span onClick={() => changeTheme(1)}>1</span>
              <span onClick={() => changeTheme(2)}>2</span>
              <span onClick={() => changeTheme(3)}>3</span>
            </div>
            <div className={`bullet_bg theme${position}`}>
              <div className={`bullet theme${position}`} style={{ left: `${(position - 1) * 33}%` }}></div>
            </div>
          </div>
        </div>
        <div className={`result theme${position}`}>
          {result}
        </div>
        <div className={`keys theme${position}`} >
          <div className={`grid-item btn_color theme${position}`} onClick={() => handleKeyClick(7)}>7</div >
          <div className={`grid-item btn_color theme${position}`} onClick={() => handleKeyClick(8)}>8</div>
          <div className={`grid-item btn_color theme${position}`} onClick={() => handleKeyClick(9)}>9</div >
          <div className={`grid-item del theme${position}`} onClick={() => handleKeyClick('DEL')}>DEL</div >
          <div className={`grid-item btn_color theme${position}`} onClick={() => handleKeyClick(4)}>4</div >
          <div className={`grid-item btn_color theme${position}`} onClick={() => handleKeyClick(5)}>5</div>
          <div className={`grid-item btn_color theme${position}`} onClick={() => handleKeyClick(6)}>6</div >
          <div className={`grid-item btn_color theme${position}`} onClick={() => handleKeyClick('+')}>+</div >
          <div className={`grid-item btn_color theme${position}`} onClick={() => handleKeyClick(1)}>1</div >
          <div className={`grid-item btn_color theme${position}`} onClick={() => handleKeyClick(2)}>2</div>
          <div className={`grid-item btn_color theme${position}`} onClick={() => handleKeyClick(3)}>3</div >
          <div className={`grid-item btn_color theme${position}`} onClick={() => handleKeyClick('-')}>-</div >
          <div className={`grid-item btn_color theme${position}`} onClick={() => handleKeyClick('.')}>.</div >
          <div className={`grid-item btn_color theme${position}`} onClick={() => handleKeyClick(0)}>0</div>
          <div className={`grid-item btn_color theme${position}`} onClick={() => handleKeyClick('/')}>/</div >
          <div className={`grid-item btn_color theme${position}`} onClick={() => handleKeyClick('*')}>X</div >
          <div className={`grid-item half-width reset theme${position}`} onClick={() => handleKeyClick('RESET')}>RESET</div>
          <div className={`grid-item half-width equals theme${position}`} onClick={() => handleKeyClick('=')}>=</div>
        </div>
      </div>
    </div>
  );
}

export default App;
