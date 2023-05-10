export default function Container({ children }){
    return (
       <div className="min-h-screen h-fit flex flex-col bg-gray-100 w-[1000px]">
         <div className="flex-1 w-full p-8 bg-white shadow">
           {children}
         </div>
       </div>
     );
   };
   
   