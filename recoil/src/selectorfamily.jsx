import './App.css'
import { RecoilRoot, useRecoilState, useRecoilStateLoadable, useRecoilValue} from 'recoil'
import { todoAtomFamily } from './store/atoms/selectorfamily';

function App() {
    return (
        <RecoilRoot>
            <Todo id={1} />
            <Todo id={2} />
        </RecoilRoot>
    )
}

function Todo({id}) {
    const [todo, setTodo] = useRecoilStateLoadable(todoAtomFamily(id));
    
    if (todo.state === "loading") {
        return (
            <div>
                loading...
            </div>
        )
    } else if (todo.state === "hasValue") {
        return (
            <div>
                some stuff
                <br />
            </div>
        )
    } else if (todo.state === "hasError") {
        return (
            <div>
                Error while getting data from backend
            </div>
        )
    }
}

export default App
