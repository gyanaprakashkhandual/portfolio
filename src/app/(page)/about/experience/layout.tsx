import ExperienceSidebar from "../src/components/sidebars/Experience.sidebar"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <ExperienceSidebar/>
            {children}
        </div>
    )
}