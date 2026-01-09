export default function Authlayout({children,}: Readonly <{children: React.ReactNode}>) {
    return (
        <div>
            <div className="p-4 border-b">
                Welcome!
            </div>
            {children}
        </div>
    )
}