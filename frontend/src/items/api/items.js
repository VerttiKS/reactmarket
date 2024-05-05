export const getItems = async () => {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/items`
    );
    return await res.json();
};

export const createItem = async ({ title, price, description, image, owner, token }) => {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/items`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                title,
                price,
                description,
                image,
                owner
            })
        }
    );

    return await res.json();
};

export const editItem = async ({ title, price, description, image, owner, token }) => {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/items`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                title,
                price,
                description,
                image,
                owner
            })
        }
    );

    return await res.json();
};



export const deleteItem = async ({ id, token }) => {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/items/` + id,
        {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    );

    return await res.json();
};