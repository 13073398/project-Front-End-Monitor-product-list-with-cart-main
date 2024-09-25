//Set variables
let totalMo = 0// variable to count the total units of products 

// Set DOM
let images_area_page=document.querySelectorAll(".box .image img");
let product_name=document.querySelectorAll(".box .data .category");
let descreption_product=document.querySelectorAll(".box h3");
let price_product=document.querySelectorAll(".box .data .price");
let  decrease_button=document.querySelectorAll(".box .tool .left span");
let increase_button=document.querySelectorAll(".box .tool .right span");
let request_items_number=document.querySelectorAll(".box .tool .middle span");
let cart_box=document.querySelector(".desserts .cart");
let cart_box_count_products=document.querySelector(".desserts .cart .heading h2");
let cart_selected_items=document.querySelector(".details .selecte-items");
let total_Price=document.querySelector(".cart .total h3");
let empty_cart=document.querySelector(".desserts .empty");
let confirm_Button=document.querySelector(".cart .confirm");
let confirm_message_box=document.querySelector(".container .confirm_message");
let confirm_items=document.querySelector(".confirm_message .items");
let new_order_button=document.querySelector(".confirm_message .tool button");

//import images and data (name-description-price) of products from json file and lik it to the main page by using AJAX
let images_product=new XMLHttpRequest();
images_product.open("GET","/product-list-with-cart-main/data.json",true);
images_product.send();
images_product.onreadystatechange=function(){
    if(this.readyState==4&&this.status==200){
        let images_product_arry=JSON.parse(this.responseText);
       for( let i=0;i<images_product_arry.length;i++){
        // loop to set product image
        for(let i=0;i<images_area_page.length;i++){
            images_area_page[i].src=`.${images_product_arry[i].image.desktop}`;     
        }
        // loop to set product category
        for(let i=0;i<product_name.length;i++){
            product_name[i].innerHTML=images_product_arry[i].category;
        }
        //loop to set product name  
        for(let i=0;i<descreption_product.length;i++){
            descreption_product[i].innerHTML=images_product_arry[i].name
        }
        //loop to set product price
        for(let i=0;i<price_product.length;i++){
            price_product[i].innerHTML=images_product_arry[i].price
        }
       }
    }
}
// set increase  button

increase_button.forEach((e)=>{

    e.addEventListener("click",(e)=>{
        let x=e.currentTarget.dataset.id;
        count_increase(x);
    //to show  cart box when  user type (+) increase button
     cart_box.classList.remove("disable");
   
        
    })
})

// set  Decrease button
decrease_button.forEach((e)=>{
    e.addEventListener("click",(e)=>{   
        let y=e.currentTarget.dataset.id;
        count_decrease(y)
    })
})
 //function to  set increase  button

