export const getMenuitems = async () => {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/menuitems`
    );
    return await res.json();
};

export const createMenuitem = async ({ name, price, description, image, token }) => {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/menuitems`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                name,
                price,
                description,
                image
            })
        }
    );

    return await res.json();
};


export const deleteMenuitem = async ({ id, token }) => {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/menuitems/` + id,
        {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    );

    return await res.json();
};