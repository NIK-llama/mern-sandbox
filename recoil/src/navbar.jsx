import './App.css'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { jobAtom, messagingAtom, networkAtom, notificationAtom } from './store/atoms/navbar'

function App() {
    return (
        <RecoilRoot>
            <MainApp />
        </RecoilRoot>
    )
}

function MainApp() {
    const networkNotificationCount = useRecoilValue(networkAtom);
    const jobsCount = useRecoilValue(jobAtom);
    const notificationsCount = useRecoilValue(notificationAtom);
    const messageCount = useRecoilValue(messagingAtom);

    return (
        <>
            <button>Home</button>

            <button>My network {(networkNotificationCount >= 100) ? "99+" : networkNotificationCount}</button>
            <button>Jobs {jobsCount}</button>
            <button>Messaging {messageCount}</button>
            <button>Notification {notificationsCount}</button>

            <button>Me</button>
        </>
    )
}

export default App