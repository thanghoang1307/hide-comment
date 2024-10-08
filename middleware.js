import { NextResponse } from 'next/server';

   export function middleware(req) {
     console.log('Middleware is running for:', req.url);
     
     // Bạn có thể thực hiện kiểm tra hay logic tại đây
     // Ví dụ: xác thực
     const isAuthenticated = true; // Thay bằng logic thực tế của bạn

     if (!isAuthenticated) {
       return NextResponse.redirect(new URL('/login', req.url));
     }

     return NextResponse.next(); // Tiếp tục đến route tiếp theo
   }

   export const config = {
     matcher: ['/protected/(.*)'], // Chỉ áp dụng middleware cho đường dẫn /protected/*
   };