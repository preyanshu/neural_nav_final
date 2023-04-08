// const spawner=require("child_process").spawn;

const form=document.getElementById("send_container");
const messageinput=document.getElementById("messageinp");
const messagecontainer=document.getElementById("flex_box_chats");

const append=(message,position)=>{
    const messageelement=document.createElement("div");
    messageelement.innerHTML=message;
    messageelement.classList.add("chat");
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);



}
const append_loader=(i)=>{
    const loaderelement=document.createElement("div");
    loaderelement.innerHTML= '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
    
    loaderelement.classList.add("left_no_color");
    loaderelement.setAttribute("id",`newid${i}`);
    
    messagecontainer.append(loaderelement);



}
let a="f";
let count=0;
    




form.addEventListener("submit",(e)=>{
    // e.preventDefault();
    const message=messageinput.value;
    append(message,"right");
    // messageinput.value="";
    append_loader(count);

    const element = document.getElementById("flex_box_chats");
    element.scrollTop = element.scrollHeight;

    var i = setInterval(() => {
        fetch("../static/bool.txt")
        .then(function(response){
             return response.text();
        })
        .then(function(data){
            a=data;
            console.log(a);
            
        
        })
       
        
            if(a=="t"){
                fetch("../static/output.txt")
                .then(function(response){
                     return response.text();
                })
                .then(function(data){
                    console.log(data);
                    // loader.style.display = "none";

                    append(data,"left");
                    
                    document.getElementById(`newid${count}`).style.display="none";
                    console.log(count);
                    count++;
                    a="f";
                    const element = document.getElementById("flex_box_chats");
            element.scrollTop = element.scrollHeight;
                })
                clearInterval(i);
    
            }
            
        
       

       

    
            messageinput.value="";    
    }, 10);
        
   
        
   

    





}

)