function count_increase(x){
    empty_cart.classList.add("disable");
   for(let i=0;i< request_items_number.length;i++){
    if(request_items_number[i].dataset.id===x){
    request_items_number[i].innerHTML++
    totalMo++ // make increament to units of products in cart box 
    cart_box_count_products.innerHTML=`Your Cart (${totalMo})`; 
    let d=+ request_items_number[i].innerHTML;
    if(d>1){
    let arr=document.querySelectorAll(".bottom .left .count");
    let price_per_unit=document.querySelectorAll(".bottom .left .priceperUnit");
    let price_total_unit=document.querySelectorAll(".bottom .left .price");
   
     for(let i=0;i<arr.length;i++){
       if(arr[i].id===x){
        parseInt(arr[i].innerHTML=parseInt(arr[i].innerHTML)+1);
       } 
       for(let i=0;i<price_per_unit.length;i++){
        if(price_per_unit[i].id===x){
           
           
        }
        if(price_total_unit[i].id===x){
            price_total_unit[i].innerHTML=+ price_per_unit[i].innerHTML* + arr[i].innerHTML
            sum_price()
           
        }
       }  
    }
    
    }else{
        let seleted_item_row=document.createElement("div");
        seleted_item_row.className="row"
        seleted_item_row.id=x
        //Start create product_name
        let seleted_item_row_text=document.createElement("div");
        seleted_item_row_text.className="text"
        let seleted_item_row_text_h4=document.createElement("h4");
        for(let i=0;i<product_name.length;i++){
             if(product_name[i].dataset.id===x){
              seleted_item_row_text_h4.textContent=product_name[i].textContent;
             }
            }
            seleted_item_row_text.append(seleted_item_row_text_h4);
             //End create product_name

             //start create product_count
             let seleted_item_row_bottom=document.createElement("div");
             seleted_item_row_bottom.className="bottom";
             let seleted_item_row_bottom_left=document.createElement("div");
             seleted_item_row_bottom_left.className="left"
             let seleted_item_row_bottom_span=document.createElement("span");
             seleted_item_row_bottom_span.id=x;
             seleted_item_row_bottom_span.className="count"
             for(let i=0;i<request_items_number.length;i++){
                if(request_items_number[i].dataset.id===x){
                    seleted_item_row_bottom_span.innerHTML=`${request_items_number[i].textContent}*`
                   
                }
             }


             seleted_item_row_bottom_left.append(seleted_item_row_bottom_span);
             seleted_item_row_bottom.append(seleted_item_row_bottom_left);
               //End create product_product_count
               //Start create Product_price
             let seleted_item_row_bottom_span_price=document.createElement("span");
             seleted_item_row_bottom_span_price.id=x
             seleted_item_row_bottom_span_price.className="priceperUnit"
             let total_items_price=document.createElement("span");
             total_items_price.id=x;
             total_items_price.className="price";
             for(let i=0;i<price_product.length;i++){
                if(price_product[i].dataset.id===x){
                    seleted_item_row_bottom_span_price.innerHTML=`${price_product[i].textContent}`;
                    let count_value=parseInt(seleted_item_row_bottom_span.innerHTML)
                    let price_value=parseFloat(seleted_item_row_bottom_span_price.innerHTML);
                 
                    total_items_price.innerHTML= count_value * price_value;
                  
                }
             }
             seleted_item_row_bottom_left.append(seleted_item_row_bottom_span, seleted_item_row_bottom_span_price,total_items_price);
             seleted_item_row_bottom.append(seleted_item_row_bottom_left);
    
               //End create Product_price
               //Start create Cancel_button
                   let seleted_item_row_bottom_right=document.createElement("div");
                   seleted_item_row_bottom_right.className="right";
                   let seleted_item_row_bottom_div_cancel=document.createElement("div");
                   seleted_item_row_bottom_div_cancel.className="icon";
                   let seleted_item_row_bottom_div_cancel_button=document.createElement("button");
                   let seleted_item_row_bottom_div_cancel_button_x=document.createTextNode("X");
                   seleted_item_row_bottom_div_cancel_button.append(seleted_item_row_bottom_div_cancel_button_x);
                   seleted_item_row_bottom_div_cancel.append(seleted_item_row_bottom_div_cancel_button);
                   seleted_item_row_bottom_right.append( seleted_item_row_bottom_div_cancel);
                   seleted_item_row_bottom.append(seleted_item_row_bottom_right);
                   seleted_item_row.append(seleted_item_row_text,seleted_item_row_bottom);
                   seleted_item_row_bottom_div_cancel_button.addEventListener("click",(e)=>{
                    seleted_item_row.remove();
                    sum_price();
                    totalMo-=parseInt(seleted_item_row_bottom_span.innerHTML);
                    cart_box_count_products.innerHTML=`Your Cart (${totalMo})`;
                    request_items_number[i].innerHTML=0

                  
                   })
                  //End create Cancel_button
                   cart_selected_items.append( seleted_item_row);
                //  calculate total price
                    sum_price()
                   
                    
                    }
            
        
      
    }
    }
   }

//function to  set Decrease  button
function count_decrease(y){
    for(let i=0;i< request_items_number.length;i++){
     if(request_items_number[i].dataset.id===y){
        let d=+ request_items_number[i].innerHTML

        if(totalMo<=0){
         
            return false
            
         
        }else{
            totalMo-- // make decreament to units of products in cart box 
            cart_box_count_products.innerHTML=`Your Cart (${totalMo})`;
        }
        
        if(d==0){
            return false
        }else{
            request_items_number[i].innerHTML-- 
            let arr=document.querySelectorAll(".bottom .left .count");
            let price_per_unit=document.querySelectorAll(".bottom .left .priceperUnit");
            let price_total_unit=document.querySelectorAll(".bottom .left .price");
           
             for(let i=0;i<arr.length;i++){
               if(arr[i].id===y){
                parseInt(arr[i].innerHTML=parseInt(arr[i].innerHTML)-1);
                if(arr[i].innerHTML==="0"){
                let seleted_item_row=document.querySelectorAll(".details .selecte-items .row");
                 for(let i=0;i<seleted_item_row.length;i++){    
                if(seleted_item_row[i].id===y){
                    seleted_item_row[i].remove();
                }
             }
                }
               } 
               for(let i=0;i<price_per_unit.length;i++){
                if(price_per_unit[i].id===y){
                }
                if(price_total_unit[i].id===y){
                    price_total_unit[i].innerHTML=+ price_per_unit[i].innerHTML* + arr[i].innerHTML
                    sum_price()
                    if(totalMo===0){
                        empty_cart.classList.remove ("disable");
                        cart_box.classList.add("disable");

                    }
                 
                }
                
               }  
            }        
          
        }
   
     }
    }
 }
