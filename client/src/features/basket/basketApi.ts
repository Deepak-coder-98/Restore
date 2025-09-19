import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Item, type Basket } from "../../app/models/Basket";
import type { Product } from "../../app/models/Product";

function isBasketItem(product : Product | Item) : product is Item {
    return (product as Item).quantity !== undefined;
}

export const basketApi = createApi({
    reducerPath: 'basketApi',
    baseQuery : baseQueryWithErrorHandling,
    tagTypes: ['Basket'],
    endpoints: (builder) => ({
        fetchBasket: builder.query<Basket, void>({
            query: () => ({url: 'basket',}),
            providesTags: ['Basket']
        }),
        addBasketItem: builder.mutation<Basket, {product: Product | Item, quantity: number}>({
            query: ({product, quantity}) => {
                const productId = isBasketItem(product) ? product.productId : product.id
                return {
                    url: `basket?productId=${productId}&quantity=${quantity}`,
                    method: 'POST'
                }
            },
            // Optimistically updates the basket in the cache when adding an item.
            // If the API call fails, the update is undone to keep the cache consistent.
            onQueryStarted: async ({product, quantity}, {dispatch, queryFulfilled}) => {
                let isNewBasket = false;
                const patchResult = dispatch(
                    // updating the data for fetchBasketApi which is cached by RTK
                    basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
                        const productId = isBasketItem(product) ? product.productId : product.id

                        if(!draft?.basketId) isNewBasket = true;

                        if(!isNewBasket) {
                            const existingItem = draft.items.find(item => item.productId === productId);
                            if(existingItem) {
                                existingItem.quantity += quantity;
                            } 
                            else {
                                const newItem = isBasketItem(product) ? product : new Item(product, quantity)
                                // making the class object to js object for serialization for redux store
                                draft.items.push({...newItem}) 
                            };
                        }
                    })
                )
                try {
                    await queryFulfilled;
                    if(isNewBasket) {
                        dispatch(basketApi.util.invalidateTags(["Basket"]))
                    }
                } catch (error) { 
                    console.log(error);
                    patchResult.undo();
                }
            }
        }),
        removeBasketItem: builder.mutation<void, {productId: number, quantity: number}>({
            query: ({productId, quantity}) => ({
                url: `basket?productId=${productId}&quantity=${quantity}`,
                method: 'DELETE'
            }),
            onQueryStarted: async ({productId, quantity}, {dispatch, queryFulfilled}) => {
                const patchResult = dispatch(
                    basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
                        const itemIndex = draft.items.findIndex(item => item.productId === productId);
                        if(itemIndex >= 0) {
                            draft.items[itemIndex].quantity -= quantity;
                            if(draft.items[itemIndex].quantity <= 0) {
                                draft.items.splice(itemIndex, 1);
                            }
                        }
                    })
                )
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error) ;
                    patchResult.undo();
                }
            }
        })
    })
});

export const {useFetchBasketQuery, useAddBasketItemMutation, useRemoveBasketItemMutation} = basketApi;