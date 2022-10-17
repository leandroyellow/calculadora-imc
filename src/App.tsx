import styles from './App.module.css';
import logoImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import {useState} from 'react';
import {levels, calculateImc, Level} from './helpers/imc';
import {GridItem} from './components/GridItem';

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculate = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert("Preencha todos os campos")
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <div className={styles.container}>
          <img src={logoImage} alt="" />
        </div>
      </header>
      <div className={styles.containerMain}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC</h1>
          <p>Criado no século 19 pelo matemático Lambert Quételet, o Índice de Massa Corporal, conhecido pela sigla IMC, é um cálculo simples que permite medir se alguém está ou não com o peso ideal.</p>

          <input 
            type="number"
            placeholder='Digite sua altura em metros ex{1.5}'
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))} 
            disabled={toShow ? true : false}
          />
          <input 
            type="number"
            placeholder='Digite seu peso em kg ex{70.5}'
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false} 
          />
          <button onClick={handleCalculate} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item}/>
              ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25}/>
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;