const cartReducer = (state , action) => {
  
    if(action.type === "ADD_TO_CART"){
        let {id,color,amount,product} = action.payload;

        // tackle the existing product
        let existingProduct = state.cart.find((curItem)=>
            curItem.id === id + color
        );

        if(existingProduct){
            let updatedProduct = state.cart.map((curElem) => {
                if(curElem.id === id+color)
                {
                    let newAmt = curElem.amount + amount;
                    if(newAmt >= curElem.max)
                    {
                        newAmt = curElem.max;
                    }
                    return{
                        ...curElem,
                        amount : newAmt,
                    }
                }
                else{
                    return curElem;
                }
            });
            return {
                ...state,
                cart: updatedProduct
            }
        }
        else{
            let cartProduct = {
                id: id+color,
                name:product.name,
                color,
                amount,
                image : product.image[0].url,
                price: product.price,
                max : product.stock,
            }
        
            return {
                ...state,
                cart: [...state.cart , cartProduct]
            }
        }
    }
    if(action.type === "REMOVE_ITEM"){
        let updatedCart = state.cart.filter((curItem)=> curItem.id !== action.payload);
        return{
            ...state,
            cart:updatedCart,
        }
    }
    if(action.type === "CLEAR_CART"){
        return{
            ...state,
            cart:[]
        }
    }
    if(action.type ==="SET_DECREMENT"){
        let updatedProduct=state.cart.map((curElem)=>{
            if(curElem.id ===action.payload){
                let decAmt = curElem.amount - 1;

                if(decAmt <= 0){
                    decAmt = 1;
                }

                return{
                    ...curElem,
                    amount : decAmt
                }
            }
            else{
                return curElem;
            }
        });
        return {
            ...state,
            cart: updatedProduct
        }
    }
    if(action.type ==="SET_INCREMENT"){
        let updatedProduct=state.cart.map((curElem)=>{
            if(curElem.id ===action.payload){
                let IncAmt = curElem.amount + 1;

                if(IncAmt >= curElem.max){
                    IncAmt = curElem.max;
                }

                return{
                    ...curElem,
                    amount : IncAmt
                }
            }
            else{
                return curElem;
            }
        });
        return {
            ...state,
            cart: updatedProduct
        }
    }
    
    if(action.type === "CART_TOTAL_ITEM"){
        let updatedItemValue = state.cart.reduce((initialValue , curElem)=>{
            let {amount} = curElem;

            initialValue = initialValue  + amount;
            return initialValue;
        },0);
        return{
            ...state,
            total_item : updatedItemValue
        }
    }

    if(action.type === "CART_TOTAL_PRICE")
    {
        let total_price = state.cart.reduce((initialValue,curElem)=>{
            let {price ,amount} = curElem;

            initialValue =initialValue+ (price * amount);
            return initialValue
        },0);
        return{
            ...state,
            total_price:total_price
        }
    }
        
    return state;
}

export default cartReducer
