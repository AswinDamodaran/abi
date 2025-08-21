import Link from "next/link";

export default function Footer() {
    return (
        <div className="border-t-1 border-border flex justify-between py-1 px-4 lg:px-10">
            <Link href="#">Contact us</Link>
            <Link href="#" className="text-sm"><em>© 2025 ABI app</em></Link>
        </div>
    )
}