// function to Calcuate total price
function sum_price(){
    let price_for_item=document.querySelectorAll(".bottom .left .price");
            
    let result=0;
    for(let i=0;i<price_for_item.length;i++){
    
        let k=+price_for_item[i].innerHTML
        result+=k
        // if(k===0){
        //     empty_cart.classList.remove("disable");
        //     cart_box.classList.add("disable")
            
        // }
    }
        total_Price.innerHTML=`$ ${result}`;
     
}
//function to set confirm message  

confirm_Button.onclick=function(){
    confirm_message_box.classList.add("show");
    cart_box.classList.add("disable");
    let cart_selected_items_row=[...document.querySelectorAll(".cart .selecte-items .row")]
    let products_image=[...document.querySelectorAll(".products .row .box .image img")];
    for(let i=0;i<cart_selected_items_row.length;i++){
    let confirm_message_row=document.createElement("div");
    confirm_message_row.className="row";
    let confirm_message_row_left=document.createElement("div");
    confirm_message_row_left.className="left"
    let confirm_message_row_left_image=document.createElement("div");
    confirm_message_row_left_image.className="image"
    let confirm_message_row_left_image_img=document.createElement("img")
    confirm_message_row_left.appendChild( confirm_message_row_left_image);
    confirm_message_row_left_image.appendChild( confirm_message_row_left_image_img)
    let confirm_message_row_left_details=document.createElement("div");
    confirm_message_row_left_details.className="details";
     let confirm_message_row_left_details_h6=document.createElement("h6");
     let confirm_message_row_left_details_span=document.createElement("span");
      confirm_message_row_left_details_span.className="count";
     let confirm_message_row_left_details_span_one=document.createElement("span");
     confirm_message_row_left_details_span_one.className="price"
     confirm_message_row_left_details.append( confirm_message_row_left_details_h6,confirm_message_row_left_details_span,confirm_message_row_left_details_span_one);
     confirm_message_row_left.appendChild(confirm_message_row_left_details);
    let confirm_message_row_right=document.createElement("div");
    confirm_message_row_right.className="right"
    let confirm_message_row_right_price=document.createElement("h6");
    let confirm_message_row_right_price_txt=document.createTextNode("$5");
    confirm_message_row_right.appendChild( confirm_message_row_right_price);
    confirm_message_row_right_price.appendChild(confirm_message_row_right_price_txt)
    confirm_items.appendChild(confirm_message_row);
    confirm_message_row.append(confirm_message_row_left,confirm_message_row_right);
        for(let q=0 ;q<products_image.length;q++){
            if(cart_selected_items_row[i].id===products_image[q].dataset.id){
                confirm_message_row_left_image_img.src= products_image[q].src;

            }
            
        }
        
    }
    let cart_product_name=document.querySelectorAll(".cart .details .selecte-items .row .text h4");
    let confirm_product_name=document.querySelectorAll(".confirm_message .items .details h6");
    for(let i=0;i<cart_product_name.length;i++){
        for(let i=0;i<confirm_product_name.length;i++){
            confirm_product_name[i].innerHTML=cart_product_name[i].innerHTML
        }
    }
    let  cart_product_count_for_item=document.querySelectorAll(".cart .details .selecte-items .row .bottom .left .count")
    let confirm_product_count=document.querySelectorAll(".confirm_message .items .details .count");
    for(let i=0;i<cart_product_count_for_item.length;i++){
        for(let i=0;i<confirm_product_count.length;i++){
            confirm_product_count[i].innerHTML=cart_product_count_for_item[i].innerHTML
        }
    }
    let  cart_product_price_for_item=document.querySelectorAll(".cart .details .selecte-items .row .bottom .left .priceperUnit");
    let  confirm_product_price_for_item=document.querySelectorAll(".confirm_message .items .details .price");
    for(let i=0;i<cart_product_price_for_item.length;i++){
        for(let i=0;i<confirm_product_price_for_item.length;i++){
            confirm_product_price_for_item[i].innerHTML=cart_product_price_for_item[i].innerHTML
        }
    }
    let cart_product_count_for_row=document.querySelectorAll(".cart .details .selecte-items .row .bottom .left .price")
    let confirm_product_price_for_row=document.querySelectorAll(".confirm_message .items .right h6");
    for(let i=0;i<cart_product_count_for_row.length;i++){
        for(let i=0;i<confirm_product_price_for_row.length;i++){
            confirm_product_price_for_row[i].innerHTML=cart_product_count_for_row[i].innerHTML
        }
    }
    let cart_total_price_item=document.querySelector(".cart .details .total h3");
    let confirm_total_price_item=document.querySelector(".confirm_message .items .sum h2")
    confirm_total_price_item.innerHTML=cart_total_price_item.innerHTML;
}
new_order_button.onclick=function(){
    confirm_message_box.classList.remove("show");
    empty_cart.classList.remove("disable")
    window.location.reload();

}