import Link from "next/link";


export default function UserPage() {

    return (
        <div>
            <Link href="/home/create-group">
                <h3>Create new group</h3>
            </Link>
        </div>
    )
}