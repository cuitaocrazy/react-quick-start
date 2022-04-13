import './styles.css'
import ReactDOM from 'react-dom/client'
import styles from './my.module.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(<div className={styles.root}>Hello World</div>)
