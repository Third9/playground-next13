'use client'

export default function Board() {

    const getHello = async () => {
        try {
            const res = await fetch('/api/boards', {
                method: 'GET',
            })
            const data = await res.json()
            console.log('res >> ', data)
        } catch (error) {
         console.log('error >> ', error)
        }
    }


    return (
        <div>
            <div>Board</div>

            <button onClick={getHello}>click</button>
        </div>
    )
}