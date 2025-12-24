import userModel from '../models/userModel.js';

//add item to cart
const addToCart = async (req, res) => {
    try { 
        let userData = await userModel.findById({_id:req.body.userId});
        let cartData = userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Item added to cart successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while adding to cart" });
    }
}

//remove item from cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById({_id:req.body.userId});
        let cartData = userData.cartData;
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
    }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while removing from cart" });
    }
}


//fetch user cart items
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById({_id:req.userId});
        let cartData = userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while fetching cart data" });
    }
}
export { addToCart, removeFromCart, getCart };