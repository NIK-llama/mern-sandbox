import './App.css'
import { RecoilRoot, useRecoilValue} from 'recoil'
import { todoAtomFamily } from './store/atoms/todoAtom'

function App() {
    return (
        <RecoilRoot>
            <Todo id={1} />
            <Todo id={2} />
        </RecoilRoot>
    )
}

function Todo({id}) {
    const currentTodo = useRecoilValue(todoAtomFamily(id));
    return (
        <>
            {currentTodo.title } {currentTodo.description}
            <br />
        </>
    )
}

export default App