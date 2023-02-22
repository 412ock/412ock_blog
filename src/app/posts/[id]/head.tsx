export default function Head({params}: {params: {id: string}}) {
    return (
        <>
            <title>{params.id}</title>
        </>
    )
}