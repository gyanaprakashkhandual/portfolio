import EducationSidebar from "../src/components/sidebars/Education.sidebar"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <EducationSidebar/>
            {children}
        </div>
    )
}