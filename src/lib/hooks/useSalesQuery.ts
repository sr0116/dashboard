"use client";

import { useEffect } from "react";
import { graphqlClient } from "../api/graphqlClient";
import { setSalesData, setLoading } from "@/store/salesSlice";
import { useAppDispatch } from "@/store/hooks";

const QUERY = `
query {
  salesViewAll(limit: 20000) {
    year
    monthNo
    monthName
    region
    sigungu
    productName
    productCategoryName
    categoryName
    salesAmount
    netProfit
    quantity
    customerName   
  }
}
`;

export const useSalesQuery = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function load() {
            dispatch(setLoading(true));
            try {
                const res = await graphqlClient.request(QUERY);
                dispatch(setSalesData(res.salesViewAll));
            } catch (e) {
                console.error(e);
            } finally {
                dispatch(setLoading(false));
            }
        }

        load();
    }, [dispatch]);
};
