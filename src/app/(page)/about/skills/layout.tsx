import SkillSidebar from "../src/components/sidebars/Skill.sidebar"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <SkillSidebar/>
            {children}
        </div>
    )
}