import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { notifications, totalNotificationSelector } from './store/atoms/navbar'


function App() {
    return (
        <RecoilRoot>
            <MainApp />
        </RecoilRoot>
    )
}

function MainApp() {
    const [networkCount, setNetworkCount] = useRecoilState(notifications);
    const totalNotificationCount = useRecoilValue(totalNotificationSelector);

    return (
        <>
            <button>Home</button>

            <button>My network {(networkCount.network >= 100) ? "99+" : networkCount.network}</button>
            <button>Jobs {networkCount.jobs}</button>
            <button>Messaging {networkCount.messaging}</button>
            <button>Notification {networkCount.notification}</button>

            <button>Me {totalNotificationCount}</button>
        </>
    )
}

export default App