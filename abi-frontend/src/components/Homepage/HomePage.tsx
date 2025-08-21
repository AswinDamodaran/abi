"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSnackbar } from "notistack"
import { Trash2, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"

interface Product {
    id: number
    name: string
    description: string
    price: number
    brand: string
    category: string
    created_at:Date
    
}

export default function HomePage() {

    const [data, setData] = useState<Product[]>([])
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const router = useRouter()

    const { enqueueSnackbar } = useSnackbar();

    const getData = async (pageNumber = 1) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/?page=${pageNumber}`)
            setData(response.data.results)
            setTotalPages(Math.ceil(response.data.count / 7))
            console.log(response.data)
        } catch (err) {
            enqueueSnackbar("Could not get the data", { variant: "error" })
            console.log(err)
        }
    }

    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const pages: (number | string)[] = [];

        for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
            range.push(i);
        }

        if (page - delta > 2) {
            range.unshift('…');
        }
        if (page + delta < totalPages - 1) {
            range.push('…');
        }

        pages.push(1, ...range, totalPages);
        return pages;
    };

    const handleEdit = (id: number) => {
        router.push(`/products/edit/${id}`)
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}/`);
            enqueueSnackbar("Product deleted successfully", { variant: "success" });
            setData(prev => prev.filter(product => product.id !== id));
            getData()
        } catch (err) {
            enqueueSnackbar("Failed to delete the product", { variant: "error" });
            console.error(err);
        }
    };

    useEffect(() => {
        getData(page)
    }, [page])

    return (
        <div className="relative overflow-x-auto shadow-md px-4 py-4 lg:px-10 sm:rounded-lg p-1">
            <div className="flex justify-between py-2 px-1">
                <h1 className="font-bold text-lg">Products</h1>
                <button className="px-3 py-2 rounded-sm hover:opacity-80 bg-main text-maintext" onClick={() => router.push("/products/add")}>Add products</button>
            </div>
            <table className="w-full text-sm text-left rtl:text-right border-1 border-border">
                <thead className="text-xs uppercase bg-sub">
                    <tr>
                        <th className="px-6 py-3 ">ID</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3">Brand</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3"><em>created</em></th>
                        <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((product) => (
                        <tr
                            key={product.id}
                            className=" border-b-1 border-border"
                        >
                            <td className="px-6 py-4">{product.id}</td>
                            <td className="px-6 py-4">{product.name}</td>
                            <td className="px-6 py-4">{product.description}</td>
                            <td className="px-6 py-4">${product.price}</td>
                            <td className="px-6 py-4">{product.brand}</td>
                            <td className="px-6 py-4">{product.category}</td>
                            <td className="px-6 py-4">{new Date(product.created_at).toLocaleDateString()}</td>
                            <td className="px-6 py-4 ">
                                <div className="flex justify-center gap-2">
                                    <button className=" cursor-pointer block m-1 hover:text-[#ffb732] font-medium rounded-lg p-1"
                                        onClick={() => handleEdit(product.id)}
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button className=" cursor-pointer block m-1 hover:text-[#c72c2c] font-medium rounded-lg p-1"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between gap-2 mt-4 px-1">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="px-3 py-1 border-1 border-border rounded disabled:opacity-50"
                >
                    Prev
                </button>

                <div className="flex gap-2">
                    {getPageNumbers().map((p, idx) => (
                        <button
                            key={idx}
                            onClick={() => typeof p === 'number' && setPage(p)}
                            className={`px-3 py-1 border-1 border-border rounded text-border ${page === p ? "bg-sub" : ""}`}
                            disabled={typeof p !== 'number'}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-3 py-1 border-1 border-border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>


    )
}


