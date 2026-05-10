import CertificationSidebar from "../src/components/sidebars/Certification.sidebar"

export default function RootLayout ({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <CertificationSidebar/>
            {children}
        </div>
    )   
}