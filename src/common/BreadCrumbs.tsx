"use client"

import { Breadcrumb } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function BreadCrumbs(){

    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(segment=>segment);
    const elements = pathSegments.slice(1);

    //console.log(pathSegments);

    const breadcrumbs = elements.map((segment,index)=>{

 
       
          const path  = '/'+elements.slice(0,index+1).join('/')  ;
          const label = segment.charAt(0).toLocaleLowerCase() + segment.slice(1);
        
       
        
        return {path,label};

    });

    return (
          <Breadcrumb style={{marginLeft:'20px'}}>
             <BreadcrumbItem>
              <Link className="hover:bg-gray-200 hover:shadow-md cursor-pointer" href="/">Home</Link>
             </BreadcrumbItem>
                {
                     breadcrumbs.map((crum,index)=> (
                      <BreadcrumbItem key={index}>
                        <Link href={crum.path} > {crum.label} </Link>
                       </BreadcrumbItem>


                     ) )
           
                 }
           
          </Breadcrumb>
          /*  <nav  aria-label="breadcrumb">
                <ol style={{display:'flex', listStyle:'none' , padding:0, marginLeft:'15px'}}>

                    <li>
                        <Link className="hover:bg-gray-200 hover:shadow-md cursor-pointer" href="/">Home</Link>
                        <span> / </span>
                    </li>
                    {
                      breadcrumbs.map((crum,index)=>
                        <li key={crum.path}>
                            { index === breadcrumbs.length - 1 ? ( <span aria-current="page">{ crum.label}</span> ) 
                            : ( 
                                <>
                                  <Link className="hover:bg-gray-200 hover:shadow-md cursor-pointer" href={crum.path}> {crum.label} </Link>
                                  <span> / </span>   
                                </>
                              )
                             }
                        </li>

                      )

                    }

                </ol>      
            </nav>*/
    );



}