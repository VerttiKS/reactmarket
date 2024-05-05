
import React from "react";
import { useQuery } from 'react-query'

import MenuitemsList from '../components/MenuitemsList';
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { getMenuitems } from "../api/menuitems";

const Menuitems = () => {


    const { isLoading, error, data } = useQuery("menuitemsData", () =>
        getMenuitems()
    );


    if (isLoading) return (
        <div className="center">
            <LoadingSpinner />
        </div>
    );

    if (error) return "An error has occurred: " + error.message;

    return (
        <MenuitemsList items={data} />
    )
};

export default Menuitems;