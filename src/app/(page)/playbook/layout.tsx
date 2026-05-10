import PlayBookActivityBar from "./src/components/Playbook.actvity.bar";

export default function RootLayout ({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <PlayBookActivityBar/>
            {children}
        </div>
    )
}