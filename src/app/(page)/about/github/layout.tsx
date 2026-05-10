import GithubSidebar from "../src/components/sidebars/Github.sidebar"

export default function RootLayout ({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <GithubSidebar/>
            {children}
        </div>
    )
}