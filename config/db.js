import mongoose from "mongoose";

export const connectDB = async () => {
    // ده الرابط المحلي، غيرنا الرابط الطويل بالرابط ده
    // 127.0.0.1 ده عنوان جهازك
    // 27017 ده البورت الافتراضي
    // food-del ده اسم الداتابيز وهيتم إنشاؤها تلقائي
    await mongoose.connect('mongodb://127.0.0.1:27017/food-del')
        .then(() => console.log("DB Connected Locally 🏠"))
        .catch((err) => console.error("Connection Error:", err)); 
}