
import React from "react";
import { useQuery } from 'react-query'

import ItemsList from '../components/ItemsList';
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { getItems } from "../api/items";

const Items = () => {


    const { isLoading, error, data } = useQuery("itemsData", () =>
        getItems()
    );


    if (isLoading) return (
        <div className="center">
            <LoadingSpinner />
        </div>
    );

    if (error) return "An error has occurred: " + error.message;

    return (
        <ItemsList items={data} />
    )
};

export default Items;