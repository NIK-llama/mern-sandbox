export default function Authlayout({children}) {
    return (
        <html lang="en">
            <body>
                <div className="p-4 border-b">
                    Welcome!
                </div>
                {children}
            </body>
        </html>
    )
}