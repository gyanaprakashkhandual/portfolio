import GithubRepositories from "../../src/modules/github/Github.repositories";

export default function Page () {
    return (
        <div className="h-[calc(100vh-56px)]">
            <GithubRepositories/>
        </div>
    )
}