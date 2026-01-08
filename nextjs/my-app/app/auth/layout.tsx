export default function Authlayout({children}) {
    return (
        <div>
            <div className="p-4 border-b">
                Welcome!
            </div>
            {children}
        </div>
    )
}