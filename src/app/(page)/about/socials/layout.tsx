import SocialSidebar from "../src/components/sidebars/Social.sidebar"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <SocialSidebar/>
            {children}
        </div>
    )
}