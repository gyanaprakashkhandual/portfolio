import ActivityBar from "./src/components/core/Actvity.bar"

export default function RootLayout ({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="">
            <ActivityBar/>
            {children}
        </div>
    )
}