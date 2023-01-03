// React Router DOM
import { Routes, Route } from 'react-router-dom'

// Redux
import { setStyles } from './redux/styleSlice';
import { useDispatch, useSelector } from 'react-redux';

// React Query
import { useQuery } from '@tanstack/react-query';

// API Fetch Calls
import { getUsers } from './helper/crud';

// Components
import Main from './components/Main';
import Login from './components/Login';

// Styles
import { Global } from "./styles/Global";
import { HeaderImage } from "./styles/HeaderImage";


// Images
import bgImageDark from './images/todo-app-main/images/bg-desktop-dark.jpg'
import bgImageLight from './images/todo-app-main/images/bg-desktop-light.jpg'



function App() {

  // React Query Server States
  const {
    data: users,
  } = useQuery({ queryKey: ['users'], queryFn: getUsers })

  // Redux Global States
  const dispatch = useDispatch()
  const styles = useSelector((state) => state.reduceStyles.styles)
  const theme = useSelector((state) => state.reduceTheme.theme)

  // Logic

  const updateStyles = () => {
    const defaultStyles = {
      textColor: 'white',
      primaryColor: 'hsl(235, 24%, 19%)',
      secondaryColor: 'hsl(235, 21%, 11%)'
    }
    const updatedStyles = {
      textColor: 'black',
      primaryColor: 'white',
      secondaryColor: 'hsl(0, 0%, 98%)'
    }
    styles.primaryColor === defaultStyles.primaryColor ?
      dispatch(setStyles(updatedStyles)) :
      dispatch(setStyles(defaultStyles))
  }

  return (
    <>
      <Global bg={styles.secondaryColor}></Global>
      <HeaderImage>
        {theme === 'Dark' ?
          <img style={{ height: '100%', width: '100%' }} src={bgImageDark}></img> :
          <img style={{ heigh: '100%', width: '100%' }} src={bgImageLight}></img>}
      </HeaderImage>
      <Routes>
        <Route path='/' element={
          <Login updateStyles={updateStyles} users={users}></Login>
        }>
        </Route>
        <Route path='/main' element={
          <Main updateStyles={updateStyles}></Main>
        }></Route>
      </Routes>
    </>
  );
}

export default App;
